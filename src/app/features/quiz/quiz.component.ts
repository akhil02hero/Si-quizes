import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
import { QuizService } from '../../core/quiz.service';
import { PlayerService } from '../../core/player.service';
import { sectionOf } from '../../core/models';
import { SECONDS_PER_QUESTION } from '../../core/scoring';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnDestroy {
  protected readonly quiz = inject(QuizService);
  protected readonly playerName = inject(PlayerService).name;
  protected readonly sectionOf = sectionOf;

  protected readonly fuse = computed(() => this.quiz.secondsLeft() / SECONDS_PER_QUESTION);
  protected readonly low = computed(() => this.quiz.secondsLeft() <= 10);
  protected readonly unanswered = computed(() => (this.quiz.session()?.questions.length ?? 0) - this.quiz.savedCount());

  /** Status line under the options; never reveals whether an answer is right. */
  protected readonly status = computed(() => {
    const sel = this.quiz.selected();
    const saved = this.quiz.savedAnswer();
    if (this.quiz.expired()) {
      return { kind: '', text: saved ? `Time's up. Saved answer: option ${saved}.` : "Time's up. No answer saved for this question." };
    }
    if (sel && sel === saved) return { kind: 'saved', text: `Saved: option ${saved}.` };
    if (sel) {
      return {
        kind: 'unsaved',
        text: saved ? `Changed from option ${saved}. Press Save to keep the change.` : 'Selected. Press Save to record this answer.',
      };
    }
    return { kind: '', text: 'Not answered yet.' };
  });

  /** Two-step submit so a stray tap doesn't end the test. */
  protected readonly confirming = signal(false);
  private confirmTimer: ReturnType<typeof setTimeout> | null = null;

  protected submit(): void {
    if (this.confirming()) {
      this.quiz.submit();
      return;
    }
    this.confirming.set(true);
    this.confirmTimer = setTimeout(() => this.confirming.set(false), 4000);
  }

  @HostListener('document:keydown', ['$event'])
  protected onKey(e: KeyboardEvent): void {
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA') return;
    if (['1', '2', '3', '4'].includes(e.key)) this.quiz.select(+e.key);
    else if (e.key === 'Enter' && tag !== 'BUTTON') {
      e.preventDefault();
      this.quiz.saveAndNext();
    }
  }

  ngOnDestroy(): void {
    if (this.confirmTimer) clearTimeout(this.confirmTimer);
  }
}
