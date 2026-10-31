import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QUESTIONS } from './questions';
import { Question, Result, Section } from './models';
import { scoreAnswers } from './scoring';
import { PlayerService } from './player.service';
import { LeaderboardService } from './leaderboard.service';

/** State of one in-progress attempt. The arrays are indexed in step with `questions`. */
export interface Session {
  section: Section;
  questions: readonly Question[];
  /** Position of the question on screen. */
  index: number;
  /** Saved answers (what gets scored). 0 = none. */
  saved: number[];
  /** Current, possibly unsaved, selection per question. */
  selected: number[];
  /** Seconds left for the whole test. */
  secondsLeft: number;
}

/**
 * Progress of sending the result to the leaderboard.
 * 'kept-best' means the upload worked but an earlier, better score was kept.
 */
export type SaveStatus = 'idle' | 'saving' | 'saved' | 'kept-best' | 'error' | 'offline';

/** Holds one test attempt: navigation, the test timer, saved answers and the final result. */
@Injectable({ providedIn: 'root' })
export class QuizService implements OnDestroy {
  private readonly router = inject(Router);
  private readonly player = inject(PlayerService);
  private readonly board = inject(LeaderboardService);
  /** Counts down the whole test; null while no test is running. */
  private timer: ReturnType<typeof setInterval> | null = null;

  /** The running attempt, or null before the first start. */
  readonly session = signal<Session | null>(null);
  /** Score of the last submitted attempt; cleared when a new one starts. */
  readonly result = signal<Result | null>(null);
  readonly saveStatus = signal<SaveStatus>('idle');

  // Views of the current question, for the template.
  readonly question = computed(() => {
    const session = this.session();
    return session ? session.questions[session.index] : null;
  });
  readonly secondsLeft = computed(() => this.session()?.secondsLeft ?? 0);
  readonly selected = computed(() => {
    const session = this.session();
    return session ? session.selected[session.index] : 0;
  });
  readonly savedAnswer = computed(() => {
    const session = this.session();
    return session ? session.saved[session.index] : 0;
  });
  /** Number of questions with a saved answer, across the whole attempt. */
  readonly savedCount = computed(() => this.session()?.saved.filter(Boolean).length ?? 0);
  readonly isFirst = computed(() => this.session()?.index === 0);
  readonly isLast = computed(() => {
    const session = this.session();
    return !!session && session.index === session.questions.length - 1;
  });

  /** Begin a fresh attempt at the section's question range and open the quiz page. */
  start(section: Section): void {
    const questions = QUESTIONS.filter(question => question.number >= section.from && question.number <= section.to);
    const count = questions.length;
    this.result.set(null);
    this.saveStatus.set('idle');
    this.session.set({
      section,
      questions,
      index: 0,
      saved: Array(count).fill(0),
      selected: Array(count).fill(0),
      secondsLeft: section.minutes * 60,
    });
    this.startTimer();
    this.reportPresence();
    void this.router.navigate(['/quiz']);
  }

  /** Mark an option on the current question. It only counts once saved. */
  select(option: number): void {
    this.patch(session => (session.selected[session.index] = option));
  }

  /** Remove both the selection and the saved answer of the current question. */
  clear(): void {
    this.patch(session => {
      session.selected[session.index] = 0;
      session.saved[session.index] = 0;
    });
  }

  /** Save the selection and go to the next question. */
  saveAndNext(): void {
    this.patch(session => (session.saved[session.index] = session.selected[session.index]));
    this.reportPresence();
    this.move(1);
  }

  /** Go back one question without saving. */
  previous(): void {
    this.move(-1);
  }

  /** End the attempt: score the saved answers, show the result and upload it in the background. */
  submit(): void {
    const session = this.session();
    if (!session) return;
    this.stopTimer();
    const result = scoreAnswers(session.questions, session.saved);
    this.result.set(result);
    this.player.setStatus({
      status: 'done',
      questionNumber: session.questions.length,
      total: session.questions.length,
      answered: this.savedCount(),
    });
    void this.router.navigate(['/result']);
    void this.persist(session.section, result);
  }

  /** Leave a question: an unsaved change is dropped and the saved answer shows again on return. */
  private move(step: number): void {
    const session = this.session();
    if (!session) return;
    const targetIndex = session.index + step;
    if (targetIndex < 0 || targetIndex >= session.questions.length) return;
    this.patch(draft => {
      draft.selected[draft.index] = draft.saved[draft.index];
      draft.index = targetIndex;
    });
    this.reportPresence();
  }

  private startTimer(): void {
    this.stopTimer();
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private stopTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  /** One second off the test clock; when it reaches zero the saved answers are submitted. */
  private tick(): void {
    this.patch(session => (session.secondsLeft = Math.max(0, session.secondsLeft - 1)));
    if (this.secondsLeft() <= 0) this.submit();
  }

  /** Change the session through a copy so the signal sees a new value and computeds update. */
  private patch(update: (session: Session) => void): void {
    const session = this.session();
    if (!session) return;
    const copy: Session = { ...session, saved: [...session.saved], selected: [...session.selected] };
    update(copy);
    this.session.set(copy);
  }

  /** Tell other players which question this player is on and how many are answered. */
  private reportPresence(): void {
    const session = this.session();
    if (!session) return;
    this.player.setStatus({
      status: 'playing',
      questionNumber: session.index + 1,
      total: session.questions.length,
      answered: this.savedCount(),
    });
  }

  /** Upload the result to the leaderboard and reflect the outcome in saveStatus. */
  private async persist(section: Section, result: Result): Promise<void> {
    this.saveStatus.set('saving');
    try {
      const outcome = await this.board.submit(section.id, result);
      this.saveStatus.set(outcome === 'improved' ? 'saved' : 'kept-best');
    } catch {
      this.saveStatus.set('error');
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
