# Components Style Fixes

## 2026-02-09

- Removed invalid Emotion CSS declaration `:normal;` from `mainTitle.tsx`.
- Reason:
  - `font-weight` key was removed accidentally, leaving a property-less value that breaks style parsing.
