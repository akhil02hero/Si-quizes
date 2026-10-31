import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { findCategory, testsOf } from '../../practice/practice';
import { PracticeChapter } from '../../practice/practice.models';

/** One subject (e.g. Biology): its chapters, each linking to the chapter's tests. */
@Component({
  selector: 'app-practice-category',
  imports: [RouterLink],
  template: `
    <a class="back" routerLink="/">← Home</a>
    @if (category(); as category) {
      <header class="stack" style="gap:8px">
        <span class="lbl">Practice by subject</span>
        <h1>{{ category.name }}</h1>
        <p class="note">
          {{ category.chapters.length }} chapters. Each chapter is split into tests of up to 50 questions,
          with 45 seconds per question on one timer for the whole test.
        </p>
      </header>
      <section class="sheet">
        <span class="lbl">Choose a chapter</span>
        <div class="sections">
          @for (chapter of category.chapters; track chapter.id; let index = $index) {
            <a class="sec" [routerLink]="[chapter.id]">
              <span>{{ index + 1 }}. {{ chapter.name }}</span>
              <small>{{ chapter.questionCount }} Qs · {{ testCount(chapter) }} {{ testCount(chapter) === 1 ? 'test' : 'tests' }}</small>
            </a>
          }
        </div>
      </section>
    } @else {
      <p class="note">This subject doesn't exist. Go back to the start page to pick one.</p>
    }
  `,
  styles: `:host { display: flex; flex-direction: column; gap: 20px; }`,
})
export class CategoryComponent {
  /** From the route, /practice/:categoryId. */
  readonly categoryId = input.required<string>();
  protected readonly category = computed(() => findCategory(this.categoryId()));

  protected testCount(chapter: PracticeChapter): number {
    return testsOf(chapter).length;
  }
}
