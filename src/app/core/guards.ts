import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { QuizService } from './quiz.service';

/** The quiz page needs a running attempt; a refresh or direct visit goes back to the start. */
export const activeSessionGuard: CanActivateFn = () => {
  const quiz = inject(QuizService);
  return quiz.session() && !quiz.result() ? true : inject(Router).createUrlTree(['/']);
};

/** The result page needs a submitted attempt. */
export const hasResultGuard: CanActivateFn = () =>
  inject(QuizService).result() ? true : inject(Router).createUrlTree(['/']);
