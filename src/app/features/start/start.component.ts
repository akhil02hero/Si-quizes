import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PlayerService } from '../../core/player.service';
import { QuizService } from '../../core/quiz.service';
import { SECTIONS, Section } from '../../core/models';
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

  protected readonly sections = SECTIONS;
  protected readonly name = new FormControl(this.player.name(), {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(24), notBlank],
  });

  protected duration(section: Section): string {
    const minutes = section.minutes;
    return minutes >= 60 ? `${Math.floor(minutes / 60)} h ${minutes % 60} min` : `${minutes} min`;
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
