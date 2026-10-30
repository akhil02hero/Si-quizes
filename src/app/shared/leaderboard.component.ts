import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { LeaderboardService } from '../core/leaderboard.service';
import { SECTIONS, SectionId } from '../core/models';
import { VERDICT_LABELS, verdictFor } from '../core/scoring';

/**
 * The leaderboard card, used on both the start and result screens.
 * Shows each player's best score in the chosen section, with a tab per section.
 */
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.scss',
})
export class LeaderboardComponent {
  protected readonly leaderboardService = inject(LeaderboardService);

  /** Section to show first. The result screen passes the section just taken. */
  readonly initialSectionId = input<SectionId>('full-paper');

  /** Tab currently open. Follows `initialSectionId` until the player picks a tab. */
  protected readonly selectedSectionId = linkedSignal(() => this.initialSectionId());

  protected readonly sections = SECTIONS;
  protected readonly verdictLabels = VERDICT_LABELS;
  protected readonly verdictFor = verdictFor;

  /** Ranked rows for the open tab. */
  protected readonly rows = computed(() => this.leaderboardService.rankedRowsFor(this.selectedSectionId()));
}
