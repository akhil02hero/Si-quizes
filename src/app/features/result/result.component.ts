import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../core/quiz.service';
import { PlayerService } from '../../core/player.service';
import { VERDICT_LABEL, cutoffs, verdictFor } from '../../core/scoring';
import { LeaderboardComponent } from '../../shared/leaderboard.component';

type Filter = 'all' | 'wrong' | 'skipped' | 'correct';

@Component({
  selector: 'app-result',
  imports: [LeaderboardComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss',
})
export class ResultComponent {
  private readonly router = inject(Router);
  private readonly player = inject(PlayerService);
  protected readonly quiz = inject(QuizService);

  protected readonly result = computed(() => this.quiz.result()!);
  protected readonly session = computed(() => this.quiz.session()!);
  protected readonly verdict = computed(() => verdictFor(this.result().score, this.result().total));
  protected readonly verdictLabel = VERDICT_LABEL;
  protected readonly scaledCutoffs = computed(() => cutoffs(this.result().total));
  protected readonly accuracy = computed(() => {
    const attempted = this.result().correct + this.result().wrong;
    return attempted ? Math.round((this.result().correct * 100) / attempted) + '%' : '–';
  });

  protected readonly filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'wrong', label: 'Wrong' },
    { id: 'skipped', label: 'Skipped' },
    { id: 'correct', label: 'Correct' },
  ];
  protected readonly filter = signal<Filter>('all');

  protected readonly review = computed(() => {
    const { questions, saved } = this.session();
    const activeFilter = this.filter();
    return questions
      .map((question, index) => {
        const myAnswer = saved[index];
        const state: Exclude<Filter, 'all'> = !myAnswer ? 'skipped' : myAnswer === question.answer ? 'correct' : 'wrong';
        return { question, myAnswer, state };
      })
      .filter(item => activeFilter === 'all' || item.state === activeFilter);
  });

  protected readonly saveText = computed(() => {
    switch (this.quiz.saveStatus()) {
      case 'saving': return 'Saving to the leaderboard…';
      case 'saved': return 'Saved to the leaderboard.';
      case 'kept-best': return 'Saved. Your earlier best in this section is still higher.';
      case 'error': return 'Not saved: the leaderboard could not be reached.';
      default: return '';
    }
  });

  protected startAgain(): void {
    this.player.setStatus({ status: 'lobby', questionNumber: 0, total: 0, answered: 0 });
    void this.router.navigate(['/']);
  }
}
