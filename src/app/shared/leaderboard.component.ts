import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { LeaderboardService } from '../core/leaderboard.service';
import { SECTIONS } from '../core/models';
import { BoardRow } from '../core/ranking';
import { VERDICT_LABEL, Verdict, verdictFor } from '../core/scoring';

/** Rows shown at first, and added by each "Load more". */
const PAGE_SIZE = 20;

@Component({
  selector: 'app-leaderboard',
  imports: [DecimalPipe],
  template: `
    <section class="sheet" aria-labelledby="lb-title">
      <h2 id="lb-title">Leaderboard</h2>
      <p class="note">Each player's latest test, ranked by percentage score.</p>

      @if (board.rows().length) {
        <ol class="board">
          @for (row of visibleRows(); track row.playerId) {
            <li [class.me]="row.isMe" [class.top]="row.rank === 1">
              <span class="rk">{{ row.rank }}</span>
              <span class="nm">
                <span class="who">
                  {{ row.name }}
                  @if (row.isMe) { <small>you</small> }
                  @if (paperVerdict(row); as verdict) { <span class="tag" [class]="verdict">{{ verdictLabel[verdict] }}</span> }
                </span>
                <span class="test">{{ row.testLabel }}</span>
              </span>
              <span class="cw">✓{{ row.correct }} ✗{{ row.wrong }}</span>
              <span class="sc">{{ row.percent | number: '1.0-0' }}%<small>{{ row.score }}/{{ row.maxScore }}</small></span>
            </li>
          }
        </ol>
        @if (hiddenCount()) {
          <button class="btn ghost more" type="button" (click)="shown.set(shown() + pageSize)">
            Load more ({{ hiddenCount() }} more)
          </button>
        }
      } @else {
        <p class="note">{{ board.loaded() ? 'No scores yet. Finish a test to take the first spot.' : 'Loading scores…' }}</p>
      }

      @if (board.error()) {
        <p class="note">The leaderboard can't be reached right now. You can still take the test.</p>
      } @else if (!board.shared) {
        <p class="note">Local mode: scores are kept on this device only. Add a Firebase config to share them.</p>
      }
    </section>
  `,
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  protected readonly board = inject(LeaderboardService);
  protected readonly verdictLabel = VERDICT_LABEL;
  protected readonly pageSize = PAGE_SIZE;
  protected readonly shown = signal(PAGE_SIZE);

  /** The top rows, plus the player's own row when it is further down. */
  protected readonly visibleRows = computed(() => {
    const rows = this.board.rows();
    const top = rows.slice(0, this.shown());
    const mine = rows.find(row => row.isMe && row.rank > this.shown());
    return mine ? [...top, mine] : top;
  });
  protected readonly hiddenCount = computed(() => this.board.rows().length - this.visibleRows().length);

  /** Qualified / Well done, for SI paper attempts only. */
  protected paperVerdict(row: BoardRow): Verdict | null {
    if (!SECTIONS.some(section => section.id === row.testId)) return null;
    const verdict = verdictFor(row.score, row.total);
    return verdict === 'not-qualified' ? null : verdict;
  }
}
