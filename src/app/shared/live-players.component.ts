import { Component, inject } from '@angular/core';
import { LeaderboardService } from '../core/leaderboard.service';
import { PlayerService } from '../core/player.service';

@Component({
  selector: 'app-live-players',
  template: `
    @if (board.livePlayers().length) {
      <section class="sheet" aria-label="Playing now">
        <span class="lbl">Playing now</span>
        <ul>
          @for (livePlayer of board.livePlayers(); track livePlayer.playerId) {
            <li>
              <i aria-hidden="true"></i>
              <b>{{ livePlayer.name }}{{ livePlayer.playerId === myPlayerId ? ' (you)' : '' }}</b>
              <span>
                @switch (livePlayer.status) {
                  @case ('playing') { Q{{ livePlayer.questionNumber }}/{{ livePlayer.total }} · {{ livePlayer.answered }} saved }
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
    li { display: flex; gap: 8px; align-items: center; border: 1px solid var(--line); border-radius: 999px; padding: 5px 12px 5px 8px; font-size: 14px; max-width: 100%; }
    i { width: 8px; height: 8px; border-radius: 50%; background: var(--ok); flex: none; }
    b { font-family: var(--display); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    span { font-family: var(--mono); font-size: 12px; color: var(--muted); white-space: nowrap; }
  `,
})
export class LivePlayersComponent {
  protected readonly board = inject(LeaderboardService);
  protected readonly myPlayerId = inject(PlayerService).id;
}
