# TS Police SI Prelims 2022 — mock test

Angular 20 app for a timed practice run of the Telangana Police SI Prelims 2022 paper (200 questions), with player names, a leaderboard and a "Playing now" list.

## Rules built in

- 50 seconds per question, each question keeps its own timer. When it runs out the test moves on.
- Select an option, then **Save & Next**. **Previous** returns to a question and shows the saved option; an unsaved change is dropped when you leave.
- Nothing about right or wrong is shown until you **Submit test** (two taps).
- Scoring: +2 correct, −0.2 wrong, 0 skipped. Above 60 = Qualified, above 150 = Well done (scaled for single sections).
- Results show every question with all options, the correct answer, your answer and the explanation.

## Run it

```bash
npm install
npm start            # http://localhost:4200
npm run build        # production build in dist/si-prelims-quiz/browser
```

Unit tests (`npm test`) use Karma and need Chrome installed.

## Shared leaderboard (Firebase)

Without configuration the app runs in **local mode**: scores are stored in the browser only.

To share scores between friends:

1. Create a project at https://console.firebase.google.com and add a **Web app**.
2. Enable **Cloud Firestore** (production mode).
3. Paste the web config into `src/app/core/firebase.config.ts`.
4. Publish the rules in `firestore.rules` (Console → Firestore → Rules, or `firebase deploy --only firestore:rules`).

Data layout:

| Collection | Doc id | Contents |
|---|---|---|
| `scores` | player id | `name`, `best` (best result per section), `attempts`, `updatedAt` |
| `presence` | player id | `name`, `status`, `q`, `total`, `answered`, `lastSeen` |

The player id is a random UUID stored in the browser, so there is no sign-in. The rules are open to anyone who has the site, which is fine among friends; add Firebase Auth before sharing it publicly.

## Deploy

This repo deploys itself to GitHub Pages: every push to `main` runs `.github/workflows/deploy-pages.yml`, which builds with `npm run build:pages` (hash routing, base href `/Si-quizes/`). Live site: https://akhil02hero.github.io/Si-quizes/

Other hosts: 
Any static host works. Serve `dist/si-prelims-quiz/browser` and rewrite unknown paths to `index.html`, for example Firebase Hosting (`firebase init hosting`, public dir `dist/si-prelims-quiz/browser`, single-page app: yes), Netlify or Vercel.

## Project layout

```
src/app/
  core/
    questions.ts            all 200 questions, answers and explanations
    models.ts               types and sections
    scoring.ts (+ .spec)    marks, cut-offs, verdicts
    quiz.service.ts         attempt state, per-question timers, save/previous/submit
    player.service.ts       name, anonymous id, live status heartbeat
    leaderboard.service.ts  ranking and best-score saving
    leaderboard.backend.ts  Firestore backend (lazy-loaded) and local fallback
    guards.ts               keeps /quiz and /result from opening without a test
  features/start | quiz | result
  shared/leaderboard, live-players
public/figures/             diagrams for figure questions (51, 53, 96–100)
```

## Notes on the answer key

Answers were worked out from the paper and checked against the marked options in the source PDF. Where they differ (Q29, 51, 58, 67, 72, 184) the explanation says why. Q83's digits are hidden by a watermark in the source and were reconstructed; Q167, Q173 and Q180 are uncertain readings.
