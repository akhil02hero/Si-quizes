import { Question } from './models';
import { cutoffsFor, scoreAnswers, verdictFor } from './scoring';

/** Builds a minimal question whose correct option is `correctOption`. */
function questionWithCorrectOption(correctOption: number): Question {
  return { number: 1, text: '', options: ['a', 'b', 'c', 'd'], correctOption, explanation: '' };
}

describe('scoring', () => {
  it('gives +2 per correct, -0.2 per wrong and 0 for skipped', () => {
    const questions = [1, 2, 3, 4].map(questionWithCorrectOption);
    // Answers: Q1 right, Q2 wrong, Q3 skipped, Q4 right.
    const result = scoreAnswers(questions, [1, 3, 0, 4]);

    expect(result).toEqual(
      jasmine.objectContaining({ correctCount: 2, wrongCount: 1, skippedCount: 1, score: 3.8, totalQuestions: 4 }),
    );
  });

  it('can go negative', () => {
    expect(scoreAnswers([questionWithCorrectOption(1)], [2]).score).toBe(-0.2);
  });

  it('uses 60 / 150 cut-offs for the full paper', () => {
    expect(cutoffsFor(200)).toEqual({ qualifyingScore: 60, wellDoneScore: 150 });
    expect(verdictFor(60, 200)).toBe('not-qualified');
    expect(verdictFor(60.2, 200)).toBe('qualified');
    expect(verdictFor(150.2, 200)).toBe('well-done');
  });

  it('scales cut-offs for a 50-question section', () => {
    expect(cutoffsFor(50)).toEqual({ qualifyingScore: 15, wellDoneScore: 37.5 });
  });
});
