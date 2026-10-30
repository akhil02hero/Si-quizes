import { Question, Result } from './models';

export const SECONDS_PER_QUESTION = 50;
export const MARK_CORRECT = 2;
export const MARK_WRONG = -0.2;
/** Cut-offs for the full 200-question paper (max 400). */
export const QUALIFY_CUTOFF = 60;
export const WELL_DONE_CUTOFF = 150;

const round1 = (x: number) => Math.round(x * 10) / 10;

/** `answers[i]` is the saved option (1-4) for `questions[i]`, or 0 if none. */
export function scoreAnswers(questions: readonly Question[], answers: readonly number[], at = Date.now()): Result {
  let correct = 0;
  let wrong = 0;
  answers.forEach((a, i) => {
    if (!a) return;
    if (a === questions[i].answer) correct++;
    else wrong++;
  });
  return {
    score: round1(correct * MARK_CORRECT + wrong * MARK_WRONG),
    correct,
    wrong,
    skipped: questions.length - correct - wrong,
    total: questions.length,
    at,
  };
}

export type Verdict = 'well-done' | 'qualified' | 'not-qualified';

/** Cut-offs scale with the number of questions attempted (60/150 for the full 200). */
export function cutoffs(total: number) {
  const f = total / 200;
  return { qualify: round1(QUALIFY_CUTOFF * f), wellDone: round1(WELL_DONE_CUTOFF * f) };
}

export function verdictFor(score: number, total: number): Verdict {
  const c = cutoffs(total);
  if (score > c.wellDone) return 'well-done';
  if (score > c.qualify) return 'qualified';
  return 'not-qualified';
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  'well-done': 'Well done',
  qualified: 'Qualified',
  'not-qualified': 'Not qualified',
};
