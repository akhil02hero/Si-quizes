import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NO_ANSWER, QuizService } from '../../core/quiz.service';
import { PlayerService } from '../../core/player.service';
import { Question } from '../../core/models';
import { VERDICT_LABELS, cutoffsFor, verdictFor } from '../../core/scoring';
import { LeaderboardComponent } from '../../shared/leaderboard.component';

/** How a single answer turned out. */
type AnswerOutcome = 'correct' | 'wrong' | 'skipped';

/** Which answers to list in the review. */
type ReviewFilter = 'all' | AnswerOutcome;

/** One question in the answer review. */
interface ReviewItem {
  question: Question;
  /** Option the player saved (1-4), or NO_ANSWER. */
  playerAnswer: number;
  outcome: AnswerOutcome;
}

/** Text shown for each outcome in the review. */
const OUTCOME_LABELS: Record<AnswerOutcome, string> = {
  correct: 'Correct',
  wrong: 'Wrong',
  skipped: 'Skipped',
};

/**
 * Result screen: score and verdict, the counts, the leaderboard, and every
 * question with the correct answer, the player's answer and the explanation.
 * This is the first place right and wrong are shown.
 */
@Component({
  selector: 'app-result',
  imports: [LeaderboardComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  private readonly router = inject(Router);
  private readonly playerService = inject(PlayerService);
  protected readonly quizService = inject(QuizService);

  // The route guard guarantees both exist on this screen.
  protected readonly result = computed(() => this.quizService.result()!);
  protected readonly session = computed(() => this.quizService.session()!);

  protected readonly verdict = computed(() => verdictFor(this.result().score, this.result().totalQuestions));
  protected readonly verdictLabels = VERDICT_LABELS;
  protected readonly outcomeLabels = OUTCOME_LABELS;
  protected readonly cutoffs = computed(() => cutoffsFor(this.result().totalQuestions));
  protected readonly isFullPaper = computed(() => this.result().totalQuestions === 200);

  /** Share of attempted questions answered correctly, e.g. "80%"; "–" if nothing was attempted. */
  protected readonly accuracyText = computed(() => {
    const { correctCount, wrongCount } = this.result();
    const attemptedCount = correctCount + wrongCount;
    return attemptedCount ? `${Math.round((correctCount * 100) / attemptedCount)}%` : '–';
  });

  protected readonly reviewFilters: { id: ReviewFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'wrong', label: 'Wrong' },
    { id: 'skipped', label: 'Skipped' },
    { id: 'correct', label: 'Correct' },
  ];
  protected readonly selectedReviewFilter = signal<ReviewFilter>('all');

  /** Questions to list, after applying the chosen filter. */
  protected readonly reviewItems = computed<ReviewItem[]>(() => {
    const { questions, savedAnswers } = this.session();
    const filter = this.selectedReviewFilter();

    return questions
      .map((question, position) => {
        const playerAnswer = savedAnswers[position];
        const outcome: AnswerOutcome =
          playerAnswer === NO_ANSWER ? 'skipped' : playerAnswer === question.correctOption ? 'correct' : 'wrong';
        return { question, playerAnswer, outcome };
      })
      .filter(item => filter === 'all' || item.outcome === filter);
  });

  /** Message about saving to the leaderboard; empty before saving starts. */
  protected readonly leaderboardSaveMessage = computed(() => {
    switch (this.quizService.leaderboardSaveStatus()) {
      case 'saving':
        return 'Saving to the leaderboard…';
      case 'saved':
        return 'Saved to the leaderboard.';
      case 'kept-best':
        return 'Saved. Your earlier best in this section is still higher.';
      case 'error':
        return 'Not saved: the leaderboard could not be reached.';
      default:
        return '';
    }
  });

  /** Back to the start screen to pick another test. */
  protected takeAnotherTest(): void {
    this.playerService.returnToLobby();
    void this.router.navigate(['/']);
  }
}
