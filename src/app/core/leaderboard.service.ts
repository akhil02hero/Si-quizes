import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { LeaderboardEntry, LivePlayer, SectionId, TestResult } from './models';
import { LEADERBOARD_BACKEND } from './leaderboard.tokens';
import { PlayerService } from './player.service';

/** One ranked row, ready to display. */
export interface LeaderboardRow extends TestResult {
  playerId: string;
  playerName: string;
  /** 1 for the top score. */
  rank: number;
  /** True for the player on this device, so the row can be highlighted. */
  isCurrentPlayer: boolean;
}

/** Whether a newly submitted result beat the player's earlier best in that section. */
export type RecordOutcome = 'new-best' | 'kept-previous-best';

/** A player counts as "playing now" if their status was sent within this window. */
const PLAYING_NOW_WINDOW_MS = 90_000;

/** How often to re-check who has gone quiet, so the "Playing now" list ages out. */
const CLOCK_REFRESH_INTERVAL_MS = 15_000;

/**
 * Keeps the leaderboard and the "Playing now" list up to date, ranks players,
 * and records a player's result while keeping their best score per section.
 */
@Injectable({ providedIn: 'root' })
export class LeaderboardService implements OnDestroy {
  private readonly backend = inject(LEADERBOARD_BACKEND);
  private readonly playerService = inject(PlayerService);

  /** Everyone's stored scores, as last received from the backend. */
  private readonly allEntries = signal<LeaderboardEntry[]>([]);
  /** Everyone's last known live status. */
  private readonly allPresence = signal<LivePlayer[]>([]);
  /** Current time, refreshed regularly so stale players drop out of "Playing now". */
  private readonly currentTime = signal(Date.now());
  private readonly clockTimer = setInterval(() => this.currentTime.set(Date.now()), CLOCK_REFRESH_INTERVAL_MS);

  /** True when scores are shared through Firebase; false in device-only mode. */
  readonly isShared = this.backend.isShared;
  /** True once the first batch of scores has arrived. */
  readonly hasLoaded = signal(false);
  /** True if the leaderboard could not be reached. */
  readonly hasError = signal(false);

  /** Players seen recently, sorted by name. */
  readonly playersOnlineNow = computed(() =>
    this.allPresence()
      .filter(player => player.playerName && this.currentTime() - player.lastSeenAt < PLAYING_NOW_WINDOW_MS)
      .sort((first, second) => first.playerName.localeCompare(second.playerName)),
  );

  private readonly stopWatchingScores = this.backend.watchScores(
    entries => {
      this.allEntries.set(entries);
      this.hasLoaded.set(true);
      this.hasError.set(false);
    },
    () => this.hasError.set(true),
  );

  private readonly stopWatchingPresence = this.backend.watchPresence(players => this.allPresence.set(players));

  /**
   * Ranked rows for one section: highest score first; ties go to more correct
   * answers, then to whoever got there first.
   */
  rankedRowsFor(sectionId: SectionId): LeaderboardRow[] {
    return this.allEntries()
      .filter(entry => entry.bestResultBySection?.[sectionId])
      .map(entry => ({
        ...entry.bestResultBySection[sectionId]!,
        playerId: entry.playerId,
        playerName: entry.playerName,
        rank: 0,
        isCurrentPlayer: entry.playerId === this.playerService.playerId,
      }))
      .sort(
        (first, second) =>
          second.score - first.score ||
          second.correctCount - first.correctCount ||
          first.submittedAt - second.submittedAt,
      )
      .map((row, position) => ({ ...row, rank: position + 1 }));
  }

  /** Saves a submitted result. Only replaces the stored best if the new score is higher. */
  async recordResult(sectionId: SectionId, result: TestResult): Promise<RecordOutcome> {
    const myEntry = this.allEntries().find(entry => entry.playerId === this.playerService.playerId);
    const bestResultBySection = { ...(myEntry?.bestResultBySection ?? {}) };

    const previousBest = bestResultBySection[sectionId];
    const isNewBest = !previousBest || result.score > previousBest.score;
    if (isNewBest) bestResultBySection[sectionId] = result;

    await this.backend.saveScore({
      playerId: this.playerService.playerId,
      playerName: this.playerService.playerName(),
      bestResultBySection,
      attemptCount: (myEntry?.attemptCount ?? 0) + 1,
    });

    return isNewBest ? 'new-best' : 'kept-previous-best';
  }

  ngOnDestroy(): void {
    clearInterval(this.clockTimer);
    this.stopWatchingScores();
    this.stopWatchingPresence();
  }
}
