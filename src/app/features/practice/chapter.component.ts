import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlayerService } from '../../core/player.service';
import { QuizService } from '../../core/quiz.service';
import { findCategory, findChapter, formatDuration, loadPracticeTest, testsOf } from '../../practice/practice';
import { PracticeTestInfo } from '../../practice/practice.models';

/** One chapter: its tests of up to 50 questions. Picking one loads its questions and starts the quiz. */
@Component({
  selector: 'app-practice-chapter',
  imports: [RouterLink],
  template: `
    @if (category(); as category) {
      <a class="back" [routerLink]="['/practice', category.id]">← {{ category.name }}</a>
    } @else {
      <a class="back" routerLink="/">← Home</a>
    }
    @if (chapter(); as chapter) {
      <header class="stack" style="gap:8px">
        <span class="lbl">{{ category()!.name }}</span>
        <h1>{{ chapter.name }}</h1>
        <p class="note">{{ chapter.questionCount }} questions from the book, in book order.</p>
      </header>
      <section class="sheet">
        <span class="lbl">Choose a test</span>
        @if (!playerName()) {
          <p class="err">Enter your name on the <a routerLink="/">start page</a> first. It shows on the leaderboard.</p>
        }
        <div class="sections">
          @for (test of tests(); track test.number) {
            <button class="sec" type="button" [disabled]="!playerName() || loading() !== null" (click)="begin(test)">
              <span>Test {{ test.number }}<br><small>Q{{ test.from }}–{{ test.to }}</small></span>
              <small>{{ loading() === test.number ? 'Loading…' : test.questionCount + ' Qs · ' + duration(test) }}</small>
            </button>
          }
        </div>
        @if (failed()) {
          <p class="err">The questions couldn't be loaded. Check your connection and try again.</p>
        }
      </section>
    } @else {
      <p class="note">This chapter doesn't exist. Go back and pick another one.</p>
    }
  `,
  styles: `
    :host { display: flex; flex-direction: column; gap: 20px; }
    .err { color: var(--bad); font-size: 14px; a { color: inherit; } }
  `,
})
export class ChapterComponent {
  private readonly quiz = inject(QuizService);
  protected readonly playerName = inject(PlayerService).name;

  /** From the route, /practice/:categoryId/:chapterId. */
  readonly categoryId = input.required<string>();
  readonly chapterId = input.required<string>();

  protected readonly category = computed(() => findCategory(this.categoryId()));
  protected readonly chapter = computed(() => findChapter(this.categoryId(), this.chapterId()));
  protected readonly tests = computed(() => {
    const chapter = this.chapter();
    return chapter ? testsOf(chapter) : [];
  });
  /** Number of the test whose questions are being fetched, or null. */
  protected readonly loading = signal<number | null>(null);
  protected readonly failed = signal(false);

  protected duration(test: PracticeTestInfo): string {
    return formatDuration(test.seconds);
  }

  protected async begin(test: PracticeTestInfo): Promise<void> {
    this.loading.set(test.number);
    this.failed.set(false);
    try {
      this.quiz.start(await loadPracticeTest(this.categoryId(), this.chapterId(), test.number));
    } catch {
      this.failed.set(true);
    } finally {
      this.loading.set(null);
    }
  }
}
