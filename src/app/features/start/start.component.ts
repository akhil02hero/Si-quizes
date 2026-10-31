import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PlayerService } from '../../core/player.service';
import { QuizService } from '../../core/quiz.service';
import { SECTIONS, Section } from '../../core/models';
import { paperTest } from '../../core/paper-test';
import { PRACTICE_CATEGORIES } from '../../practice/catalog';
import { PracticeCategory } from '../../practice/practice.models';
import { LeaderboardComponent } from '../../shared/leaderboard.component';
import { LivePlayersComponent } from '../../shared/live-players.component';

const notBlank = (control: AbstractControl): ValidationErrors | null => (String(control.value ?? '').trim() ? null : { blank: true });

@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, LeaderboardComponent, LivePlayersComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  private readonly player = inject(PlayerService);
  private readonly quiz = inject(QuizService);
  private readonly router = inject(Router);

  protected readonly sections = SECTIONS;
  protected readonly categories = PRACTICE_CATEGORIES;
  protected readonly name = new FormControl(this.player.name(), {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(24), notBlank],
  });

  protected duration(section: Section): string {
    const minutes = section.minutes;
    return minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
  }

  protected questionCount(category: PracticeCategory): number {
    return category.chapters.reduce((sum, chapter) => sum + chapter.questionCount, 0);
  }

  protected begin(section: Section): void {
    if (!this.saveName()) return;
    this.quiz.start(paperTest(section));
  }

  protected openCategory(category: PracticeCategory): void {
    if (!this.saveName()) return;
    void this.router.navigate(['/practice', category.id]);
  }

  /** Every test needs a name for the leaderboard; point at the field when it's missing. */
  private saveName(): boolean {
    if (this.name.invalid) {
      this.name.markAsTouched();
      document.getElementById('player-name')?.focus();
      return false;
    }
    this.player.setName(this.name.value);
    return true;
  }
}
