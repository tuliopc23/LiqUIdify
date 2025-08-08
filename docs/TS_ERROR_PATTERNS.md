# TypeScript Error Patterns - Detailed Analysis

## Error Summary by Pattern

### Pattern 1: VariantProps Property Access (34 errors)

**Error Message:** `Object literal may only specify known properties, and 'X' does not exist in type 'VariantProps<...>'`

#### Specific Errors

```typescript
// TS2353: Object literal may only specify known properties
accordionVariants({ variant, size }); // 'variant' doesn't exist
breadcrumbsVariants({ size, variant }); // 'size' doesn't exist
checkboxGroupVariants({ groupSize: size, orientation }); // 'groupSize' doesn't exist
radioGroupVariants({ orientation, size }); // 'orientation' doesn't exist
```

#### Components Affected

- glass-accordion: Lines 136, 146, 162, 184
- glass-breadcrumbs: Lines 111, 126, 159, 174
- glass-checkbox-group: Lines 217, 231, 245
- glass-combobox: Lines 259, 267, 356, 381
- glass-date-picker: Lines 267, 274
- glass-drawer: Line 242
- glass-file-upload: Lines 349, 416
- glass-form-field: Lines 339, 363, 382
- glass-mobile-nav: Lines 260, 333, 383, 392
- glass-number-input: Lines 311, 361, 387, 403
- glass-pagination: Lines 177, 189
- glass-radio-group: Lines 82, 101
- glass-skeleton: Line 81

### Pattern 2: Missing Imports/Components (8 errors)

**Error Message:** `Cannot find name 'X'`

#### Specific Missing Items

```typescript
TS2304: Cannot find name 'Search' // glass-combobox line 335
TS2304: Cannot find name '_span' // glass-tree-view lines 132, 138
TS2304: Cannot find name 'UnifiedGlassEffect' // navbar lines 104, 134; sidebar lines 121, 166
TS2304: Cannot find name 'useGlassStateTransitions' // glass-form-field line 165
```

### Pattern 3: Undefined vs Null Type Issues (15 errors)

**Error Message:** `Type 'undefined' is not assignable to type 'X | null'`

#### Specific Cases

```typescript
TS2322: Type 'undefined' is not assignable to type 'HTMLElement | null'
TS2322: Type 'undefined' is not assignable to type 'AudioBuffer | null'
TS2322: Type 'undefined' is not assignable to type 'AudioContext | null'
TS2322: Type 'undefined' is not assignable to type 'ContentAnalysis | null'
TS2345: Argument of type 'undefined' is not assignable to parameter of type 'X | null'
```

#### Files Affected

- glass-skip-navigation: Lines 184, 189, 376, 381
- use-haptic-feedback: Lines 290, 299, 473
- use-liquid-glass: Lines 253, 285
- safe-dom: Lines 45, 73, 80, 149, 164, 200, 207, 220, 224, 227
- contrast-checker: Line 33
- roving-tabindex: Line 500

### Pattern 4: Compound Component Type Issues (5 errors)

**Error Message:** `Property 'X' does not exist on type 'ForwardRefExoticComponent<...>'`

#### Specific Properties

```typescript
TS2339: Property 'Header' does not exist on type 'ForwardRefExoticComponent<GlassCardProps>'
TS2339: Property 'Title' does not exist on type 'ForwardRefExoticComponent<GlassCardProps>'
TS2339: Property 'Description' does not exist on type 'ForwardRefExoticComponent<GlassCardProps>'
TS2339: Property 'Content' does not exist on type 'ForwardRefExoticComponent<GlassCardProps>'
TS2339: Property 'Footer' does not exist on type 'ForwardRefExoticComponent<GlassCardProps>'
```

### Pattern 5: Missing Object Properties (20 errors)

**Error Message:** `Property 'X' does not exist on type 'Y'`

#### Examples

```typescript
TS2339: Property 'announce' does not exist on type '{ trapFocus: ... }'
TS2339: Property 'trackComponent' does not exist on type '{ startMeasure: ... }'
TS2339: Property 'glass' does not exist on type '{ primary: string; ... }'
TS2339: Property 'shadows' does not exist on type '{ colors: ...; blur: ...; opacity: ... }'
```

### Pattern 6: Array/Index Access Issues (6 errors)

**Error Message:** `Element implicitly has an 'any' type because expression of type 'number' can't be used to index type`

#### Specific Cases

