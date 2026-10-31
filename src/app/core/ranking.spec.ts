import { Attempt, LeaderboardEntry } from './models';
import { latestAttempt, rankEntries } from './ranking';

const attempt = (score: number, total: number, at: number, testLabel = 'Test'): Attempt => ({
  score, correct: 0, wrong: 0, skipped: 0, total, at, testId: 'x', testLabel,
});
const entry = (playerId: string, last: Attempt): LeaderboardEntry => ({ playerId, name: playerId, last, attempts: 1 });

describe('leaderboard ranking', () => {
  it('ranks by percentage, so tests of different sizes compare fairly', () => {
    const rows = rankEntries(
      [entry('paper', attempt(240, 200, 1)), entry('chapter', attempt(80, 50, 1))],
      'paper',
    );
    expect(rows.map(row => [row.playerId, row.rank, row.percent])).toEqual([
      ['chapter', 1, 80],
      ['paper', 2, 60],
    ]);
    expect(rows[1].isMe).toBeTrue();
    expect(rows[1].maxScore).toBe(400);
  });

  it('puts the more recent attempt first on a tie', () => {
    const rows = rankEntries([entry('older', attempt(50, 50, 1)), entry('newer', attempt(50, 50, 2))], '');
    expect(rows.map(row => row.playerId)).toEqual(['newer', 'older']);
  });

  it('turns an old best-per-section entry into its most recent SI result', () => {
    const old = {
      playerId: 'p', name: 'p', attempts: 2,
      best: { ar: attempt(40, 50, 5), all: attempt(100, 200, 9) },
    };
    const latest = latestAttempt(old)!;
    expect(latest.testId).toBe('all');
    expect(latest.testLabel).toBe('SI Prelims 2022 · Full paper · Q1–200');
  });
});
