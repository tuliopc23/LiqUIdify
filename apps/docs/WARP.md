# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## LiqUIdify Documentation (Mintlify)

### Purpose

This file orients future WARP agents working on the LiqUIdify documentation site (Mintlify). Focus on practical steps, gotchas, and project-specific conventions.

### Scope

- **App**: `apps/docs/` (Mintlify site for the LiqUIdify React component library)
- **Goal**: Maintain and evolve the docs, keep navigation and examples consistent with the library and Storybook

---

## 🚀 Quickstart Commands

**Install dependencies (workspace root):**

```bash
bun install
```

**Development (uses latest Mintlify CLI):**

```bash
bun run docs:dev
```

**Build (static export):**

```bash
bun run docs:build
```

**Preview static build:**

```bash
bun run docs:preview
```

**When editing live component behavior or types:**

```bash
bun run build:lib  # builds the component library once
# or
bun run dev        # library dev mode
```

**Optional - cross-check examples with Storybook:**

```bash
bun run storybook
```

---

## 📁 Documentation Architecture

### Core Configuration

**Location**: `apps/docs/mint.json`

- **Layout**: "topnav"
- **Theme**: "venus"
- **Colors**: primary #007AFF, light #5AC8FA, dark #0051D5
- **Topbar Links**: GitHub and Storybook
- **CTA Button**: "Get Started" → `/getting-started/quickstart`
- **Search**: "Search LiqUIdify docs..."
- **Feedback**: thumbsRating, suggestEdit, raiseIssue enabled

### Current Documentation Structure

```
apps/docs/
├── getting-started/          # Installation, quickstart, setup
├── core-concepts/           # Architecture, themes, performance
├── components/              # 56+ component docs (comprehensive)
├── guides/                  # Theming, accessibility, recipes
├── api/                     # Basic API reference
├── integrations/            # Storybook integration
├── migrate/                 # Migration from other libraries
├── faq.mdx                  # Frequently asked questions
├── troubleshooting.mdx      # Common issues
├── changelog.mdx            # Release notes
└── contributing.mdx         # Contribution guidelines
```

### External Documentation

- **`/docs/`**: Accessibility, Performance, Migration guides (root level)
- **README.md**: Comprehensive project overview
- **Storybook**: Live component playground
- **GitHub**: Issue/PR templates

---

## 🧩 Preview Component for Live Examples

**Location**: `apps/docs/components/Preview.tsx`

**Purpose**: Provide a live-render area + highlighted code with a copy button.

**Import pattern:**

```mdx
// From getting-started/ pages:
import Preview from "../components/Preview"

// From root pages:
import Preview from "./components/Preview"

// From core-concepts/ pages:
import Preview from "../components/Preview"
```

**Usage example:**

```mdx
<Preview
  title="Primary Button"
  code={`import { GlassButton } from "liquidify";
import "liquidify/styles";

export default function Demo() {
  return <GlassButton variant="primary">Hello Liquid Glass</GlassButton>;
}`}
>
  <div style={{ display: "inline-flex", gap: 12 }}>
    <button className="px-3 py-2 rounded-md bg-blue-600 text-white">Primary</button>
  </div>
</Preview

>
```

**Props:**

- `title?` (string): Optional title for the example
- `code` (string): Code to display and copy
- `language?` (string): Defaults to "tsx"
- `children` (ReactNode): Live rendered content

---

## 📝 Content Authoring Guidelines

### MDX Structure Pattern

````yaml
---
title: Component Name
description: One-line value prop for the component.
---

# Optional H1 (Mintlify renders title)

## Overview
Short problem/solution framing

## Installation
```tsx
import { GlassButton } from "liquidify";
import "liquidify/styles";
````

## Basic Example

<Preview title="Basic Usage" code="...">
  {/* Live content */}
</Preview>

## Props & API

Link to API Reference or list core props

## Accessibility

Keyboard/focus notes, ARIA roles

## Recipes

Advanced examples, cross-link to guides

## Storybook

Link: https://liquidify-storybook.vercel.app

```

### Content Quality Standards
- **Keep code fences language accurate** (tsx, bash, json)
- **Prefer concise examples**; defer edge cases to Recipes or Storybook
- **Use relative imports** for Preview.tsx correctly per page depth
- **Avoid duplicating API info**; link to API Reference when available
- **Keep code and Preview children in sync** to avoid confusion

---

## 🔄 Key Workflows

### Adding a New Page
1. **Create file**: `.md` or `.mdx` under appropriate folder
2. **Update navigation**: Add to `mint.json` under correct group
3. **Test locally**: `bun run docs:dev` and verify route, sidebar, metadata
4. **Validate build**: `bun run docs:build` to catch broken links

