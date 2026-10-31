import { QUESTIONS } from './questions';
import { QuizTest, Section, paperLabel } from './models';

/** One section of the SI Prelims 2022 paper as a test. */
export function paperTest(section: Section): QuizTest {
  return {
    id: section.id,
    label: paperLabel(section),
    questions: QUESTIONS.filter(question => question.number >= section.from && question.number <= section.to),
    seconds: section.minutes * 60,
    hasVerdict: true,
    returnPath: '/',
  };
}
