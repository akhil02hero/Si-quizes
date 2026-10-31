import { Attempt, LeaderboardEntry, Result, SECTIONS, SectionId, paperLabel } from './models';
import { MARK_CORRECT } from './scoring';

export interface BoardRow extends Attempt {
  playerId: string;
  name: string;
  rank: number;
  isMe: boolean;
  /** Highest possible score for the test the row is about. */
  maxScore: number;
  /** Score as a share of maxScore, so tests of different sizes compare fairly. */
  percent: number;
}

/** Entries saved before the single leaderboard kept the best result per SI section instead of `last`. */
type StoredEntry = Omit<LeaderboardEntry, 'last'> & {
  last?: Attempt;
  best?: Partial<Record<SectionId, Result>>;
};

/** The entry's latest attempt; for old entries, their most recent SI section result. */
export function latestAttempt(entry: StoredEntry): Attempt | null {
  if (entry.last) return entry.last;
  let latest: Attempt | null = null;
  for (const section of SECTIONS) {
    const result = entry.best?.[section.id];
    if (result && (!latest || result.at > latest.at)) {
      latest = { ...result, testId: section.id, testLabel: paperLabel(section) };
    }
  }
  return latest;
}

/** One row per player, best percentage first; on a tie the more recent attempt ranks higher. */
export function rankEntries(entries: readonly StoredEntry[], myPlayerId: string): BoardRow[] {
  const rows: BoardRow[] = [];
  for (const entry of entries) {
    const attempt = latestAttempt(entry);
    if (!attempt || !attempt.total) continue;
    const maxScore = attempt.total * MARK_CORRECT;
    rows.push({
      ...attempt,
      playerId: entry.playerId,
      name: entry.name,
      rank: 0,
      isMe: entry.playerId === myPlayerId,
      maxScore,
      percent: (attempt.score / maxScore) * 100,
    });
  }
  return rows
    .sort((first, second) => second.percent - first.percent || second.at - first.at)
    .map((row, index) => ({ ...row, rank: index + 1 }));
}
