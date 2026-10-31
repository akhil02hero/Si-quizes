import { Routes } from '@angular/router';
import { activeSessionGuard, hasResultGuard } from './core/guards';

export const routes: Routes = [
  { path: '', title: 'TS Police SI Prelims 2022', loadComponent: () => import('./features/start/start.component').then(module => module.StartComponent) },
  { path: 'quiz', title: 'Test in progress', canActivate: [activeSessionGuard], loadComponent: () => import('./features/quiz/quiz.component').then(module => module.QuizComponent) },
  { path: 'result', title: 'Your result', canActivate: [hasResultGuard], loadComponent: () => import('./features/result/result.component').then(module => module.ResultComponent) },
  { path: 'practice/:categoryId', title: 'Practice', loadComponent: () => import('./features/practice/category.component').then(module => module.CategoryComponent) },
  { path: 'practice/:categoryId/:chapterId', title: 'Practice', loadComponent: () => import('./features/practice/chapter.component').then(module => module.ChapterComponent) },
  { path: '**', redirectTo: '' },
];
