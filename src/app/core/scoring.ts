/**
 * Exam rules: time per question, marks, cut-offs and how a set of answers
 * turns into a score and a verdict. Kept free of Angular so it is easy to test.
 */
import { Question, TestResult } from './models';

/** Each question gets its own 50-second budget. */
export const SECONDS_PER_QUESTION = 50;

/** Marks for a correct answer. */
export const MARKS_FOR_CORRECT = 2;

/** Marks for a wrong answer (negative marking). Skipped questions score 0. */
export const MARKS_FOR_WRONG = -0.2;

/** A full-paper score above this is "Qualified" (the paper is out of 400). */
export const QUALIFYING_SCORE_FULL_PAPER = 60;

/** A full-paper score above this is "Well done". */
export const WELL_DONE_SCORE_FULL_PAPER = 150;

/** Number of questions in the full paper; cut-offs are scaled relative to this. */
const FULL_PAPER_QUESTION_COUNT = 200;

/** Rounds to one decimal place, so -0.2 steps don't show floating-point noise like 3.8000000001. */
function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

/**
 * Scores a submitted test.
 *
 * @param questions the questions in the test, in order
 * @param savedAnswers the saved option for each question (1-4), or 0 when unanswered;
 *                     savedAnswers[position] belongs to questions[position]
 * @param submittedAt when the test was submitted; defaults to now
 */
export function scoreAnswers(
  questions: readonly Question[],
  savedAnswers: readonly number[],
  submittedAt = Date.now(),
): TestResult {
  let correctCount = 0;
  let wrongCount = 0;

  savedAnswers.forEach((savedOption, position) => {
    const isUnanswered = savedOption === 0;
    if (isUnanswered) return;

    if (savedOption === questions[position].correctOption) correctCount++;
    else wrongCount++;
  });

  return {
    score: roundToOneDecimal(correctCount * MARKS_FOR_CORRECT + wrongCount * MARKS_FOR_WRONG),
    correctCount,
    wrongCount,
    skippedCount: questions.length - correctCount - wrongCount,
    totalQuestions: questions.length,
    submittedAt,
  };
}

/** How a score is judged against the cut-offs. */
export type Verdict = 'well-done' | 'qualified' | 'not-qualified';

/** Text shown for each verdict. */
export const VERDICT_LABELS: Record<Verdict, string> = {
  'well-done': 'Well done',
  qualified: 'Qualified',
  'not-qualified': 'Not qualified',
};

/**
 * Cut-off scores for a test of the given length.
 * The full paper uses 60 and 150; a shorter section scales them down in proportion,
 * so a 50-question section uses 15 and 37.5.
 */
export function cutoffsFor(totalQuestions: number): { qualifyingScore: number; wellDoneScore: number } {
  const shareOfFullPaper = totalQuestions / FULL_PAPER_QUESTION_COUNT;
  return {
    qualifyingScore: roundToOneDecimal(QUALIFYING_SCORE_FULL_PAPER * shareOfFullPaper),
    wellDoneScore: roundToOneDecimal(WELL_DONE_SCORE_FULL_PAPER * shareOfFullPaper),
  };
}

/** Judges a score. The score must be strictly above a cut-off to pass it. */
export function verdictFor(score: number, totalQuestions: number): Verdict {
  const { qualifyingScore, wellDoneScore } = cutoffsFor(totalQuestions);
  if (score > wellDoneScore) return 'well-done';
  if (score > qualifyingScore) return 'qualified';
  return 'not-qualified';
}
