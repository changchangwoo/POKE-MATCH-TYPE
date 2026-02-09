# Quiz Style Fixes

## 2026-02-09

- Removed invalid Emotion CSS declarations that remained as property-less values:
  - `:400;`
  - `:600;`
  - `:700;`
- Updated files:
  - `StepProgress.tsx`
  - `RankingList.tsx`
  - `QuizType0DamageEffectiveness.tsx`
- Reason:
  - `font-weight` keys were removed accidentally, leaving invalid declarations that cause style parsing/build errors.