### Adding a New Navigation Group
1. **Update `mint.json`**: Add new group to navigation array
2. **Follow naming conventions**: Use existing patterns (kebab-case)
3. **Consider hierarchy**: Keep grouping logical and consistent

### Updating Component Documentation
1. **Sync with Storybook**: Ensure examples match Storybook stories
2. **Update API reference**: If component props change
3. **Cross-check examples**: Ensure live examples work with latest library
4. **Validate accessibility notes**: Keep a11y info current

### Managing Redirects
- **Use `mint.json` redirects** for legacy paths
- **Common redirects**: `/quickstart` → `/getting-started/quickstart`
- **Validate after build**: Broken links surface during build/preview

---

## 📚 Documentation Gaps & Priorities

### 🔥 Critical Gaps (see DOCUMENTATION_STRUCTURE_ANALYSIS.md)
1. **Enhanced API Documentation** - Auto-generate component props tables
2. **Developer Onboarding Guide** - Setup for contributors
3. **Architecture Documentation** - Internal structure explanation
4. **Framework Integration Guides** - Next.js, Remix, Vite specifics

### 🚀 Medium Priority
5. **Component Development Workflow** - How to create new components
6. **Testing Strategy Documentation** - Testing approach and tools
7. **Advanced Customization Guide** - Deep theming and CSS customization
8. **Real-world Examples** - Complete application examples

### ✨ Future Enhancements
- **Design System Documentation** - Design tokens, principles
- **Tutorial Series** - Progressive learning path
- **Production Deployment Guide** - Production readiness
- **Auto-generated API docs** from TypeScript

---

## 🛠️ Technical Context

### Scripts (from root package.json)
- `docs:dev` → `cd apps/docs && npx -y mintlify@latest dev`
- `docs:build` → `mintlify build apps/docs`
- `docs:preview` → `mintlify preview apps/docs`

### Related Build Commands
- `build:lib` → builds component library (rolldown/vite + types)
- `storybook` → local Storybook development
- `test:a11y` → accessibility testing

### Tools & Dependencies
- **Package manager**: bun >= 1.0.0
- **Documentation**: Mintlify (use `npx -y mintlify@latest` for latest)
- **Syntax highlighting**: prism-react-renderer (in Preview component)
- **Live examples**: Custom Preview component + Tailwind classes

---

## ✅ Pre-Merge Checklist

### Documentation Quality
- [ ] `bun run docs:build` completes without warnings/errors
- [ ] `bun run docs:preview` serves expected routes
- [ ] Topbar CTA (Get Started) resolves correctly
- [ ] Storybook link works (https://liquidify-storybook.vercel.app)
- [ ] No broken internal links
- [ ] Navigation mirrors `mint.json` accurately

### Content Validation
- [ ] All code examples are tested and working
- [ ] Preview components render correctly
- [ ] Relative imports for Preview.tsx are correct
- [ ] Cross-references to Storybook are accurate
- [ ] Accessibility information is current

### Consistency Checks
- [ ] Examples match Storybook stories
- [ ] Component props align with actual API
- [ ] Theming examples use current design tokens
- [ ] Import statements use latest package structure

---

## 🚨 Common Gotchas

### Preview Component Import Paths
- **Varies by page depth** - always verify relative import path
- **Getting started pages**: `../components/Preview`
- **Root pages**: `./components/Preview`
- **Core concepts pages**: `../components/Preview`

### CSS and Styling
- **Global CSS import**: Ensure docs site includes `"liquidify/styles"` globally
- **Example styling**: Preview component uses Tailwind classes from docs site
- **Library CSS availability**: Examples may need library CSS loaded

### Build and Development
- **Always use latest Mintlify CLI**: `npx -y mintlify@latest` per project rules
- **Never downgrade dependencies** without permission
- **Path consistency**: Docs directory is `apps/docs/`, not `apps/mintlify-docs/`

### Content Synchronization
- **Component changes**: Update docs when library components change
- **API changes**: Sync API reference with actual exports
- **Storybook alignment**: Keep docs examples consistent with Storybook

---

## 📖 Additional Resources

- **Mintlify Documentation**: https://mintlify.com/docs
- **Component Library**: https://liquidify-storybook.vercel.app
- **Project Overview**: See root `README.md`
- **Documentation Analysis**: See `DOCUMENTATION_STRUCTURE_ANALYSIS.md`
- **Contributing Guidelines**: See `CONTRIBUTING.md`

This WARP.md serves as the comprehensive guide for maintaining and enhancing the LiqUIdify documentation site.
```
