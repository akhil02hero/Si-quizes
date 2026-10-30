import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ROUTER_FEATURES } from './router-features';

/** App-wide providers, passed to bootstrapApplication in main.ts. */
export const appConfig: ApplicationConfig = {
  providers: [
    // Report uncaught errors to the console in one place.
    provideBrowserGlobalErrorListeners(),
    // Batch change detection for events that fire close together.
    provideZoneChangeDetection({ eventCoalescing: true }),
    // ROUTER_FEATURES adds hash-based URLs (#/quiz) in builds for static hosts like GitHub Pages.
    provideRouter(routes, ...ROUTER_FEATURES),
  ],
};
