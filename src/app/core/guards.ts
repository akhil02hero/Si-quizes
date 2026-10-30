/**
 * Route guards that stop the quiz and result pages from opening without the
 * state they need (for example after a page refresh, which clears the test).
 */
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizService } from './quiz.service';

/** /quiz needs a test that is running and not yet submitted; otherwise go to the start screen. */
export const requireActiveTestGuard: CanActivateFn = () => {
  const quizService = inject(QuizService);
  const hasActiveTest = quizService.session() !== null && quizService.result() === null;
  return hasActiveTest ? true : inject(Router).createUrlTree(['/']);
};

/** /result needs a submitted test; otherwise go to the start screen. */
export const requireSubmittedTestGuard: CanActivateFn = () => {
  const hasResult = inject(QuizService).result() !== null;
  return hasResult ? true : inject(Router).createUrlTree(['/']);
};
