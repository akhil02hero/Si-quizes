import type { FirebaseOptions } from 'firebase/app';
import { LeaderboardEntry, LivePlayer } from './models';

export type Unsubscribe = () => void;

/** Storage behind the leaderboard and the "Playing now" list. */
export interface LeaderboardBackend {
  readonly shared: boolean;
  watchScores(onEntries: (entries: LeaderboardEntry[]) => void, onError: (error: unknown) => void): Unsubscribe;
  saveScore(entry: LeaderboardEntry): Promise<void>;
  watchPresence(onPlayers: (players: LivePlayer[]) => void): Unsubscribe;
  setPresence(player: LivePlayer): Promise<void>;
}

/** Device-only fallback used when no Firebase config is set. */
export class LocalBackend implements LeaderboardBackend {
  readonly shared = false;
  private readonly storageKey = 'si-quiz.scores';

  private readEntries(): LeaderboardEntry[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) ?? '[]');
    } catch {
      return [];
    }
  }

  watchScores(onEntries: (entries: LeaderboardEntry[]) => void): Unsubscribe {
    onEntries(this.readEntries());
    const onStorage = (event: StorageEvent) => event.key === this.storageKey && onEntries(this.readEntries());
    const onLocal = () => onEntries(this.readEntries());
    window.addEventListener('storage', onStorage);
    window.addEventListener('si-quiz-scores', onLocal);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('si-quiz-scores', onLocal);
    };
  }

  async saveScore(entry: LeaderboardEntry): Promise<void> {
    const otherEntries = this.readEntries().filter(existing => existing.playerId !== entry.playerId);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify([...otherEntries, entry]));
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
  private readonly firestore = (async () => {
    const [{ initializeApp }, firestoreModule] = await Promise.all([import('firebase/app'), import('firebase/firestore')]);
    const app = initializeApp(this.config);
    return { db: firestoreModule.getFirestore(app), ...firestoreModule };
  })();

  constructor(private readonly config: FirebaseOptions) {}

  watchScores(onEntries: (entries: LeaderboardEntry[]) => void, onError: (error: unknown) => void): Unsubscribe {
    let unsubscribe: Unsubscribe = () => {};
    let cancelled = false;
    this.firestore
      .then(firestore => {
        if (cancelled) return;
        unsubscribe = firestore.onSnapshot(
          firestore.collection(firestore.db, 'scores'),
          snapshot =>
            onEntries(
              snapshot.docs.map(scoreDoc => ({ ...(scoreDoc.data() as Omit<LeaderboardEntry, 'playerId'>), playerId: scoreDoc.id })),
            ),
          onError,
        );
      })
      .catch(onError);
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }

  async saveScore(entry: LeaderboardEntry): Promise<void> {
    const firestore = await this.firestore;
    const { playerId, ...fields } = entry;
    await firestore.setDoc(firestore.doc(firestore.db, 'scores', playerId), { ...fields, updatedAt: firestore.serverTimestamp() });
  }

  watchPresence(onPlayers: (players: LivePlayer[]) => void): Unsubscribe {
    let unsubscribe: Unsubscribe = () => {};
    let cancelled = false;
    this.firestore
      .then(firestore => {
        if (cancelled) return;
        unsubscribe = firestore.onSnapshot(firestore.collection(firestore.db, 'presence'), snapshot =>
          onPlayers(
            snapshot.docs.map(presenceDoc => ({ ...(presenceDoc.data() as Omit<LivePlayer, 'playerId'>), playerId: presenceDoc.id })),
          ),
        );
      })
      .catch(() => onPlayers([]));
    return () => {
      cancelled = true;
      unsubscribe();
    };
  }

  async setPresence(player: LivePlayer): Promise<void> {
    const firestore = await this.firestore;
    const { playerId, ...fields } = player;
    await firestore.setDoc(firestore.doc(firestore.db, 'presence', playerId), fields);
  }
}
