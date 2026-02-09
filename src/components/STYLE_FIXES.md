# Components Style Fixes

## 2026-02-09

- Removed invalid Emotion CSS declaration `:normal;` from `mainTitle.tsx`.
- Reason:
  - `font-weight` key was removed accidentally, leaving a property-less value that breaks style parsing.

## 2026-02-09 Asset Migration

- Updated `mainTitle.tsx` image imports from `.png` to `.webp`.
- Reason:
  - Source images in `src/images` were migrated to WebP and original png/jpeg files were removed.
