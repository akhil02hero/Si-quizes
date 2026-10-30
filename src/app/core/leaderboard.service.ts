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
      .filter(p => p.name && this.now() - p.lastSeen < LIVE_WINDOW_MS)
      .sort((a, b) => a.name.localeCompare(b.name)),
  );

  private readonly unsubScores = this.backend.watchScores(
    e => {
      this.entries.set(e);
      this.loaded.set(true);
      this.error.set(false);
    },
    () => this.error.set(true),
  );
  private readonly unsubPresence = this.backend.watchPresence(p => this.presence.set(p));

  online(): boolean {
    return this.shared && !this.error();
  }

  rows(section: SectionId): BoardRow[] {
    return this.entries()
      .filter(e => e.best?.[section])
      .map(e => ({ ...e.best[section]!, playerId: e.playerId, name: e.name, rank: 0, isMe: e.playerId === this.player.id }))
      .sort((a, b) => b.score - a.score || b.correct - a.correct || a.at - b.at)
      .map((r, i) => ({ ...r, rank: i + 1 }));
  }

  /** Records a finished attempt, keeping the player's best score per section. */
  async submit(section: SectionId, result: Result): Promise<'improved' | 'kept'> {
    const prev = this.entries().find(e => e.playerId === this.player.id);
    const best = { ...(prev?.best ?? {}) };
    const improved = !best[section] || result.score > best[section]!.score;
    if (improved) best[section] = result;
    await this.backend.saveScore({
      playerId: this.player.id,
      name: this.player.name(),
      best,
      attempts: (prev?.attempts ?? 0) + 1,
    });
    return improved ? 'improved' : 'kept';
  }

  ngOnDestroy(): void {
    clearInterval(this.clock);
    this.unsubScores();
    this.unsubPresence();
  }
}
