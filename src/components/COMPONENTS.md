**Purpose**
This file summarizes each component in `src/components/` so an agent can quickly identify responsibilities, state, and side effects.

**commons**
- `src/components/commons/SelectAbility.tsx`: Ability dropdown for match views. Reads ability list from JSON, updates selected ability state, and persists the selection to `sessionStorage` under `pathname + "/typecheck"`.
- `src/components/commons/SelectTerastal.tsx`: Terastal type dropdown. Maps selection to default type numbers, updates selected terastal state, and persists to `sessionStorage` under `pathname + "/terastal"` (clears when empty).
- `src/components/commons/SelectType.tsx`: Type grid selector (up to two types). Integrates `SelectAbility` and `SelectTerastal`, shows overlay when terastal is selected, and provides a reset button that clears local state plus related `sessionStorage` keys.
- `src/components/commons/TypeBadge.tsx`: Small colored badge for a type label, with optional compact sizing for quiz mode.
- `src/components/commons/TypeCard.tsx`: Type effectiveness result card. Fetches relations via `useFetchDetailType`, shows skeleton while loading, shows empty state when no relations, and renders grouped `TypeBadge` lists.
- `src/components/commons/index.ts`: Barrel exports for commons components.

**match**
- `src/components/match/MatchCard.tsx`: Main match card with Pokemon image, name, type badges, optional varieties buttons, and ability/terastal selectors.
- `src/components/match/MatchMain.tsx`: Orchestrates match screen. Reads initial selection from URL and language, fetches Pokemon detail and varieties, restores session selections, shows `MatchMainSkeleton` while loading, and renders `MatchCard` plus `TypeCard`.
- `src/components/match/SpeciesButtons.tsx`: Renders selectable form/variety buttons for a Pokemon, filtering hidden entries and translating names per language.
- `src/components/match/index.ts`: Barrel exports for match components.

**modal**
- `src/components/modal/LanguageSetting.tsx`: Language selector for the app. Updates `LanguageContext` and persists `language` in `localStorage`.
- `src/components/modal/QuizAlert.tsx`: Full-screen overlay alert for quiz answers (correct or incorrect). Auto-hides after 3 seconds and displays the answer text.
- `src/components/modal/Theme.tsx`: Theme selector buttons. Updates `ThemeContext` and persists theme to `localStorage`.
- `src/components/modal/index.ts`: Barrel exports for modal components.

**nav**
- `src/components/nav/Navigation.tsx`: Top navigation orchestrator. Manages language/theme/inquiry actions, drawer open state, active indicator updates on resize/location changes, and closes the mobile drawer after route-link clicks.
- `src/components/nav/NavigationStyles.ts`: Emotion CSS for navigation layout, dropdown, overlay, and drawer.
- `src/components/nav/Footer.tsx`: Footer with current year, copyright, and disclaimer from language text.
- `src/components/nav/RouteTracker.tsx`: Sends analytics pageview on route changes.
- `src/components/nav/DesktopNav.tsx`: Desktop navigation links rendered with `NavLink` for crawlable route anchors and active class styling.
- `src/components/nav/MobileDrawer.tsx`: Mobile drawer links rendered with `NavLink`; closes drawer on link selection while preserving active route styling.
- `src/components/nav/index.ts`: Barrel exports for nav components.

**quiz**
- `src/components/quiz/QuizAnswer.tsx`: Renders `SelectTypeForQuiz` and submit button, holds selected answer state, and calls `submitAnswer`.
- `src/components/quiz/QuizEnd.tsx`: Final quiz summary screen. Counts correct answers, shows success/failure image and message, and resets progress on retry.
- `src/components/quiz/QuizIntro.tsx`: Quiz introduction panel with image and start button.
- `src/components/quiz/QuizMain.tsx`: Core quiz flow. Randomizes quiz type per question, tracks progress, updates results, shows alert, and advances to next question or end.
- `src/components/quiz/QuizReady.tsx`: Pre-quiz instructions and start button.
- `src/components/quiz/QuizType0DamageEffectiveness.tsx`: Quiz type 0. Shows a Pokemon and asks which type matches a given damage multiplier. Uses `useGetDetailPokemonForQuiz` and shows a skeleton while loading.
- `src/components/quiz/QuizType1TypeInference.tsx`: Quiz type 1. Shows a chain of types with one hidden and asks the user to infer the missing type.
- `src/components/quiz/QuizType2TypeDescription.tsx`: Quiz type 2. Asks for the damage effectiveness of an attacker against a defender dual-type; uses `useFetchQuizType2` and highlights the correct answer on reveal.
- `src/components/quiz/SelectTypeForQuiz.tsx`: Grid selector for quiz choices with single-selection behavior and correct-answer highlight when `isNext`.
- `src/components/quiz/StepProgress.tsx`: Progress indicator showing current question index and per-step result colors.
- `src/components/quiz/index.ts`: Barrel exports for quiz components.

**search**
- `src/components/search/Search.tsx`: Search UI with a row of 3 randomly selected logos (one-time hop animation), input, suggestions, and recent searches. Uses `usePokemonSearch` and `useRecentSearch` to manage UX and URL params.
- `src/components/search/RecentSearch.tsx`: Chips for recent searches, localized per language.
- `src/components/search/SearchStyles.ts`: Emotion CSS for search layout, input, suggestions, and recent-search chips.
- `src/components/search/index.ts`: Barrel export for search components.

**skeleton**
- `src/components/skeleton/MatchMainSkeleton.tsx`: Skeleton loading UI for the match main layout.
- `src/components/skeleton/QuizSkeleton.tsx`: Skeleton loading UI for quiz type 0.
- `src/components/skeleton/index.ts`: Barrel exports for skeleton components.

**table**
- `src/components/table/TableDescription.tsx`: Renders legend and immunity list for the type compatibility table.
- `src/components/table/index.ts`: Barrel export for table components.
