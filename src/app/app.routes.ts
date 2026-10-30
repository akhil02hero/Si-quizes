import { Routes } from '@angular/router';
import { activeSessionGuard, hasResultGuard } from './core/guards';

export const routes: Routes = [
  { path: '', title: 'TS Police SI Prelims 2022', loadComponent: () => import('./features/start/start.component').then(m => m.StartComponent) },
  { path: 'quiz', title: 'Test in progress', canActivate: [activeSessionGuard], loadComponent: () => import('./features/quiz/quiz.component').then(m => m.QuizComponent) },
  { path: 'result', title: 'Your result', canActivate: [hasResultGuard], loadComponent: () => import('./features/result/result.component').then(m => m.ResultComponent) },
  { path: '**', redirectTo: '' },
];
