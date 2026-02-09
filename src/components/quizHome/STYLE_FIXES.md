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

## 2026-02-09 Asset Migration

- Updated QuizHome image imports from `.png/.jpeg` to `.webp` in:
  - `QuizHomeIntro.tsx`
  - `QuizHomeEnd.tsx`
  - `QuizSelectionList.tsx`
- Reason:
  - Source images in `src/images/quiz` were migrated to WebP and original png/jpeg files were removed.
