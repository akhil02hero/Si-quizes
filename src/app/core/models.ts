export interface Question {
  n: number;
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
  short: string;
  from: number;
  to: number;
}

export const SECTIONS: readonly Section[] = [
  { id: 'all', name: 'Full paper', short: 'Full paper', from: 1, to: 200 },
  { id: 'ar', name: 'Arithmetic', short: 'Arithmetic', from: 1, to: 50 },
  { id: 're', name: 'Reasoning & mental ability', short: 'Reasoning', from: 51, to: 100 },
  { id: 'gs', name: 'General studies & Telangana', short: 'GS', from: 101, to: 200 },
];

export function sectionOf(n: number): string {
  return n <= 50 ? 'Arithmetic' : n <= 100 ? 'Reasoning & mental ability' : 'General studies';
}

export interface Result {
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  total: number;
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
  q: number;
  total: number;
  answered: number;
  lastSeen: number;
}
