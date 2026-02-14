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

## Requirement → Spec Conversion Protocol

When a user provides a feature request, requirement, or change request,
you must convert it into a specification document before any implementation discussion.

---

### STEP 1 — Detect Request Type

If the message contains:

- feature request
- refactor request
- bugfix request
- architecture change
- performance request

→ treat it as a spec task.

---

### STEP 2 — Create Spec File

You must create a spec file:

docs/specs/FEAT-###-slug.md

Rules:

- number must be next available integer
- slug must be kebab-case English summary
- file must be created even if request is vague

---

### STEP 3 — Expand Requirement Into Spec

You must transform the request into a structured spec.

Required sections:

Status: Draft

## Goal

## Why

## Scope

### In Scope

### Out of Scope

## Dependencies

## Forbidden Changes

## Inputs / Outputs

## Edge Cases

## Acceptance Criteria

## Test Scenarios

## Change Log

If information is missing:
→ infer reasonable defaults
→ list assumptions in Edge Cases

---

### STEP 4 — Spec Writing Rules

Spec must describe:
WHAT the system must do
WHY it must do it

Spec must NOT describe:
HOW to implement it

Forbidden:

- naming specific libraries
- suggesting hooks
- writing code logic
- architecture design instructions

---

### STEP 5 — Acceptance Criteria Rules

All AC must be:

- measurable
- testable
- binary pass/fail

Invalid AC:
"UI should look good"

Valid AC:
"Clicking submit button sends POST request"

---

### STEP 6 — Completion Condition

A spec is considered successfully generated only if:

- all sections exist
- AC is testable
- scope is bounded
- forbidden changes listed

If any missing:
→ spec is incomplete.

---

### HARD RULE

Never implement or suggest code before spec exists.

Spec must always come first.
