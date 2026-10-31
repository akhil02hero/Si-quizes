import { Question, Result } from './models';

export const MARK_CORRECT = 2;
export const MARK_WRONG = -0.2;
/** Cut-offs for the full 200-question paper (max 400). */
export const QUALIFY_CUTOFF = 60;
export const WELL_DONE_CUTOFF = 150;

const roundToOneDecimal = (value: number) => Math.round(value * 10) / 10;

/** `answers[i]` is the saved option (1-4) for `questions[i]`, or 0 if none. */
export function scoreAnswers(questions: readonly Question[], answers: readonly number[], finishedAt = Date.now()): Result {
  let correct = 0;
  let wrong = 0;
  answers.forEach((answer, index) => {
    if (!answer) return;
    if (answer === questions[index].answer) correct++;
    else wrong++;
  });
  return {
    score: roundToOneDecimal(correct * MARK_CORRECT + wrong * MARK_WRONG),
    correct,
    wrong,
    skipped: questions.length - correct - wrong,
    total: questions.length,
    at: finishedAt,
  };
}

export type Verdict = 'well-done' | 'qualified' | 'not-qualified';

/** Cut-offs scale with the number of questions attempted (60/150 for the full 200). */
export function cutoffs(total: number) {
  const scale = total / 200;
  return { qualify: roundToOneDecimal(QUALIFY_CUTOFF * scale), wellDone: roundToOneDecimal(WELL_DONE_CUTOFF * scale) };
}

export function verdictFor(score: number, total: number): Verdict {
  const cutoff = cutoffs(total);
  if (score > cutoff.wellDone) return 'well-done';
  if (score > cutoff.qualify) return 'qualified';
  return 'not-qualified';
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  'well-done': 'Well done',
  qualified: 'Qualified',
  'not-qualified': 'Not qualified',
};
