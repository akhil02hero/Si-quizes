import { Injectable, OnDestroy, inject, signal } from '@angular/core';
import { LivePlayer } from './models';
import { LEADERBOARD_BACKEND } from './leaderboard.tokens';

const NAME_KEY = 'si-quiz.name';
const ID_KEY = 'si-quiz.player-id';
const HEARTBEAT_MS = 30_000;

/** Who is playing on this device: their chosen name, a stable anonymous id, and their live status. */
@Injectable({ providedIn: 'root' })
export class PlayerService implements OnDestroy {
  private readonly backend = inject(LEADERBOARD_BACKEND);
  private status: Omit<LivePlayer, 'playerId' | 'name' | 'lastSeen'> = { status: 'lobby', q: 0, total: 0, answered: 0 };
  private readonly heartbeat = setInterval(() => this.publish(), HEARTBEAT_MS);

  readonly id = this.loadId();
  readonly name = signal(this.load(NAME_KEY) ?? '');

  setName(name: string): void {
    const clean = name.trim().slice(0, 24);
    this.name.set(clean);
    try {
      localStorage.setItem(NAME_KEY, clean);
    } catch {
      /* storage blocked: name lasts for this visit only */
    }
    this.publish();
  }

  setStatus(status: Omit<LivePlayer, 'playerId' | 'name' | 'lastSeen'>): void {
    this.status = status;
    this.publish();
  }

  private publish(): void {
    if (!this.name()) return;
    this.backend
      .setPresence({ playerId: this.id, name: this.name(), lastSeen: Date.now(), ...this.status })
      .catch(() => {});
  }

  private load(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  private loadId(): string {
    const existing = this.load(ID_KEY);
    if (existing) return existing;
    const id = crypto.randomUUID();
    try {
      localStorage.setItem(ID_KEY, id);
    } catch {
      /* fine: a new id per visit */
    }
    return id;
  }

  ngOnDestroy(): void {
    clearInterval(this.heartbeat);
  }
}
