# File Mapping Reference for Import Path Fixes

## Missing Import References vs Actual Files

### Apple Liquid Glass Components

**Referenced Import**: `../components/apple-liquid-glass` or `@/components/apple-liquid-glass`
**Status**: Missing directory, but found:
- `src/components/enhanced-apple-liquid-glass.tsx` ✅
- `src/components/enhanced-apple-liquid-glass/index.ts` ✅
- `src/lib/enhanced-apple-liquid-glass.tsx` ✅

**Action**: Either create `apple-liquid-glass` component or update imports to use `enhanced-apple-liquid-glass`

### Library Modules

**Referenced Import**: `../lib/apple-liquid-glass`
**Actual File**: `src/lib/enhanced-apple-liquid-glass.tsx` ✅
**Action**: Update import paths or create bridge file

### Utility Files

**Referenced Import**: `../utils/contrast-checker`
**Actual File**: `src/utils/contrast-checker.ts` ✅
**Action**: Update relative path references

### Core Modules

**Referenced Import**: `../core/glass-effects`
**Actual File**: `src/core/utils/glass-effects.ts` ✅
**Action**: Update path to include `/utils/` subdirectory

**Referenced Import**: `../hooks/use-ssr-safe-hooks`
**Actual File**: `src/hooks/use-ssr-safe-hooks.ts` ✅
**Action**: Path is correct, check relative path levels

## Component Structure Found

```
src/
├── components/
│   ├── enhanced-apple-liquid-glass.tsx
│   ├── enhanced-apple-liquid-glass/
│   │   ├── index.ts
│   │   └── enhanced-apple-liquid-glass.stories.tsx
│   ├── glass-button-refactored/
│   │   ├── glass-button.tsx
│   │   └── index.ts
│   └── glass-card-refactored/
│       ├── glass-card.tsx
│       └── index.ts
├── lib/
│   ├── enhanced-apple-liquid-glass.tsx
│   └── enhanced-apple-liquid-glass.test.ts
├── core/
│   ├── glass/
│   │   └── unified-glass-system.ts
│   ├── utils/
│   │   └── glass-effects.ts
│   └── ssr-safety.tsx
├── hooks/
│   └── use-ssr-safe-hooks.ts
└── utils/
    └── contrast-checker.ts
```

## Quick Fix Actions

1. **Create Missing apple-liquid-glass Component**:
   - Option A: Create `src/components/apple-liquid-glass/` directory
   - Option B: Update all imports to use `enhanced-apple-liquid-glass`

2. **Update Import Paths**:
   - `../utils/contrast-checker` → `../../utils/contrast-checker` (adjust levels)
   - `../core/glass-effects` → `../core/utils/glass-effects`
   - `../lib/apple-liquid-glass` → `../lib/enhanced-apple-liquid-glass`

3. **Component Index Updates**:
   - Fix exports in glass-button and glass-card index files
   - Add missing type exports
