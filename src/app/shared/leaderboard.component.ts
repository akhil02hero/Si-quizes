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
        @for (section of sections; track section.id) {
          <button class="chip" type="button" [attr.aria-pressed]="selectedSection() === section.id" (click)="selectedSection.set(section.id)">{{ section.shortName }}</button>
        }
      </div>

      @if (rows().length) {
        <ol class="board">
          @for (row of rows(); track row.playerId) {
            <li [class.me]="row.isMe" [class.top]="row.rank === 1">
              <span class="rk">{{ row.rank }}</span>
              <span class="nm">
                {{ row.name }}
                @if (row.isMe) { <small>you</small> }
                @if (verdictFor(row.score, row.total); as rowVerdict) {
                  @if (rowVerdict !== 'not-qualified') { <span class="tag" [class]="rowVerdict">{{ verdictLabel[rowVerdict] }}</span> }
                }
              </span>
              <span class="cw">✓{{ row.correct }} ✗{{ row.wrong }}</span>
              <span class="sc">{{ row.score }}</span>
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
  protected readonly selectedSection = linkedSignal(() => this.section());
  protected readonly sections = SECTIONS;
  protected readonly rows = computed(() => this.board.rows(this.selectedSection()));
  protected readonly verdictLabel = VERDICT_LABEL;
  protected readonly verdictFor = verdictFor;
}
