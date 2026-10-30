import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QUESTIONS } from './questions';
import { Question, Section, TestResult } from './models';
import { SECONDS_PER_QUESTION, scoreAnswers } from './scoring';
import { PlayerService } from './player.service';
import { LeaderboardService } from './leaderboard.service';

/** Value stored for a question that has no answer. Options are numbered 1-4. */
export const NO_ANSWER = 0;

/** State of one test attempt in progress. */
export interface TestSession {
  /** The part of the paper being attempted. */
  section: Section;
  /** The questions in this test, in order. */
  questions: readonly Question[];
  /** Position (0-based) of the question on screen. */
  currentIndex: number;
  /** Saved answer per question; these are what get scored. NO_ANSWER when none. */
  savedAnswers: number[];
  /** What is highlighted on screen per question, which may not be saved yet. */
  selectedOptions: number[];
  /** Seconds left per question. Each question keeps its own countdown. */
  secondsLeftPerQuestion: number[];
}

/** Progress of saving the result to the leaderboard, shown on the result screen. */
export type LeaderboardSaveStatus = 'idle' | 'saving' | 'saved' | 'kept-best' | 'error';

/** How often the countdown ticks, in milliseconds. */
const ONE_SECOND = 1000;

/**
 * Runs one test attempt: moving between questions, the per-question countdown,
 * selecting and saving answers, submitting, and saving the result.
 *
 * State lives in Angular signals, so components re-render automatically.
 * Every change makes a fresh copy of the session (see `updateSession`), so
 * signals always see a new value.
 */
@Injectable({ providedIn: 'root' })
export class QuizService implements OnDestroy {
  private readonly router = inject(Router);
  private readonly playerService = inject(PlayerService);
  private readonly leaderboardService = inject(LeaderboardService);

  /** The running countdown, or null when no question is being timed. */
  private countdownTimer: ReturnType<typeof setInterval> | null = null;

  /** The attempt in progress, or null before a test starts. */
  readonly session = signal<TestSession | null>(null);
  /** The score after submitting, or null while the test is still running. */
  readonly result = signal<TestResult | null>(null);
  /** Whether the result has reached the leaderboard yet. */
  readonly leaderboardSaveStatus = signal<LeaderboardSaveStatus>('idle');

  /** The question currently on screen. */
  readonly currentQuestion = computed(() => {
    const session = this.session();
    return session ? session.questions[session.currentIndex] : null;
  });

  /** Seconds left on the current question (never below 0). */
  readonly secondsLeft = computed(() => {
    const session = this.session();
    return session ? Math.max(0, session.secondsLeftPerQuestion[session.currentIndex]) : 0;
  });

  /** True once the current question has run out of time; it is then locked. */
  readonly isTimeUp = computed(() => this.secondsLeft() <= 0);

  /** Option highlighted on the current question (may be unsaved). */
  readonly selectedOption = computed(() => {
    const session = this.session();
    return session ? session.selectedOptions[session.currentIndex] : NO_ANSWER;
  });

  /** Option saved for the current question. */
  readonly savedOption = computed(() => {
    const session = this.session();
    return session ? session.savedAnswers[session.currentIndex] : NO_ANSWER;
  });

  /** How many questions in this test have a saved answer. */
  readonly savedAnswerCount = computed(
    () => this.session()?.savedAnswers.filter(answer => answer !== NO_ANSWER).length ?? 0,
  );

  readonly isFirstQuestion = computed(() => this.session()?.currentIndex === 0);

  readonly isLastQuestion = computed(() => {
    const session = this.session();
    return !!session && session.currentIndex === session.questions.length - 1;
  });

  /** Starts a fresh attempt at a section and opens the quiz screen. */
  start(section: Section): void {
    const questions = QUESTIONS.filter(
      question => question.number >= section.firstQuestionNumber && question.number <= section.lastQuestionNumber,
    );
    const questionCount = questions.length;

    this.result.set(null);
    this.leaderboardSaveStatus.set('idle');
    this.session.set({
      section,
      questions,
      currentIndex: 0,
      savedAnswers: Array(questionCount).fill(NO_ANSWER),
      selectedOptions: Array(questionCount).fill(NO_ANSWER),
      secondsLeftPerQuestion: Array(questionCount).fill(SECONDS_PER_QUESTION),
    });

    this.startCountdown();
    this.reportProgress();
    void this.router.navigate(['/quiz']);
  }

  /** Highlights an option (1-4) on the current question. Nothing is saved until Save. */
  selectOption(option: number): void {
    if (this.isTimeUp()) return;
    this.updateSession(session => {
      session.selectedOptions[session.currentIndex] = option;
    });
  }

