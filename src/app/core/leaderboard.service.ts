import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { LeaderboardEntry, LivePlayer, QuizTest, Result } from './models';
import { LEADERBOARD_BACKEND } from './leaderboard.tokens';
import { PlayerService } from './player.service';
import { rankEntries } from './ranking';

/** A player counts as "playing now" if they were seen within this window. */
const LIVE_WINDOW_MS = 90_000;

@Injectable({ providedIn: 'root' })
export class LeaderboardService implements OnDestroy {
  private readonly backend = inject(LEADERBOARD_BACKEND);
  private readonly player = inject(PlayerService);
  private readonly entries = signal<LeaderboardEntry[]>([]);
  private readonly presence = signal<LivePlayer[]>([]);
  private readonly now = signal(Date.now());
  private readonly clock = setInterval(() => this.now.set(Date.now()), 15_000);

  /** True when scores are shared through Firebase; false in device-only mode. */
  readonly shared = this.backend.shared;
  readonly loaded = signal(false);
  readonly error = signal(false);

  readonly livePlayers = computed(() =>
    this.presence()
      .filter(livePlayer => livePlayer.name && this.now() - livePlayer.lastSeen < LIVE_WINDOW_MS)
      .sort((first, second) => first.name.localeCompare(second.name)),
  );

  private readonly stopWatchingScores = this.backend.watchScores(
    entries => {
      this.entries.set(entries);
      this.loaded.set(true);
      this.error.set(false);
    },
    () => this.error.set(true),
  );
  private readonly stopWatchingPresence = this.backend.watchPresence(players => this.presence.set(players));

  online(): boolean {
    return this.shared && !this.error();
  }

  /** Every player's latest attempt, best percentage first. */
  readonly rows = computed(() => rankEntries(this.entries(), this.player.id));

  /** Records a finished attempt as the player's latest one. */
  async submit(test: QuizTest, result: Result): Promise<void> {
    const previousEntry = this.entries().find(entry => entry.playerId === this.player.id);
    await this.backend.saveScore({
      playerId: this.player.id,
      name: this.player.name(),
      last: { ...result, testId: test.id, testLabel: test.label },
      attempts: (previousEntry?.attempts ?? 0) + 1,
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.clock);
    this.stopWatchingScores();
    this.stopWatchingPresence();
  }
}
