export interface Question {
  number: number;
  text: string;
  options: readonly string[];
  /** 1-based index of the correct option. */
  answer: number;
  explanation: string;
  /** Path under /public, for figure-based questions. */
  figure?: string;
}

export type SectionId = 'all' | 'ar' | 're' | 'gs';

export interface Section {
  id: SectionId;
  name: string;
  shortName: string;
  from: number;
  to: number;
  /** Time allowed for the whole test. */
  minutes: number;
}

export const SECTIONS: readonly Section[] = [
  { id: 'all', name: 'Full paper', shortName: 'Full paper', from: 1, to: 200, minutes: 180 },
  { id: 'ar', name: 'Arithmetic', shortName: 'Arithmetic', from: 1, to: 50, minutes: 70 },
  { id: 're', name: 'Reasoning & mental ability', shortName: 'Reasoning', from: 51, to: 100, minutes: 45 },
  { id: 'gs', name: 'General studies & Telangana', shortName: 'GS', from: 101, to: 200, minutes: 50 },
];

export function sectionOf(questionNumber: number): string {
  return questionNumber <= 50 ? 'Arithmetic' : questionNumber <= 100 ? 'Reasoning & mental ability' : 'General studies';
}

export interface Result {
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
  /** When the attempt finished (ms since epoch). Kept as `at` because saved scores use this key. */
  at: number;
}

export interface LeaderboardEntry {
  playerId: string;
  name: string;
  best: Partial<Record<SectionId, Result>>;
  attempts: number;
}

export interface LivePlayer {
  playerId: string;
  name: string;
  status: 'lobby' | 'playing' | 'done';
  questionNumber: number;
  total: number;
  answered: number;
  lastSeen: number;
}
