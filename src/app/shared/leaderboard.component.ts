import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { LeaderboardService } from '../core/leaderboard.service';
import { SECTIONS, SectionId } from '../core/models';
import { VERDICT_LABEL, verdictFor } from '../core/scoring';

@Component({
  selector: 'app-leaderboard',
  template: `
    <section class="sheet" aria-labelledby="lb-title">
      <h2 id="lb-title">Leaderboard</h2>
      <div class="chips" role="group" aria-label="Section">
        @for (s of sections; track s.id) {
          <button class="chip" type="button" [attr.aria-pressed]="tab() === s.id" (click)="tab.set(s.id)">{{ s.short }}</button>
        }
      </div>

      @if (rows().length) {
        <ol class="board">
          @for (r of rows(); track r.playerId) {
            <li [class.me]="r.isMe" [class.top]="r.rank === 1">
              <span class="rk">{{ r.rank }}</span>
              <span class="nm">
                {{ r.name }}
                @if (r.isMe) { <small>you</small> }
                @if (verdict(r.score, r.total); as v) {
                  @if (v !== 'not-qualified') { <span class="tag" [class]="v">{{ label[v] }}</span> }
                }
              </span>
              <span class="cw">✓{{ r.correct }} ✗{{ r.wrong }}</span>
              <span class="sc">{{ r.score }}</span>
            </li>
          }
        </ol>
      } @else {
        <p class="note">{{ board.loaded() ? 'No scores yet for this section. Finish a test to take the first spot.' : 'Loading scores…' }}</p>
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
  readonly section = input<SectionId>('all');
  protected readonly tab = linkedSignal(() => this.section());
  protected readonly sections = SECTIONS;
  protected readonly rows = computed(() => this.board.rows(this.tab()));
  protected readonly label = VERDICT_LABEL;
  protected verdict = verdictFor;
}
