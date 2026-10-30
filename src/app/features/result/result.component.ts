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

  protected readonly r = computed(() => this.quiz.result()!);
  protected readonly s = computed(() => this.quiz.session()!);
  protected readonly verdict = computed(() => verdictFor(this.r().score, this.r().total));
  protected readonly label = VERDICT_LABEL;
  protected readonly cut = computed(() => cutoffs(this.r().total));
  protected readonly accuracy = computed(() => {
    const att = this.r().correct + this.r().wrong;
    return att ? Math.round((this.r().correct * 100) / att) + '%' : '–';
  });

  protected readonly filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'wrong', label: 'Wrong' },
    { id: 'skipped', label: 'Skipped' },
    { id: 'correct', label: 'Correct' },
  ];
  protected readonly filter = signal<Filter>('all');

  protected readonly review = computed(() => {
    const { questions, saved } = this.s();
    const f = this.filter();
    return questions
      .map((q, i) => {
        const mine = saved[i];
        const state: Exclude<Filter, 'all'> = !mine ? 'skipped' : mine === q.answer ? 'correct' : 'wrong';
        return { q, mine, state };
      })
      .filter(x => f === 'all' || x.state === f);
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

  protected again(): void {
    this.player.setStatus({ status: 'lobby', q: 0, total: 0, answered: 0 });
    void this.router.navigate(['/']);
  }
}
