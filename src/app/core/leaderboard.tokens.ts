import { InjectionToken } from '@angular/core';
import { FIREBASE_CONFIG } from './firebase.config';
import { FirestoreBackend, LeaderboardBackend, LocalBackend } from './leaderboard.backend';

export const LEADERBOARD_BACKEND = new InjectionToken<LeaderboardBackend>('LEADERBOARD_BACKEND', {
  providedIn: 'root',
  factory: () => (FIREBASE_CONFIG ? new FirestoreBackend(FIREBASE_CONFIG) : new LocalBackend()),
});
