import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
import { NO_ANSWER, QuizService } from '../../core/quiz.service';
import { PlayerService } from '../../core/player.service';
import { subjectOfQuestion } from '../../core/models';
import { SECONDS_PER_QUESTION } from '../../core/scoring';

/** Below this many seconds the timer turns red. */
const LOW_TIME_WARNING_SECONDS = 10;

/** How long "Tap again to submit" waits for the second tap before resetting. */
const SUBMIT_CONFIRMATION_WINDOW_MS = 4000;

/** Keys that pick an option: "1" picks the first option, and so on. */
const OPTION_KEYS = ['1', '2', '3', '4'];

/** The status line under the options. `tone` picks its colour. */
interface AnswerStatus {
  tone: 'neutral' | 'saved' | 'unsaved';
  message: string;
}

/**
 * The test screen: one question at a time with a countdown, OMR-style option
 * bubbles, Previous / Clear / Save & Next, and a two-tap Submit.
 * It never shows whether an answer is right; that waits for the result screen.
 */
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnDestroy {
  protected readonly quizService = inject(QuizService);
  protected readonly playerName = inject(PlayerService).playerName;
  protected readonly subjectOfQuestion = subjectOfQuestion;
  protected readonly secondsPerQuestion = SECONDS_PER_QUESTION;

  /** Share of time left, from 1 (full) to 0, used to shrink the progress bar. */
  protected readonly timeLeftFraction = computed(() => this.quizService.secondsLeft() / SECONDS_PER_QUESTION);

  protected readonly isTimeRunningLow = computed(() => this.quizService.secondsLeft() <= LOW_TIME_WARNING_SECONDS);

  /** Questions in this test with no saved answer, shown when confirming submit. */
  protected readonly unansweredCount = computed(
    () => (this.quizService.session()?.questions.length ?? 0) - this.quizService.savedAnswerCount(),
  );

  /** Explains whether the current answer is saved. Never reveals right or wrong. */
  protected readonly answerStatus = computed<AnswerStatus>(() => {
    const selectedOption = this.quizService.selectedOption();
    const savedOption = this.quizService.savedOption();
    const hasSavedAnswer = savedOption !== NO_ANSWER;
    const hasSelection = selectedOption !== NO_ANSWER;

    if (this.quizService.isTimeUp()) {
      return {
        tone: 'neutral',
        message: hasSavedAnswer
          ? `Time's up. Saved answer: option ${savedOption}.`
          : "Time's up. No answer saved for this question.",
      };
    }
    if (hasSelection && selectedOption === savedOption) {
      return { tone: 'saved', message: `Saved: option ${savedOption}.` };
    }
    if (hasSelection) {
      return {
        tone: 'unsaved',
        message: hasSavedAnswer
          ? `Changed from option ${savedOption}. Press Save to keep the change.`
          : 'Selected. Press Save to record this answer.',
      };
    }
    return { tone: 'neutral', message: 'Not answered yet.' };
  });

  /** True after the first tap on Submit, until the second tap or the timeout. */
  protected readonly isConfirmingSubmit = signal(false);
  private confirmationResetTimer: ReturnType<typeof setTimeout> | null = null;

  /** First tap asks for confirmation; a second tap within 4 s submits. Stops accidental submits. */
  protected onSubmitClick(): void {
    if (this.isConfirmingSubmit()) {
      this.quizService.submit();
      return;
    }
    this.isConfirmingSubmit.set(true);
    this.confirmationResetTimer = setTimeout(() => this.isConfirmingSubmit.set(false), SUBMIT_CONFIRMATION_WINDOW_MS);
  }

  /** Keyboard shortcuts: 1-4 pick an option, Enter saves and moves on. */
  @HostListener('document:keydown', ['$event'])
  protected onKeyDown(event: KeyboardEvent): void {
    const focusedElementTag = (event.target as HTMLElement | null)?.tagName;

    // Leave typing in text boxes alone.
    if (focusedElementTag === 'INPUT' || focusedElementTag === 'TEXTAREA') return;

    if (OPTION_KEYS.includes(event.key)) {
      this.quizService.selectOption(Number(event.key));
    } else if (event.key === 'Enter' && focusedElementTag !== 'BUTTON') {
      // On a focused button, Enter should press that button instead.
      event.preventDefault();
      this.quizService.saveAndNext();
    }
  }

  ngOnDestroy(): void {
    if (this.confirmationResetTimer) clearTimeout(this.confirmationResetTimer);
  }
}