```typescript
TS7053: linkReferences.current[newIndex]; // glass-skip-navigation
TS7053: itemReferences.current[index]; // roving-tabindex
```

### Pattern 7: Function Argument Mismatches (10 errors)

**Error Message:** `Expected X arguments, but got Y`

#### Examples

```typescript
TS2554: Expected 0 arguments, but got 2 // glass-form-field line 192
TS2554: Expected 1 arguments, but got 2 // glass-form-field lines 204, 228
```

### Pattern 8: Type Incompatibility (12 errors)

**Error Message:** `Type 'X' is not assignable to type 'Y'`

#### Examples

```typescript
TS2322: Type 'RefObject<T | null>' is not assignable to type 'RefObject<T>'
TS2322: Type '"elevated"' is not assignable to type 'GlassVariant'
TS2678: Type '"none"' is not comparable to type 'GlassIntensity'
```

## Error Count by Component

| Component                  | Error Count | Primary Issue                  |
| -------------------------- | ----------- | ------------------------------ |
| glass-accordion            | 7           | Variant props                  |
| glass-breadcrumbs          | 4           | Variant props                  |
| glass-card-refactored      | 7           | Compound components            |
| glass-checkbox-group       | 3           | Variant props                  |
| glass-combobox             | 7           | Variant props + missing import |
| glass-date-picker          | 2           | Variant props                  |
| glass-drawer               | 1           | Variant props                  |
| glass-file-upload          | 2           | Variant props                  |
| glass-focus-trap           | 2           | Missing methods                |
| glass-form-field           | 9           | Multiple issues                |
| glass-mobile-nav           | 4           | Variant props                  |
| glass-number-input         | 4           | Variant props                  |
| glass-pagination           | 2           | Variant props                  |
| glass-radio-group          | 2           | Variant props                  |
| glass-skeleton             | 1           | Variant props                  |
| glass-skip-navigation      | 9           | Array access + null checks     |
| glass-toast                | 1           | Context init                   |
| glass-tree-view            | 2           | Missing component              |
| navbar                     | 2           | Missing component              |
| sidebar                    | 2           | Missing component              |
| roving-tabindex            | 10          | React types                    |
| glass-effects              | 6           | Type literals                  |
| use-haptic-feedback        | 3           | Return types                   |
| use-liquid-glass           | 6           | Missing properties             |
| use-performance-monitoring | 10          | Missing methods                |
| use-ssr-safe-hooks         | 1           | Type mismatch                  |
| use-ssr-safe               | 1           | Type casting                   |
| branded                    | 4           | Type casting                   |
| contrast-checker           | 1           | Return type                    |
| safe-dom                   | 12          | Null checks                    |

## Quick Fix Patterns

### Fix Pattern 1: Variant Props

```typescript
// Before
const variant = createVariants({
  variants: { size: {...}, variant: {...} }
});
variant({ size, variant }) // Error

// After - Option 1: Destructure properly
variant({ ...{ size, variant } })

// After - Option 2: Fix the createVariants type
type ExtractVariantProps<T> = {
  [K in keyof T['variants']]?: keyof T['variants'][K]
}
```

### Fix Pattern 2: Missing Imports

```typescript
// Add missing imports
import { Search } from 'lucide-react';

// Create missing components
const UnifiedGlassEffect: React.FC<Props> = ({ children }) => {
  return <div className="glass-effect">{children}</div>;
};
```

### Fix Pattern 3: Null vs Undefined

```typescript
// Before
return; // Returns undefined

// After
return null; // Explicitly return null
```

### Fix Pattern 4: Compound Components

```typescript
// Define proper type
interface GlassCardStatic {
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  // etc...
}

type GlassCardComponent = React.ForwardRefExoticComponent<GlassCardProps> & GlassCardStatic;

// Cast properly
const GlassCard = React.forwardRef(...) as GlassCardComponent;
```

## Priority Fix Order

1. **Variant System** (40% of errors) - Fix the core createVariants function
2. **Missing Imports** (Quick wins) - Add missing imports
3. **Null Checks** (15% of errors) - Replace undefined with null
4. **Compound Components** (5 errors) - Fix type definitions
5. **Array Access** (6 errors) - Add proper type guards
6. **Missing Properties** (20 errors) - Add interface extensions
7. **Function Arguments** (10 errors) - Fix function signatures
8. **Type Literals** (12 errors) - Update type definitions