  /** Removes both the highlighted and the saved answer for the current question. */
  clearAnswer(): void {
    if (this.isTimeUp()) return;
    this.updateSession(session => {
      session.selectedOptions[session.currentIndex] = NO_ANSWER;
      session.savedAnswers[session.currentIndex] = NO_ANSWER;
    });
  }

  /** Saves the highlighted option and moves to the next question (stays put on the last one). */
  saveAndNext(): void {
    if (!this.isTimeUp()) {
      this.updateSession(session => {
        session.savedAnswers[session.currentIndex] = session.selectedOptions[session.currentIndex];
      });
    }
    this.reportProgress();
    this.moveBy(1);
  }

  /** Goes back one question. Its saved answer and remaining time are still there. */
  goToPreviousQuestion(): void {
    this.moveBy(-1);
  }

  /** Ends the test: scores it, shows the result screen and saves to the leaderboard. */
  submit(): void {
    const session = this.session();
    if (!session) return;

    this.stopCountdown();
    const result = scoreAnswers(session.questions, session.savedAnswers);
    this.result.set(result);

    this.playerService.updateProgress({
      activity: 'done',
      currentQuestionNumber: session.questions.length,
      totalQuestions: session.questions.length,
      answeredCount: this.savedAnswerCount(),
    });

    void this.router.navigate(['/result']);
    void this.saveResultToLeaderboard(session.section, result);
  }

  /**
   * Moves forward (+1) or back (-1). Leaving a question throws away an unsaved
   * selection, so coming back shows the saved answer again.
   */
  private moveBy(step: number): void {
    const session = this.session();
    if (!session) return;

    const targetIndex = session.currentIndex + step;
    const isOutOfRange = targetIndex < 0 || targetIndex >= session.questions.length;
    if (isOutOfRange) return;

    this.updateSession(draft => {
      const questionStillHasTime = draft.secondsLeftPerQuestion[draft.currentIndex] > 0;
      if (questionStillHasTime) {
        draft.selectedOptions[draft.currentIndex] = draft.savedAnswers[draft.currentIndex];
      }
      draft.currentIndex = targetIndex;
    });

    this.startCountdown();
    this.reportProgress();
  }

  /** Starts ticking down the current question, unless it has already run out. */
  private startCountdown(): void {
    this.stopCountdown();
    if (this.isTimeUp()) return;
    this.countdownTimer = setInterval(() => this.onCountdownTick(), ONE_SECOND);
  }

  private stopCountdown(): void {
    if (this.countdownTimer) clearInterval(this.countdownTimer);
    this.countdownTimer = null;
  }

  /** Runs every second while a question is on screen. */
  private onCountdownTick(): void {
    this.updateSession(session => {
      const index = session.currentIndex;
      session.secondsLeftPerQuestion[index] = Math.max(0, session.secondsLeftPerQuestion[index] - 1);
    });
    if (!this.isTimeUp()) return;

    // Time's up: discard any unsaved selection, then move on.
    this.stopCountdown();
    this.updateSession(session => {
      session.selectedOptions[session.currentIndex] = session.savedAnswers[session.currentIndex];
    });

    const session = this.session()!;
    const hasNextQuestion = session.currentIndex < session.questions.length - 1;
    const everyQuestionIsOutOfTime = session.secondsLeftPerQuestion.every(seconds => seconds <= 0);

    if (hasNextQuestion) this.moveBy(1);
    else if (everyQuestionIsOutOfTime) this.submit();
    // Otherwise the last question just stays locked; the player can go back or submit.
  }

  /**
   * Changes the session through a copy, so the signal always gets a new object
   * and every computed value and template updates.
   */
  private updateSession(applyChange: (draft: TestSession) => void): void {
    const session = this.session();
    if (!session) return;

    const draft: TestSession = {
      ...session,
      savedAnswers: [...session.savedAnswers],
      selectedOptions: [...session.selectedOptions],
      secondsLeftPerQuestion: [...session.secondsLeftPerQuestion],
    };
    applyChange(draft);
    this.session.set(draft);
  }

  /** Tells the "Playing now" list which question this player is on. */
  private reportProgress(): void {
    const session = this.session();
    if (!session) return;
    this.playerService.updateProgress({
      activity: 'playing',
      currentQuestionNumber: session.currentIndex + 1,
      totalQuestions: session.questions.length,
      answeredCount: this.savedAnswerCount(),
    });
  }

  private async saveResultToLeaderboard(section: Section, result: TestResult): Promise<void> {
    this.leaderboardSaveStatus.set('saving');
    try {
      const outcome = await this.leaderboardService.recordResult(section.id, result);
      this.leaderboardSaveStatus.set(outcome === 'new-best' ? 'saved' : 'kept-best');
    } catch {
      this.leaderboardSaveStatus.set('error');
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }
}
