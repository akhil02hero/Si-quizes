import { PRACTICE_CATEGORIES } from './catalog';
import { loadPracticeTest, testsOf } from './practice';

describe('practice tests', () => {
  it('splits a chapter into tests of at most 50 questions, in order', () => {
    const tests = testsOf({ id: '01', name: 'Example', questionCount: 90 });
    expect(tests.map((test) => [test.from, test.to])).toEqual([
      [1, 50],
      [51, 90],
    ]);
  });

  it('gives 45 seconds per question for the whole test', () => {
    const [first, second] = testsOf({ id: '01', name: 'Example', questionCount: 90 });
    expect(first.seconds).toBe(50 * 45);
    expect(second.seconds).toBe(40 * 45);
  });

  it('loads the last, shorter test of a chapter', async () => {
    const test = await loadPracticeTest('biology', '04', 5);
    expect(test.label).toBe('Biology · Human Physiology · Test 5');
    expect(test.questions.length).toBe(17);
    expect(test.seconds).toBe(17 * 45);
    expect(test.hasVerdict).toBeFalse();
  });

  it('has a question file that matches every chapter in the catalog', async () => {
    for (const category of PRACTICE_CATEGORIES) {
      for (const chapter of category.chapters) {
        const tests = testsOf(chapter);
        const loaded = await Promise.all(
          tests.map((test) => loadPracticeTest(category.id, chapter.id, test.number)),
        );
        const total = loaded.reduce((sum, test) => sum + test.questions.length, 0);
        expect(total).withContext(`${category.id}/${chapter.id}`).toBe(chapter.questionCount);
        for (const test of loaded) {
          for (const question of test.questions) {
            expect(question.options.length).withContext(`${test.id} Q${question.number}`).toBe(4);
            expect(question.answer)
              .withContext(`${test.id} Q${question.number}`)
              .toBeGreaterThanOrEqual(1);
            expect(question.answer)
              .withContext(`${test.id} Q${question.number}`)
              .toBeLessThanOrEqual(4);
          }
        }
      }
    }
  });
});
