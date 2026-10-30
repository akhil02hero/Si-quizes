import { Injectable, OnDestroy, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QUESTIONS } from './questions';
import { Question, Result, Section } from './models';
import { SECONDS_PER_QUESTION, scoreAnswers } from './scoring';
import { PlayerService } from './player.service';
import { LeaderboardService } from './leaderboard.service';

export interface Session {
  section: Section;
  questions: readonly Question[];
  index: number;
  /** Saved answers (what gets scored). 0 = none. */
  saved: number[];
  /** Current, possibly unsaved, selection per question. */
  selected: number[];
  /** Seconds left per question. Each question has its own 50 s budget. */
  left: number[];
}

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'kept-best' | 'error' | 'offline';

/** Holds one test attempt: navigation, per-question timers, saved answers and the final result. */
@Injectable({ providedIn: 'root' })
export class QuizService implements OnDestroy {
  private readonly router = inject(Router);
  private readonly player = inject(PlayerService);
  private readonly board = inject(LeaderboardService);
  private timer: ReturnType<typeof setInterval> | null = null;

  readonly session = signal<Session | null>(null);
  readonly result = signal<Result | null>(null);
  readonly saveStatus = signal<SaveStatus>('idle');

  readonly question = computed(() => {
    const s = this.session();
    return s ? s.questions[s.index] : null;
  });
  readonly secondsLeft = computed(() => {
    const s = this.session();
    return s ? Math.max(0, s.left[s.index]) : 0;
  });
  readonly expired = computed(() => this.secondsLeft() <= 0);
  readonly selected = computed(() => {
    const s = this.session();
    return s ? s.selected[s.index] : 0;
  });
  readonly savedAnswer = computed(() => {
    const s = this.session();
    return s ? s.saved[s.index] : 0;
  });
  readonly savedCount = computed(() => this.session()?.saved.filter(Boolean).length ?? 0);
  readonly isFirst = computed(() => this.session()?.index === 0);
  readonly isLast = computed(() => {
    const s = this.session();
    return !!s && s.index === s.questions.length - 1;
  });

  start(section: Section): void {
    const questions = QUESTIONS.filter(q => q.n >= section.from && q.n <= section.to);
    const n = questions.length;
    this.result.set(null);
    this.saveStatus.set('idle');
    this.session.set({
      section,
      questions,
      index: 0,
      saved: Array(n).fill(0),
      selected: Array(n).fill(0),
      left: Array(n).fill(SECONDS_PER_QUESTION),
    });
    this.startTimer();
    this.reportPresence();
    void this.router.navigate(['/quiz']);
  }

  select(option: number): void {
    if (this.expired()) return;
    this.patch(s => (s.selected[s.index] = option));
  }

  clear(): void {
    if (this.expired()) return;
    this.patch(s => {
      s.selected[s.index] = 0;
      s.saved[s.index] = 0;
    });
  }

  saveAndNext(): void {
    if (!this.expired()) this.patch(s => (s.saved[s.index] = s.selected[s.index]));
    this.reportPresence();
    this.move(1);
  }

  previous(): void {
    this.move(-1);
  }

  submit(): void {
    const s = this.session();
    if (!s) return;
    this.stopTimer();
    const result = scoreAnswers(s.questions, s.saved);
    this.result.set(result);
    this.player.setStatus({ status: 'done', q: s.questions.length, total: s.questions.length, answered: this.savedCount() });
    void this.router.navigate(['/result']);
    void this.persist(s.section, result);
  }

  /** Leave a question: an unsaved change is dropped and the saved answer shows again on return. */
  private move(delta: number): void {
    const s = this.session();
    if (!s) return;
    const j = s.index + delta;
    if (j < 0 || j >= s.questions.length) return;
    this.patch(x => {
      if (x.left[x.index] > 0) x.selected[x.index] = x.saved[x.index];
      x.index = j;
    });
    this.startTimer();
    this.reportPresence();
  }

  private startTimer(): void {
    this.stopTimer();
    if (this.expired()) return;
    this.timer = setInterval(() => this.tick(), 1000);
  }

  private stopTimer(): void {
    if (this.timer) clearInterval(this.timer);
    this.timer = null;
  }

  private tick(): void {
    this.patch(s => (s.left[s.index] = Math.max(0, s.left[s.index] - 1)));
    if (!this.expired()) return;
    this.stopTimer();
    // Time's up: unsaved selection is discarded, then move on (or submit when nothing has time left).
    this.patch(s => (s.selected[s.index] = s.saved[s.index]));
    const s = this.session()!;
    if (s.index < s.questions.length - 1) this.move(1);
    else if (s.left.every(l => l <= 0)) this.submit();
  }

  private patch(fn: (s: Session) => void): void {
    const s = this.session();
    if (!s) return;
    const copy: Session = { ...s, saved: [...s.saved], selected: [...s.selected], left: [...s.left] };
    fn(copy);
    this.session.set(copy);
  }

  private reportPresence(): void {
    const s = this.session();
    if (!s) return;
    this.player.setStatus({ status: 'playing', q: s.index + 1, total: s.questions.length, answered: this.savedCount() });
  }

  private async persist(section: Section, result: Result): Promise<void> {
    this.saveStatus.set('saving');
    try {
      const outcome = await this.board.submit(section.id, result);
      this.saveStatus.set(outcome === 'improved' ? 'saved' : 'kept-best');
    } catch {
      this.saveStatus.set('error');
    }
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
