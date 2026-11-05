# Network KPI Dashboard

A learning project: a small KPI dashboard built with Angular 20, the global NgRx Store and
signals in components. The user picks 2–4 network KPIs, creates a dashboard and sees charts and a
table of measurements with filtering. There is no backend: a mock HTTP interceptor serves the data.

## How to run

Requirements: Node.js 20.19+, 22.12+ or 24+, and npm.

```bash
npm install
npm start          # dev server on http://localhost:4200
```

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm start`            | Dev server with live reload                   |
| `npm run build`        | Production build into `dist/`                 |
| `npm test`             | Unit tests (Karma + Jasmine)                  |
| `npm run lint`         | ESLint (Angular, NgRx and TypeScript rules)   |
| `npm run format`       | Format all files with Prettier                |
| `npm run format:check` | Check formatting without writing (used in CI) |

## Tech stack

- Angular 20, standalone components, `OnPush` everywhere
- NgRx 20: Store with `createFeature`, functional effects, Store DevTools
- Signals in components: `store.selectSignal()`, `computed()`, `input()` / `output()`
- ESLint (angular-eslint, @ngrx/eslint-plugin, typescript-eslint) and Prettier

## Folder structure

```
src/app/
  app.config.ts          # Standalone providers: router, Store, Effects, DevTools
  app.routes.ts          # Lazy-loaded page routes
  core/                  # App-wide singletons: layout shell, models, API, mock backend
  features/
    kpi-selection/       # Page 1 (/): choose 2–4 KPIs
    dashboard/           # Page 2 (/dashboard): filters, charts and table
  shared/
    ui/                  # Presentational, Store-free UI components
```

Path aliases `@core/*`, `@features/*` and `@shared/*` are configured in `tsconfig.json`.
