import { Question, QuizTest } from '../core/models';
import { PRACTICE_CATEGORIES } from './catalog';
import { PracticeCategory, PracticeChapter, PracticeTestInfo } from './practice.models';

export const TEST_SIZE = 50;
export const SECONDS_PER_PRACTICE_QUESTION = 45;

/** Each category's questions live in their own file, loaded only when one of its tests starts. */
const QUESTION_FILES: Record<string, () => Promise<Record<string, readonly Question[]>>> = {
  biology: () => import('./data/biology').then((file) => file.CHAPTER_QUESTIONS),
  chemistry: () => import('./data/chemistry').then((file) => file.CHAPTER_QUESTIONS),
  physics: () => import('./data/physics').then((file) => file.CHAPTER_QUESTIONS),
  geography: () => import('./data/geography').then((file) => file.CHAPTER_QUESTIONS),
  polity: () => import('./data/polity').then((file) => file.CHAPTER_QUESTIONS),
};

export function findCategory(categoryId: string): PracticeCategory | undefined {
  return PRACTICE_CATEGORIES.find((category) => category.id === categoryId);
}

export function findChapter(categoryId: string, chapterId: string): PracticeChapter | undefined {
  return findCategory(categoryId)?.chapters.find((chapter) => chapter.id === chapterId);
}

/** Test length as words, e.g. 2250 -> '37 min 30 s', 4200 -> '1 h 10 min'. */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = seconds % 60;
  return [hours && `${hours} h`, minutes && `${minutes} min`, rest && `${rest} s`]
    .filter(Boolean)
    .join(' ');
}

/** A chapter split into tests of TEST_SIZE questions in book order; the last test takes the remainder. */
export function testsOf(chapter: PracticeChapter): PracticeTestInfo[] {
  const tests: PracticeTestInfo[] = [];
  for (let from = 1; from <= chapter.questionCount; from += TEST_SIZE) {
    const to = Math.min(from + TEST_SIZE - 1, chapter.questionCount);
    const questionCount = to - from + 1;
    tests.push({
      number: tests.length + 1,
      from,
      to,
      questionCount,
      seconds: questionCount * SECONDS_PER_PRACTICE_QUESTION,
    });
  }
  return tests;
}

/** Load the questions of one practice test, ready for QuizService.start(). */
export async function loadPracticeTest(
  categoryId: string,
  chapterId: string,
  testNumber: number,
): Promise<QuizTest> {
  const category = findCategory(categoryId);
  const chapter = findChapter(categoryId, chapterId);
  const test = chapter && testsOf(chapter).find((candidate) => candidate.number === testNumber);
  if (!category || !chapter || !test)
    throw new Error(`No practice test ${categoryId}/${chapterId}/${testNumber}`);
  const chapterQuestions = (await QUESTION_FILES[category.id]())[chapter.id];
  return {
    id: `${category.id}/${chapter.id}/${test.number}`,
    label: `${category.name} · ${chapter.name} · Test ${test.number}`,
    questions: chapterQuestions.slice(test.from - 1, test.to),
    seconds: test.seconds,
    hasVerdict: false,
    returnPath: `/practice/${category.id}/${chapter.id}`,
    topic: `${category.name} · ${chapter.name}`,
  };
}
