import { Component, inject } from '@angular/core';
import { LeaderboardService } from '../core/leaderboard.service';
import { PlayerService } from '../core/player.service';

/**
 * "Playing now": chips for everyone with the site open, showing whether they
 * are in the lobby, which question they are on, or that they have finished.
 * Hidden when nobody else is around (always the case in local mode).
 */
@Component({
  selector: 'app-live-players',
  template: `
    @if (leaderboardService.playersOnlineNow().length) {
      <section class="card" aria-label="Playing now">
        <span class="section-label">Playing now</span>
        <ul>
          @for (player of leaderboardService.playersOnlineNow(); track player.playerId) {
            <li>
              <i class="online-dot" aria-hidden="true"></i>
              <b>{{ player.playerName }}{{ player.playerId === currentPlayerId ? ' (you)' : '' }}</b>
              <span class="activity">
                @switch (player.activity) {
                  @case ('playing') { Q{{ player.currentQuestionNumber }}/{{ player.totalQuestions }} · {{ player.answeredCount }} saved }
                  @case ('done') { finished }
                  @default { in lobby }
                }
              </span>
            </li>
          }
        </ul>
      </section>
    }
  `,
  styles: `
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
    /* One rounded chip per player. */
    li { display: flex; gap: 8px; align-items: center; border: 1px solid var(--color-rule); border-radius: 999px; padding: 5px 12px 5px 8px; font-size: 14px; max-width: 100%; }
    .online-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-correct); flex: none; }
    b { font-family: var(--font-display); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .activity { font-family: var(--font-numbers); font-size: 12px; color: var(--color-muted); white-space: nowrap; }
  `,
})
export class LivePlayersComponent {
  protected readonly leaderboardService = inject(LeaderboardService);
  /** Used to add "(you)" after this device's own player. */
  protected readonly currentPlayerId = inject(PlayerService).playerId;
}
