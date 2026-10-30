import { Routes } from '@angular/router';
import { requireActiveTestGuard, requireSubmittedTestGuard } from './core/guards';

/**
 * The app's three screens. Each is lazy-loaded, so a page only downloads its
 * own code when it is first opened.
 */
export const routes: Routes = [
  {
    // Start screen: enter a name, pick a section, see the leaderboard.
    path: '',
    title: 'TS Police SI Prelims 2022',
    loadComponent: () => import('./features/start/start.component').then(module => module.StartComponent),
  },
  {
    // The test itself.
    path: 'quiz',
    title: 'Test in progress',
    canActivate: [requireActiveTestGuard],
    loadComponent: () => import('./features/quiz/quiz.component').then(module => module.QuizComponent),
  },
  {
    // Score, verdict, leaderboard and every answer with its explanation.
    path: 'result',
    title: 'Your result',
    canActivate: [requireSubmittedTestGuard],
    loadComponent: () => import('./features/result/result.component').then(module => module.ResultComponent),
  },
  // Any unknown address goes back to the start screen.
  { path: '**', redirectTo: '' },
];
