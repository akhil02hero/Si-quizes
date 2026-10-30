/** Entry point: starts the Angular app with the root component and app-wide providers. */
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig).catch(startupError => console.error(startupError));
