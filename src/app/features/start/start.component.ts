import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PlayerService } from '../../core/player.service';
import { QuizService } from '../../core/quiz.service';
import { SECTIONS, Section } from '../../core/models';
import { SECONDS_PER_QUESTION } from '../../core/scoring';
import { LeaderboardComponent } from '../../shared/leaderboard.component';
import { LivePlayersComponent } from '../../shared/live-players.component';

const notBlank = (c: AbstractControl): ValidationErrors | null => (String(c.value ?? '').trim() ? null : { blank: true });

@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, LeaderboardComponent, LivePlayersComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  private readonly player = inject(PlayerService);
  private readonly quiz = inject(QuizService);

  protected readonly sections = SECTIONS;
  protected readonly name = new FormControl(this.player.name(), {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(24), notBlank],
  });

  protected duration(s: Section): string {
    const mins = Math.floor(((s.to - s.from + 1) * SECONDS_PER_QUESTION) / 60);
    return mins >= 60 ? `${Math.floor(mins / 60)} h ${mins % 60} min` : `${mins} min`;
  }

  protected begin(section: Section): void {
    if (this.name.invalid) {
      this.name.markAsTouched();
      document.getElementById('player-name')?.focus();
      return;
    }
    this.player.setName(this.name.value);
    this.quiz.start(section);
  }
}
