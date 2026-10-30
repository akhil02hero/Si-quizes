import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { PlayerProgress } from './models';
import { LEADERBOARD_BACKEND } from './leaderboard.tokens';

/** Browser-storage key for the name the player typed. */
const PLAYER_NAME_STORAGE_KEY = 'si-quiz.name';

/** Browser-storage key for the anonymous player id. */
const PLAYER_ID_STORAGE_KEY = 'si-quiz.player-id';

/** How often to re-send "I'm still here" while the page is open. */
const PRESENCE_HEARTBEAT_INTERVAL_MS = 30_000;

/** Longest name allowed, matching the input's maxlength and the Firestore rules. */
export const MAX_PLAYER_NAME_LENGTH = 24;

/** Status sent before the player starts a test. */
const IN_LOBBY: PlayerProgress = { activity: 'lobby', currentQuestionNumber: 0, totalQuestions: 0, answeredCount: 0 };

/**
 * Who is playing on this device: the name they typed, an anonymous id that
 * stays the same across visits, and their live progress for "Playing now".
 *
 * There is no sign-in. The id is a random UUID kept in the browser, so the
 * same person on another device or after clearing site data counts as new.
 */
@Injectable({ providedIn: 'root' })
export class PlayerService implements OnDestroy {
  private readonly backend = inject(LEADERBOARD_BACKEND);

  /** Last progress reported by the quiz; re-sent on every heartbeat. */
  private currentProgress: PlayerProgress = IN_LOBBY;

  /** Re-sends presence regularly so this player doesn't drop off "Playing now". */
  private readonly heartbeatTimer = setInterval(() => this.publishPresence(), PRESENCE_HEARTBEAT_INTERVAL_MS);

  /** Anonymous id for this browser. */
  readonly playerId = this.loadOrCreatePlayerId();

  /** The player's display name; empty until they type one. */
  readonly playerName = signal(this.readFromStorage(PLAYER_NAME_STORAGE_KEY) ?? '');

  /** Stores a new display name (trimmed and length-limited) and announces it. */
  setPlayerName(name: string): void {
    const cleanedName = name.trim().slice(0, MAX_PLAYER_NAME_LENGTH);
    this.playerName.set(cleanedName);
    this.writeToStorage(PLAYER_NAME_STORAGE_KEY, cleanedName);
    this.publishPresence();
  }

  /** Called by the quiz whenever the player moves, saves, finishes or returns to the lobby. */
  updateProgress(progress: PlayerProgress): void {
    this.currentProgress = progress;
    this.publishPresence();
  }

  /** Marks the player as back on the start screen. */
  returnToLobby(): void {
    this.updateProgress(IN_LOBBY);
  }

  /** Sends this player's live status. Players without a name are not listed. */
  private publishPresence(): void {
    const playerName = this.playerName();
    if (!playerName) return;

    this.backend
      .setPresence({ playerId: this.playerId, playerName, lastSeenAt: Date.now(), ...this.currentProgress })
      // Presence is a nice-to-have; a failed update must never interrupt the test.
      .catch(() => {});
  }

  /** Reads a value from browser storage, or null if storage is blocked (e.g. private mode). */
  private readFromStorage(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  /** Writes to browser storage. If storage is blocked, the value lasts for this visit only. */
  private writeToStorage(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore: the app still works, it just won't remember this next time.
    }
  }

  /** Reuses this browser's id, or creates and stores a new one on the first visit. */
  private loadOrCreatePlayerId(): string {
    const existingId = this.readFromStorage(PLAYER_ID_STORAGE_KEY);
    if (existingId) return existingId;

    const newId = crypto.randomUUID();
    this.writeToStorage(PLAYER_ID_STORAGE_KEY, newId);
    return newId;
  }

  ngOnDestroy(): void {
    clearInterval(this.heartbeatTimer);
  }
}
