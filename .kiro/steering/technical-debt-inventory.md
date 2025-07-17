---
inclusion: always
---

# Technical Debt & Code Standards

## Architecture Patterns

**Component Structure**: Use functional components with hooks exclusively. Avoid class components and legacy lifecycle methods (`componentWillMount`, `componentWillReceiveProps`).

**Glass Effects**: Consolidate all glass effect implementations into the unified `GlassEffect` system. Avoid creating separate glass effect components.

**Animation Systems**: Use the centralized animation choreographer. Do not implement standalone animation logic.

**Bundle Organization**: Follow the modular bundle structure (`core`, `advanced`, `physics`, `ssr`) for optimal tree-shaking.

## Code Style Requirements

**TypeScript**: 
- Never use `any` types or `// @ts-ignore` comments
- Provide explicit return types for all functions
- Use branded types for enhanced type safety

**React Patterns**:
- Use declarative patterns with refs instead of direct DOM manipulation
- Prefer CSS modules or styled-components over inline styles
- Implement proper error boundaries for all major components

**Performance**:
- Lazy load components using React.lazy() for non-critical paths
- Implement proper memoization with useMemo/useCallback
- Use the performance monitoring hooks for tracking

## Critical Consolidation Areas

**High Priority**:
1. Glass effect systems - multiple implementations exist, use unified approach
2. Animation systems - consolidate into single choreographer
3. TypeScript migration - complete proper typing throughout

**Medium Priority**:
1. Theme definitions - use single theme provider with context
2. Utility functions - consolidate duplicates into shared modules
3. Component patterns - standardize on functional components

## Quality Gates

**Before Implementation**:
- All new code must pass TypeScript strict mode
- Components must include accessibility attributes
- Performance impact must be measured and documented

**Code Review Requirements**:
- No console statements in production code
- No eslint-disable comments without justification
- All components must have corresponding tests

## SSR & Hydration

**SSR Safety**: Use `use-ssr-safe-hooks` for client-only functionality. Implement graceful degradation patterns for enhanced features.

**Hydration**: Utilize the hydration detector for conditional rendering. Ensure all interactive components work without JavaScript.

## Bundle Strategy

**Core Bundle**: Essential components only (Button, Card, Input)
**Advanced Bundle**: Enhanced features with animations
**Physics Bundle**: Advanced physics-based interactions
**SSR Bundle**: Server-side rendering optimized components

Always consider bundle impact when adding new dependencies or features.
