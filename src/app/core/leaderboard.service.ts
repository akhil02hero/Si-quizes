import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { LeaderboardEntry, LivePlayer, Result, SectionId } from './models';
import { LEADERBOARD_BACKEND } from './leaderboard.tokens';
import { PlayerService } from './player.service';

export interface BoardRow extends Result {
  playerId: string;
  name: string;
  rank: number;
  isMe: boolean;
}

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

  rows(section: SectionId): BoardRow[] {
    return this.entries()
      .filter(entry => entry.best?.[section])
      .map(entry => ({
        ...entry.best[section]!,
        playerId: entry.playerId,
        name: entry.name,
        rank: 0,
        isMe: entry.playerId === this.player.id,
      }))
      .sort((first, second) => second.score - first.score || second.correct - first.correct || first.at - second.at)
      .map((row, index) => ({ ...row, rank: index + 1 }));
  }

  /** Records a finished attempt, keeping the player's best score per section. */
  async submit(section: SectionId, result: Result): Promise<'improved' | 'kept'> {
    const previousEntry = this.entries().find(entry => entry.playerId === this.player.id);
    const bestResults = { ...(previousEntry?.best ?? {}) };
    const improved = !bestResults[section] || result.score > bestResults[section]!.score;
    if (improved) bestResults[section] = result;
    await this.backend.saveScore({
      playerId: this.player.id,
      name: this.player.name(),
      best: bestResults,
      attempts: (previousEntry?.attempts ?? 0) + 1,
    });
    return improved ? 'improved' : 'kept';
  }

  ngOnDestroy(): void {
    clearInterval(this.clock);
    this.stopWatchingScores();
    this.stopWatchingPresence();
  }
}
