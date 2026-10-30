import type { FirebaseOptions } from 'firebase/app';
import { LeaderboardEntry, LivePlayer } from './models';

export type Unsubscribe = () => void;

/** Storage behind the leaderboard and the "Playing now" list. */
export interface LeaderboardBackend {
  readonly shared: boolean;
  watchScores(cb: (entries: LeaderboardEntry[]) => void, onError: (e: unknown) => void): Unsubscribe;
  saveScore(entry: LeaderboardEntry): Promise<void>;
  watchPresence(cb: (players: LivePlayer[]) => void): Unsubscribe;
  setPresence(p: LivePlayer): Promise<void>;
}

/** Device-only fallback used when no Firebase config is set. */
export class LocalBackend implements LeaderboardBackend {
  readonly shared = false;
  private readonly key = 'si-quiz.scores';

  private read(): LeaderboardEntry[] {
    try {
      return JSON.parse(localStorage.getItem(this.key) ?? '[]');
    } catch {
      return [];
    }
  }

  watchScores(cb: (entries: LeaderboardEntry[]) => void): Unsubscribe {
    cb(this.read());
    const onStorage = (e: StorageEvent) => e.key === this.key && cb(this.read());
    const onLocal = () => cb(this.read());
    window.addEventListener('storage', onStorage);
    window.addEventListener('si-quiz-scores', onLocal);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('si-quiz-scores', onLocal);
    };
  }

  async saveScore(entry: LeaderboardEntry): Promise<void> {
    const rest = this.read().filter(e => e.playerId !== entry.playerId);
    try {
      localStorage.setItem(this.key, JSON.stringify([...rest, entry]));
    } catch {
      throw new Error('Could not write to browser storage');
    }
    window.dispatchEvent(new Event('si-quiz-scores'));
  }

  watchPresence(): Unsubscribe {
    return () => {};
  }

  async setPresence(): Promise<void> {}
}

/** Shared leaderboard on Cloud Firestore. The SDK is lazy-loaded so it stays out of the main bundle. */
export class FirestoreBackend implements LeaderboardBackend {
  readonly shared = true;
  private readonly fs = (async () => {
    const [{ initializeApp }, firestore] = await Promise.all([import('firebase/app'), import('firebase/firestore')]);
    const app = initializeApp(this.config);
    return { db: firestore.getFirestore(app), ...firestore };
  })();

  constructor(private readonly config: FirebaseOptions) {}

  watchScores(cb: (entries: LeaderboardEntry[]) => void, onError: (e: unknown) => void): Unsubscribe {
    let unsub: Unsubscribe = () => {};
    let cancelled = false;
    this.fs
      .then(f => {
        if (cancelled) return;
        unsub = f.onSnapshot(
          f.collection(f.db, 'scores'),
          snap => cb(snap.docs.map(d => ({ ...(d.data() as Omit<LeaderboardEntry, 'playerId'>), playerId: d.id }))),
          onError,
        );
      })
      .catch(onError);
    return () => {
      cancelled = true;
      unsub();
    };
  }

  async saveScore(entry: LeaderboardEntry): Promise<void> {
    const f = await this.fs;
    const { playerId, ...body } = entry;
    await f.setDoc(f.doc(f.db, 'scores', playerId), { ...body, updatedAt: f.serverTimestamp() });
  }

  watchPresence(cb: (players: LivePlayer[]) => void): Unsubscribe {
    let unsub: Unsubscribe = () => {};
    let cancelled = false;
    this.fs
      .then(f => {
        if (cancelled) return;
        unsub = f.onSnapshot(f.collection(f.db, 'presence'), snap =>
          cb(snap.docs.map(d => ({ ...(d.data() as Omit<LivePlayer, 'playerId'>), playerId: d.id }))),
        );
      })
      .catch(() => cb([]));
    return () => {
      cancelled = true;
      unsub();
    };
  }

  async setPresence(p: LivePlayer): Promise<void> {
    const f = await this.fs;
    const { playerId, ...body } = p;
    await f.setDoc(f.doc(f.db, 'presence', playerId), body);
  }
}
