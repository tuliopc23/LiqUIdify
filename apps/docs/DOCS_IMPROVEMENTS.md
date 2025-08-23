# LiqUIdify Docs Improvement Plan

## Immediate Fixes (1-2 hours)

### 1. Fix Navigation Casing

```json
// In docs.json, change:
"getting-started/Installation" → "getting-started/installation"
```

### 2. Remove Duplicate Headings

Search and fix these patterns in MDX files:

- Multiple "### Size Variants" sections
- Repeated section headings

### 3. Fix Script Path

```json
// In docs.json head section:
"src": "scripts/enhancements.js" // Remove 'public/' prefix
```

## Quick CSS Improvements (2-3 hours)

### 1. Scope Apple Styles

Wrap your CSS with:

```css
.liquidify-docs {
  /* All current Apple styles here */
}
```

Then add class to body in MDX layout.

### 2. Add Copy Button Styles

```css
.code-block-header {
  position: relative;
}
.copy-button {
  position: absolute;
  top: 8px;
  right: 8px;
  /* Apple button styles */
}
```

## Content Template (30 minutes)

Create `/apps/docs/.templates/component.mdx`:

```mdx
---
title: Component Name
description: Brief component description
---

import ComponentExample from "/snippets/components/ComponentExample.jsx";
import PreviewCodeTabs from "./PreviewCodeTabs.tsx";

# Component Name

Brief description of the component and its purpose.

## Basic Usage

<PreviewCodeTabs code={`// Basic usage example`} language="tsx">
  <ComponentExample />
</PreviewCodeTabs>

## Props

## Variants

## Accessibility

## Related Components
```

## Automated Checks

Add to CI:

```yaml
# .github/workflows/docs-quality.yml
- name: Check for duplicate headings
  run: |
    grep -r "^### " apps/docs/components/ | sort | uniq -d
    if [ $? -eq 0 ]; then exit 1; fi

- name: Check for broken links
  run: |
    find apps/docs -name "*.mdx" -exec grep -l "components/.*" {} \;
```
