/**
 * Shared data shapes used across the app: questions, sections, test results,
 * leaderboard entries and the "Playing now" status of each player.
 */

/** One multiple-choice question from the paper. */
export interface Question {
  /** Question number as printed in the paper (1-200). */
  number: number;
  /** The question as shown to the player. */
  text: string;
  /** The four answer choices, in the order printed in the paper. */
  options: readonly string[];
  /** Which option is correct, counting from 1 (1 = first option). */
  correctOption: number;
  /** Worked explanation shown on the result screen after submitting. */
  explanation: string;
  /** Path of the diagram under /public, only for figure-based questions. */
  figureImagePath?: string;
}

/** Identifies a part of the paper a player can attempt. */
export type SectionId = 'full-paper' | 'arithmetic' | 'reasoning' | 'general-studies';

/** A block of consecutive questions that can be taken as one test. */
export interface Section {
  id: SectionId;
  /** Full name, used on the start screen and result screen. */
  name: string;
  /** Short name, used on the leaderboard tabs. */
  shortName: string;
  /** Number of the first question in this section (inclusive). */
  firstQuestionNumber: number;
  /** Number of the last question in this section (inclusive). */
  lastQuestionNumber: number;
}

/** Everything a player can choose to attempt, in the order shown on the start screen. */
export const SECTIONS: readonly Section[] = [
  { id: 'full-paper', name: 'Full paper', shortName: 'Full paper', firstQuestionNumber: 1, lastQuestionNumber: 200 },
  { id: 'arithmetic', name: 'Arithmetic', shortName: 'Arithmetic', firstQuestionNumber: 1, lastQuestionNumber: 50 },
  { id: 'reasoning', name: 'Reasoning & mental ability', shortName: 'Reasoning', firstQuestionNumber: 51, lastQuestionNumber: 100 },
  { id: 'general-studies', name: 'General studies & Telangana', shortName: 'GS', firstQuestionNumber: 101, lastQuestionNumber: 200 },
];

/** Number of questions in a section. */
export function questionCountOf(section: Section): number {
  return section.lastQuestionNumber - section.firstQuestionNumber + 1;
}

/** Subject label shown above a question, based on where it sits in the paper. */
export function subjectOfQuestion(questionNumber: number): string {
  if (questionNumber <= 50) return 'Arithmetic';
  if (questionNumber <= 100) return 'Reasoning & mental ability';
  return 'General studies';
}

/** The outcome of one submitted test. */
export interface TestResult {
  /** Final marks: +2 per correct answer, -0.2 per wrong answer. */
  score: number;
  correctCount: number;
  wrongCount: number;
  /** Questions left unanswered, including ones whose time ran out. */
  skippedCount: number;
  /** How many questions the test had. */
  totalQuestions: number;
  /** When the test was submitted (milliseconds since 1970, as from Date.now()). */
  submittedAt: number;
}

/** One player's row in the leaderboard storage. */
export interface LeaderboardEntry {
  /** Anonymous id stored in the player's browser. */
  playerId: string;
  playerName: string;
  /** The player's highest-scoring result in each section they have attempted. */
  bestResultBySection: Partial<Record<SectionId, TestResult>>;
  /** Total number of tests this player has submitted, across all sections. */
  attemptCount: number;
}

/** What a player is doing right now. */
export type PlayerActivity = 'lobby' | 'playing' | 'done';

/** A player's live status, used by the "Playing now" list. */
export interface LivePlayer {
  playerId: string;
  playerName: string;
  activity: PlayerActivity;
  /** Question the player is on (1-based position within their test). 0 in the lobby. */
  currentQuestionNumber: number;
  /** Number of questions in the test they are taking. 0 in the lobby. */
  totalQuestions: number;
  /** How many answers they have saved so far. Never reveals whether they are right. */
  answeredCount: number;
  /** When this status was last sent (milliseconds since 1970). Used to hide players who left. */
  lastSeenAt: number;
}

/** The parts of a live status that the quiz reports; name, id and time are added by PlayerService. */
export type PlayerProgress = Pick<LivePlayer, 'activity' | 'currentQuestionNumber' | 'totalQuestions' | 'answeredCount'>;
