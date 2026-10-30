import { InjectionToken } from '@angular/core';
import { FIREBASE_CONFIG } from './firebase.config';
import { FirestoreBackend, LeaderboardBackend, LocalBackend } from './leaderboard.backend';

/**
 * Picks the storage for scores and presence once, when the app starts:
 * Firestore if a Firebase config is set, otherwise this browser only.
 * Inject this token instead of creating a backend directly, so tests can swap in a fake.
 */
export const LEADERBOARD_BACKEND = new InjectionToken<LeaderboardBackend>('LEADERBOARD_BACKEND', {
  providedIn: 'root',
  factory: () => (FIREBASE_CONFIG ? new FirestoreBackend(FIREBASE_CONFIG) : new LocalBackend()),
});
