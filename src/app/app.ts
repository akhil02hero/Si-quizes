import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** Root component: a centred page column that shows whichever screen the URL points to. */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<main class="page-column"><router-outlet /></main>`,
})
export class App {}
