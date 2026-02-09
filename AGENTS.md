# Repository Guidelines

## Project Structure & Module Organization
- `src/` contains all application code (React + TypeScript).
- Key folders: `src/api/` (API clients), `src/components/` (UI + barrel `index.ts`), `src/pages/` (routes), `src/hooks/` and `src/hooks/queries/` (hooks + TanStack Query), `src/const/` `src/data/` `src/models/` `src/services/` `src/styles/` `src/utils/` (config, data, types, services, styles, helpers).
- `src/assets/`, `src/images/`, and `public/` store static assets.
- Build output is generated to `dist/`.

## Build, Test, and Development Commands
- `npm run dev` starts the Vite dev server for local development.
- `npm run build` runs TypeScript checks and produces a production build in `dist/`.
- `npm run lint` runs ESLint with zero warnings allowed.
- `npm run preview` serves the production build locally for verification.

## Coding Style & Naming Conventions
- Language: TypeScript + React with Vite.
- Indentation: follow existing code style (2 spaces in config files, TS/TSX defaults).
- Components use `PascalCase` (e.g., `TypeTable.tsx`).
- Hooks use `use` prefix in `camelCase` (e.g., `usePokemonType.ts`).
- Utilities typically use `get` prefix (e.g., `getTypeEffect.ts`).
- Styling uses Emotion (`@emotion/react`, `@emotion/styled`) with global CSS variables in `src/styles/`.
- Linting is enforced via ESLint (`.eslintrc.cjs`). Run `npm run lint` before PRs.
## Mandatory Documentation Update (Strict)
- **Non-negotiable rule:** Any change to `src/components/` or `src/hooks/` (including `src/hooks/queries/`) **must** be accompanied by a corresponding update to the relevant Markdown documentation file(s) inside those folders. Do **not** merge or finalize changes without updating the internal MD docs to reflect the new behavior, props, and side effects.

## Testing Guidelines
- No test framework is currently configured.
- If adding tests, match file naming to your framework (for example, `*.test.tsx`) and document new commands in this file and `package.json`.

## Commit & Pull Request Guidelines
- Recent commits follow `Type : message` (note spaces), e.g., `Feat : add quiz intro`, `Refactor : unify naming`, `Style : UI tweaks`.
- PRs should include a concise description of changes and reasoning.
- Link related issues or notes when applicable.
- Include screenshots or short clips for UI changes.
- Confirm `npm run lint` and `npm run build` pass.

## Architecture & Configuration Notes
- Routing is handled by React Router v6; main pages live in `src/pages/`.
- Global UI state (theme/language) uses React Context and persists to localStorage.
- TanStack Query v5 manages server state; query hooks live in `src/hooks/queries/`.
- Path aliases are configured in `tsconfig.json` and `vite.config.ts` (keep them in sync).
