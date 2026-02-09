# QuizHome Style Fixes

## 2026-02-09

- Removed invalid Emotion CSS declarations that remained as property-less values:
  - `:500;`
  - `:600;`
  - `:700;`
- Updated files:
  - `QuizHomeIntro.tsx`
  - `QuizSelectionCard.tsx`
  - `QuizHomeMain.tsx`
  - `QuizHomeEnd.tsx`
  - `QuizProgressList.tsx`
- Reason:
  - `font-weight` keys were removed accidentally, leaving invalid declarations that cause style parsing/build errors.
