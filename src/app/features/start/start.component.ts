import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MAX_PLAYER_NAME_LENGTH, PlayerService } from '../../core/player.service';
import { QuizService } from '../../core/quiz.service';
import { SECTIONS, Section, questionCountOf } from '../../core/models';
import { SECONDS_PER_QUESTION } from '../../core/scoring';
import { LeaderboardComponent } from '../../shared/leaderboard.component';
import { LivePlayersComponent } from '../../shared/live-players.component';

/** Validator: fails when the name is only spaces (Validators.required lets "   " through). */
function notOnlySpaces(control: AbstractControl): ValidationErrors | null {
  const hasVisibleText = String(control.value ?? '').trim().length > 0;
  return hasVisibleText ? null : { onlySpaces: true };
}

/**
 * Start screen: the exam rules, the player's name, a button per section,
 * "Playing now" and the leaderboard.
 */
@Component({
  selector: 'app-start',
  imports: [ReactiveFormsModule, LeaderboardComponent, LivePlayersComponent],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
})
export class StartComponent {
  private readonly playerService = inject(PlayerService);
  private readonly quizService = inject(QuizService);

  protected readonly sections = SECTIONS;
  protected readonly questionCountOf = questionCountOf;
  protected readonly maxNameLength = MAX_PLAYER_NAME_LENGTH;

  /** The name field, pre-filled with the name used last time on this device. */
  protected readonly playerNameControl = new FormControl(this.playerService.playerName(), {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(MAX_PLAYER_NAME_LENGTH), notOnlySpaces],
  });

  /** Total time for a section at 50 s per question, e.g. "41 min" or "2 h 46 min". */
  protected formatDuration(section: Section): string {
    const totalMinutes = Math.floor((questionCountOf(section) * SECONDS_PER_QUESTION) / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours} h ${minutes} min` : `${minutes} min`;
  }

  /** Starts a test, but only once a name has been entered (it goes on the leaderboard). */
  protected startTest(section: Section): void {
    if (this.playerNameControl.invalid) {
      // Show the error and put the cursor in the name box.
      this.playerNameControl.markAsTouched();
      document.getElementById('player-name')?.focus();
      return;
    }
    this.playerService.setPlayerName(this.playerNameControl.value);
    this.quizService.start(section);
  }
}
