/**
 * Where leaderboard scores and "Playing now" statuses are stored.
 *
 * Two interchangeable implementations:
 *  - LocalBackend: this browser only. Used when no Firebase config is set.
 *  - FirestoreBackend: Cloud Firestore, shared by everyone who opens the site.
 */
import type { FirebaseOptions } from 'firebase/app';
import { LeaderboardEntry, LivePlayer } from './models';

/** Call to stop listening for updates. */
export type StopListening = () => void;

/** Everything the app needs from a storage backend. */
export interface LeaderboardBackend {
  /** True when data is shared between people; false when it stays on this device. */
  readonly isShared: boolean;
  /** Calls `onEntries` now and every time any player's scores change. */
  watchScores(onEntries: (entries: LeaderboardEntry[]) => void, onError: (error: unknown) => void): StopListening;
  /** Creates or replaces one player's leaderboard entry. */
  saveScore(entry: LeaderboardEntry): Promise<void>;
  /** Calls `onPlayers` whenever anyone's live status changes. */
  watchPresence(onPlayers: (players: LivePlayer[]) => void): StopListening;
  /** Creates or replaces one player's live status. */
  setPresence(player: LivePlayer): Promise<void>;
}

/** Browser-storage key holding all scores in local mode. */
const LOCAL_SCORES_STORAGE_KEY = 'si-quiz.scores';

/** Event fired in this tab after a local save, so the leaderboard refreshes immediately. */
const LOCAL_SCORES_CHANGED_EVENT = 'si-quiz-scores';

/**
 * Device-only storage. Scores live in this browser's localStorage, so each
 * device has its own leaderboard. There is no "Playing now" in this mode.
 */
export class LocalBackend implements LeaderboardBackend {
  readonly isShared = false;

  private readAllEntries(): LeaderboardEntry[] {
    try {
      return JSON.parse(localStorage.getItem(LOCAL_SCORES_STORAGE_KEY) ?? '[]');
    } catch {
      // Storage blocked or data corrupted: start with an empty board.
      return [];
    }
  }

  watchScores(onEntries: (entries: LeaderboardEntry[]) => void): StopListening {
    onEntries(this.readAllEntries());

    // "storage" fires when another tab changes the data; our own event covers this tab.
    const onOtherTabChange = (event: StorageEvent) => {
      if (event.key === LOCAL_SCORES_STORAGE_KEY) onEntries(this.readAllEntries());
    };
    const onThisTabChange = () => onEntries(this.readAllEntries());

    window.addEventListener('storage', onOtherTabChange);
    window.addEventListener(LOCAL_SCORES_CHANGED_EVENT, onThisTabChange);
    return () => {
      window.removeEventListener('storage', onOtherTabChange);
      window.removeEventListener(LOCAL_SCORES_CHANGED_EVENT, onThisTabChange);
    };
  }

  async saveScore(entry: LeaderboardEntry): Promise<void> {
    const otherPlayersEntries = this.readAllEntries().filter(existing => existing.playerId !== entry.playerId);
    try {
      localStorage.setItem(LOCAL_SCORES_STORAGE_KEY, JSON.stringify([...otherPlayersEntries, entry]));
    } catch {
      throw new Error('Could not write to browser storage');
    }
    window.dispatchEvent(new Event(LOCAL_SCORES_CHANGED_EVENT));
  }

  watchPresence(): StopListening {
    // Nobody else can be seen in local mode.
    return () => {};
  }

  async setPresence(): Promise<void> {
    // Nothing to share in local mode.
  }
}

/** Firestore collection with one document per player's scores. */
const SCORES_COLLECTION = 'scores';

/** Firestore collection with one document per player's live status. */
const PRESENCE_COLLECTION = 'presence';

/**
 * Shared storage on Cloud Firestore. Each player has one document in `scores`
 * and one in `presence`, both named after their player id.
 *
 * The Firebase SDK is loaded only when this backend is used, so it stays out
 * of the main bundle for local-mode builds.
 */
export class FirestoreBackend implements LeaderboardBackend {
  readonly isShared = true;

  /** Loads Firebase once and connects to the configured project. */
  private readonly firestore = (async () => {
    const [{ initializeApp }, firestoreModule] = await Promise.all([
      import('firebase/app'),
      import('firebase/firestore'),
    ]);
    const firebaseApp = initializeApp(this.firebaseConfig);
    return { database: firestoreModule.getFirestore(firebaseApp), ...firestoreModule };
  })();

  constructor(private readonly firebaseConfig: FirebaseOptions) {}

  watchScores(onEntries: (entries: LeaderboardEntry[]) => void, onError: (error: unknown) => void): StopListening {
    let stopFirestoreListener: StopListening = () => {};
    let isCancelled = false;

    this.firestore
      .then(firestore => {
        // The caller may have stopped listening before Firebase finished loading.
        if (isCancelled) return;
        stopFirestoreListener = firestore.onSnapshot(
          firestore.collection(firestore.database, SCORES_COLLECTION),
          snapshot =>
            onEntries(
              snapshot.docs.map(document => ({
                ...(document.data() as Omit<LeaderboardEntry, 'playerId'>),
                playerId: document.id,
              })),
            ),
          onError,
        );
      })
      .catch(onError);

    return () => {
      isCancelled = true;
      stopFirestoreListener();
    };
  }

  async saveScore(entry: LeaderboardEntry): Promise<void> {
    const firestore = await this.firestore;
    const { playerId, ...fieldsToStore } = entry;
    await firestore.setDoc(firestore.doc(firestore.database, SCORES_COLLECTION, playerId), {
      ...fieldsToStore,
      updatedAt: firestore.serverTimestamp(),
    });
  }

  watchPresence(onPlayers: (players: LivePlayer[]) => void): StopListening {
    let stopFirestoreListener: StopListening = () => {};
    let isCancelled = false;

    this.firestore
      .then(firestore => {
        if (isCancelled) return;
        stopFirestoreListener = firestore.onSnapshot(
          firestore.collection(firestore.database, PRESENCE_COLLECTION),
          snapshot =>
            onPlayers(
              snapshot.docs.map(document => ({
                ...(document.data() as Omit<LivePlayer, 'playerId'>),
                playerId: document.id,
              })),
            ),
        );
      })
      // If Firebase can't load, just show nobody as playing.
      .catch(() => onPlayers([]));

    return () => {
      isCancelled = true;
      stopFirestoreListener();
    };
  }

  async setPresence(player: LivePlayer): Promise<void> {
    const firestore = await this.firestore;
    const { playerId, ...fieldsToStore } = player;
    await firestore.setDoc(firestore.doc(firestore.database, PRESENCE_COLLECTION, playerId), fieldsToStore);
  }
}
