import type { FirebaseOptions } from 'firebase/app';

/**
 * Paste your Firebase web-app config here to turn on the shared leaderboard
 * and the "Playing now" list (Firebase console → Project settings → Your apps).
 *
 * While this is `null` the app runs in local mode: scores are kept in this
 * browser only, which is handy for development.
 */
export const FIREBASE_CONFIG: FirebaseOptions | null = null;
