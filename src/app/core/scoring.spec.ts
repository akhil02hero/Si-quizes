import { Question } from './models';
import { cutoffs, scoreAnswers, verdictFor } from './scoring';

const questionWithAnswer = (answer: number): Question => ({ number: 1, text: '', options: ['a', 'b', 'c', 'd'], answer, explanation: '' });

describe('scoring', () => {
  it('gives +2 per correct, -0.2 per wrong and 0 for skipped', () => {
    const result = scoreAnswers(
      [questionWithAnswer(1), questionWithAnswer(2), questionWithAnswer(3), questionWithAnswer(4)],
      [1, 3, 0, 4],
    );
    expect(result).toEqual(jasmine.objectContaining({ correct: 2, wrong: 1, skipped: 1, score: 3.8, total: 4 }));
  });

  it('can go negative', () => {
    expect(scoreAnswers([questionWithAnswer(1)], [2]).score).toBe(-0.2);
  });

  it('uses 60 / 150 cut-offs for the full paper', () => {
    expect(cutoffs(200)).toEqual({ qualify: 60, wellDone: 150 });
    expect(verdictFor(60, 200)).toBe('not-qualified');
    expect(verdictFor(60.2, 200)).toBe('qualified');
    expect(verdictFor(150.2, 200)).toBe('well-done');
  });

  it('scales cut-offs for a 50-question section', () => {
    expect(cutoffs(50)).toEqual({ qualify: 15, wellDone: 37.5 });
  });
});
