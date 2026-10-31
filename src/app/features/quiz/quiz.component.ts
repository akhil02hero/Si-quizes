import { Component, HostListener, OnDestroy, computed, inject, signal } from '@angular/core';
import { QuizService } from '../../core/quiz.service';
import { PlayerService } from '../../core/player.service';
import { sectionOf } from '../../core/models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.scss',
})
export class QuizComponent implements OnDestroy {
  protected readonly quiz = inject(QuizService);
  protected readonly playerName = inject(PlayerService).name;
  protected readonly sectionOf = sectionOf;

  protected readonly totalSeconds = computed(() => (this.quiz.session()?.section.minutes ?? 0) * 60);
  protected readonly timeLeftFraction = computed(() => this.quiz.secondsLeft() / (this.totalSeconds() || 1));
  /** Last 5 minutes are shown in red. */
  protected readonly isLowOnTime = computed(() => this.quiz.secondsLeft() <= 5 * 60);
  /** Time left as h:mm:ss, or mm:ss under an hour. */
  protected readonly timeLeftText = computed(() => {
    const seconds = this.quiz.secondsLeft();
    const hours = Math.floor(seconds / 3600);
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return hours ? `${hours}:${minutes}:${secs}` : `${minutes}:${secs}`;
  });
  protected readonly unanswered = computed(() => (this.quiz.session()?.questions.length ?? 0) - this.quiz.savedCount());

  /** Status line under the options; never reveals whether an answer is right. */
  protected readonly status = computed(() => {
    const selected = this.quiz.selected();
    const saved = this.quiz.savedAnswer();
    if (selected && selected === saved) return { kind: 'saved', text: `Saved: option ${saved}.` };
    if (selected) {
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
  protected onKeydown(event: KeyboardEvent): void {
    const tagName = (event.target as HTMLElement | null)?.tagName;
    if (tagName === 'INPUT' || tagName === 'TEXTAREA') return;
    if (['1', '2', '3', '4'].includes(event.key)) this.quiz.select(+event.key);
    else if (event.key === 'Enter' && tagName !== 'BUTTON') {
      event.preventDefault();
      this.quiz.saveAndNext();
    }
  }

  ngOnDestroy(): void {
    if (this.confirmTimer) clearTimeout(this.confirmTimer);
  }
}
