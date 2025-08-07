# TypeScript Error Fix Plan

## Overview
Total Errors: 127 errors across 30 files

## Error Categories Analysis

### 1. **Variant System Errors (Most Common - ~40% of errors)**

#### Problem Pattern:
```typescript
// Error: Object literal may only specify known properties
variant: variant as "default" | "inline" | "card"
// The issue: 'variant' doesn't exist, should be nested under variants object
```

#### Affected Components:
- glass-accordion (3 errors)
- glass-breadcrumbs (3 errors)
- glass-checkbox-group (3 errors)
- glass-combobox (4 errors)
- glass-date-picker (2 errors)
- glass-drawer (1 error)
- glass-file-upload (2 errors)
- glass-form-field (3 errors)
- glass-mobile-nav (4 errors)
- glass-number-input (4 errors)
- glass-pagination (2 errors)
- glass-radio-group (2 errors)
- glass-skeleton (1 error)

#### Root Cause:
The variant system expects properties to be passed directly (e.g., `{ size, variant }`), but TypeScript strict mode is detecting that these properties don't exist on the VariantProps type due to how the variant system is structured.

### 2. **Missing Component/Type Imports (~20% of errors)**

#### Affected Files:
- glass-combobox: Missing `Search` component import
- glass-tree-view: `_span` component not found
- navbar/sidebar: `UnifiedGlassEffect` component missing
- glass-form-field: `useGlassStateTransitions` hook missing

### 3. **Type Mismatches & Strict Null Checks (~15% of errors)**

#### Common Issues:
- `undefined` not assignable to `Type | null`
- Array access without proper type guards
- Missing properties on required interfaces

#### Affected Files:
- glass-skip-navigation (array indexing issues)
- glass-toast (context initialization)
- glass-focus-trap (missing methods)
- roving-tabindex (React type issues)

### 4. **Component Composition Issues (~10% of errors)**

#### Problems:
- glass-card-refactored: Compound component properties not recognized
- glass-accordion: Missing required `value` prop

### 5. **Utility & Hook Type Issues (~15% of errors)**

#### Affected Files:
- use-liquid-glass (missing properties on tokens)
- use-performance-monitoring (missing methods)
- use-haptic-feedback (return type issues)
- safe-dom utilities (strict return types)
- branded types (type casting issues)

## Fix Implementation Plan

### Phase 1: Quick Wins (1-2 hours)
Fix missing imports and simple type issues

### Phase 2: Variant System Overhaul (2-3 hours)
Update the variant system to properly type variant props

### Phase 3: Component Props Fixes (2-3 hours)
Fix component interfaces and prop types

### Phase 4: Utility Function Updates (1-2 hours)
Update utility functions for strict mode compliance

### Phase 5: Testing & Validation (1 hour)
Verify all fixes work correctly

## Detailed Fix Strategy

### 1. Fix Variant System (Priority: HIGH)

**Current Problem:**
```typescript
// This pattern fails in strict mode
const variants = createVariants({
  base: "...",
  variants: {
    size: { sm: "...", md: "...", lg: "..." },
    variant: { default: "...", ghost: "..." }
  }
});

// Usage fails:
variants({ size: "md", variant: "default" })
// Error: 'size' doesn't exist on type
```

**Solution:**
Update the variant system to properly extract and type variant props:

```typescript
// Fix in variant-system.ts
export function createVariants<T extends VariantConfig>(config: T) {
  type VariantProps = {
    [K in keyof T['variants']]?: keyof T['variants'][K]
  }
  
  return (props?: VariantProps) => {
    // Implementation
  }
}
```

### 2. Fix Missing Imports (Priority: HIGH)

**Components to fix:**
- glass-combobox: Import `Search` from lucide-react
- glass-tree-view: Fix or remove `_span` component
- navbar/sidebar: Create or import `UnifiedGlassEffect`
- glass-form-field: Create or import `useGlassStateTransitions`

### 3. Fix Compound Components (Priority: MEDIUM)

**glass-card-refactored fix:**
```typescript
// Add compound component types
interface GlassCardComponent extends React.ForwardRefExoticComponent<GlassCardProps> {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

// Cast the component properly
const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  // ... component implementation
) as GlassCardComponent;

// Now assign compound components
GlassCard.Header = CardHeader;
GlassCard.Title = CardTitle;
// etc...
```

### 4. Fix Strict Null Checks (Priority: MEDIUM)

**Pattern to fix:**
```typescript
// Before (causes error)
function example(): string | null {
  if (condition) {
    return;  // Error: undefined not assignable to string | null
  }
  return "value";
}

// After (fixed)
function example(): string | null {
  if (condition) {
    return null;  // Explicitly return null
  }
  return "value";
}
```

### 5. Fix Array Access Issues (Priority: LOW)

**glass-skip-navigation fix:**
```typescript
// Before
const linkReferences = useRef<(HTMLAnchorElement | null)[]>([]);
linkReferences.current[index] = element; // Error

// After
const linkReferences = useRef<Array<HTMLAnchorElement | null>>([]);
// Or use a Map for better type safety
const linkReferences = useRef<Map<number, HTMLAnchorElement>>(new Map());
```

### 6. Fix Context Initialization (Priority: LOW)

**Pattern fix:**
```typescript
// Before
const Context = createContext<Type | null>(undefined); // Error

// After
const Context = createContext<Type | null>(null); // Use null instead
```

## Implementation Order

### Step 1: Create Fix Scripts
```bash
# Create automated fix scripts for common patterns
scripts/fix-variants.js
scripts/fix-imports.js
scripts/fix-null-checks.js
```

### Step 2: Manual Component Fixes
1. Fix variant system in core
2. Update all components using variants
3. Fix compound components
4. Fix missing imports

### Step 3: Utility Updates
1. Update safe-dom utilities
2. Fix hook return types
3. Update branded types

### Step 4: Testing
1. Run `bun run build:types`
2. Verify no errors remain
3. Test runtime functionality

## Files to Modify (Priority Order)

### Critical Files (Fix First):
1. `libs/components/src/core/variant-system.ts`
2. `libs/components/src/components/glass-card-refactored/glass-card.tsx`
3. `libs/components/src/components/glass-accordion/glass-accordion.tsx`

### High Priority:
4. `libs/components/src/components/glass-combobox/glass-combobox.tsx`
5. `libs/components/src/components/glass-form-field/glass-form-field.tsx`
6. `libs/components/src/components/navbar/navbar.tsx`
7. `libs/components/src/components/sidebar/sidebar.tsx`

### Medium Priority:
8. `libs/components/src/components/glass-skip-navigation/glass-skip-navigation.tsx`
9. `libs/components/src/core/roving-tabindex.tsx`
10. `libs/components/src/hooks/use-liquid-glass.tsx`
11. `libs/components/src/hooks/use-performance-monitoring.tsx`

### Low Priority:
12. `libs/components/src/utils/safe-dom.ts`
13. `libs/components/src/types/branded.ts`
14. `libs/components/src/utils/contrast-checker.ts`

## Success Metrics

- [ ] All TypeScript errors resolved
- [ ] Build completes without errors
- [ ] Type declarations generated successfully
- [ ] Components remain functionally unchanged
- [ ] Strict mode compliance achieved

## Estimated Time: 8-10 hours total

### Breakdown:
- Analysis & Planning: ✅ Complete
- Implementation: 6-8 hours
- Testing & Validation: 1-2 hours
- Documentation Updates: 30 minutes

## Next Steps

1. Start with fixing the variant system (core issue)
2. Create automated fix scripts for repetitive patterns
3. Manually fix component-specific issues
4. Run comprehensive testing
5. Update documentation with new patterns
