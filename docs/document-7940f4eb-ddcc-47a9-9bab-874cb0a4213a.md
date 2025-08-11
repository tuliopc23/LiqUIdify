# Mintlify Docs — Live Component Previews Above Code Blocks (Guide)

### TL;DR

This guide demonstrates how to export and embed live React component previews above or alongside code blocks in a Mintlify documentation site using React hooks. It covers setup, implementation, integration, and best practices for interactive, accessible, and visually consistent documentation. The target audience is developers maintaining or authoring documentation for React component libraries using Mintlify.

---

## Goals

### Business Goals

- Increase developer adoption and engagement with the documentation site.

- Reduce support requests by providing clear, interactive examples.

- Improve the perceived quality and usability of the component library.

- Enable faster onboarding for new users and contributors.

### User Goals

- Allow users to see and interact with live component examples directly in the docs.

- Make it easy to copy, modify, and understand code snippets.

- Provide clear, accessible, and visually consistent documentation.

- Support both TypeScript and JavaScript usage patterns.

### Non-Goals

- Building a full-featured playground or code editor within the docs.

- Supporting non-React frameworks or non-MDX documentation systems.

- Handling advanced SSR/SSG edge cases beyond Mintlify’s standard capabilities.

---

## User Stories

- As a **frontend developer**, I want to see live previews of components above code blocks, so that I can quickly understand how they behave.

- As a **docs maintainer**, I want to embed interactive examples using React hooks, so that I can demonstrate dynamic component usage.

- As a **designer**, I want to verify that components render correctly and are accessible, so that our design system is consistent.

- As a **new user**, I want to copy code from the docs and use it in my project, so that I can get started quickly.

- As a **contributor**, I want to add new examples with minimal setup, so that I can improve documentation efficiently.

---

## Functional Requirements

- **Preview Component System** (Priority: High)
  - Preview Wrapper: Renders a live React component preview above or alongside a code block.

  - Code Block Integration: Displays the source code for the previewed component.

  - Hook Support: Allows usage of React hooks (e.g., useState, useEffect) in examples.

  - Props Passing: Supports passing props and state to previewed components.

- **MDX Integration** (Priority: High)
  - MDX Component Registration: Makes the Preview component available in all MDX files.

  - Example Importing: Allows importing and using exported components from the library.

- **Accessibility & Styling** (Priority: Medium)
  - Keyboard Navigation: Ensures all interactive examples are keyboard accessible.

  - ARIA Support: Adds ARIA attributes where necessary.

  - Responsive Layout: Ensures previews and code blocks are readable on all devices.

- **Testing & Visual Regression** (Priority: Medium)
  - Storybook/Chromatic Integration: Supports visual regression testing of examples.

  - Snapshot Testing: Allows snapshotting of rendered previews.

- **Troubleshooting & Documentation** (Priority: Medium)
  - FAQ Section: Documents common issues and solutions.

  - Full Example Page: Provides a copy-pasteable MDX page with multiple examples.

---

## User Experience

**Entry Point & First-Time User Experience**

- Users access the documentation site and navigate to a component’s page.

- The first example on the page displays a live preview above the code block.

- A short onboarding note or tooltip explains that examples are interactive.

**Core Experience**

- **Step 1:** User scrolls to a component example.
  - The Preview component renders the live component above the code block.

  - The code block displays the exact code used in the preview.

- **Step 2:** User interacts with the live preview (e.g., toggles a button, types in an input).
  - State updates are reflected in real time.

  - No page reload or navigation is required.

- **Step 3:** User copies the code snippet for use in their own project.
  - Copy button is available and accessible.

- **Step 4:** User explores additional examples, each with its own live preview and code block.

- **Step 5:** User can view the source of the Preview component for advanced customization.

**Advanced Features & Edge Cases**

- Handles hydration errors gracefully (e.g., window usage in SSR).

- Supports lazy loading of heavy examples.

- Provides fallback UI for unsupported browsers or SSR issues.

**UI/UX Highlights**

- High color contrast for code and preview areas.

- Responsive layout: previews stack vertically on mobile, side-by-side on desktop.

- Focus indicators and ARIA labels for all interactive elements.

- Consistent spacing and typography for readability.

---

## Narrative

Imagine a developer, Alex, exploring the documentation for a new React component library. In the past, Alex struggled with static code snippets that didn’t show how components behaved in real scenarios. With the new Mintlify-powered docs, Alex immediately sees live, interactive previews above each code block. By toggling switches, entering text, and seeing instant feedback, Alex quickly grasps how each component works. The code is easy to copy and matches the preview exactly. If Alex wants to create a new example, the process is simple: import the Preview component, write a small React function, and the docs update automatically. This seamless experience not only saves Alex time but also builds trust in the library’s quality. For the business, this means happier users, fewer support tickets, and a reputation for excellent documentation.

---

## Success Metrics

### User-Centric Metrics

- % of users interacting with live previews

- User satisfaction (post-launch survey)

- Number of code snippet copies

### Business Metrics

- Reduction in support tickets related to usage confusion

- Increase in GitHub stars or npm downloads post-launch

### Technical Metrics

- Visual regression test pass rate

- SSR hydration error rate (should be near zero)

### Tracking Plan

- Track preview interactions (clicks, toggles, input)

- Track code copy events

- Track page views and time on page

- Track error logs (hydration, SSR, import failures)

---

## Technical Considerations

### Technical Needs

- MDX support for custom React components

- Preview wrapper component (TypeScript/JS)

- Code block rendering with syntax highlighting

- React hooks support in examples

- SSR/SSG compatibility

### Integration Points

- Mintlify docs platform (MDXProvider or equivalent)

- Component library (e.g., Liquidify) exports

- Bundler (Vite, Webpack, etc.) for local dev and build

### Data Storage & Privacy

- No persistent data storage required

- All state is local to the browser

- No user data is collected by default

### Scalability & Performance

- Previews should be lightweight and not impact docs load time

- Lazy load heavy or complex examples

- Ensure code blocks and previews are tree-shakable

### Potential Challenges

- Hydration mismatches between SSR and client

- Import path issues between library and docs

- Ensuring accessibility across all examples

- Styling conflicts between docs and component library

---

## Milestones & Sequencing

### Project Estimate

- Extra-small: 1–2 days

### Team Size & Composition

- Extra-small: 1 person who does everything (docs maintainer or frontend dev)

### Suggested Phases

**Phase 1: Preview Component Implementation**

- Key Deliverables: Implement Preview wrapper (TypeScript/JS), code block integration, hook support.

- Dependencies: React, MDX, Mintlify docs setup.

**Phase 2: MDX Integration & Example Migration**

- Key Deliverables: Register Preview in MDXProvider, update example MDX pages, import components.

- Dependencies: Component library exports.

**Phase 3: Accessibility & Visual Testing**

- Key Deliverables: Add a11y features, integrate with Storybook/Chromatic, snapshot tests.

- Dependencies: Storybook/Chromatic setup.

**Phase 4: Documentation & Troubleshooting**

- Key Deliverables: Write FAQ, troubleshooting, and full example MDX page.

- Dependencies: None.

---

# Purpose

The goal of this guide is to show how to export and embed live React component previews above or alongside code blocks in a Mintlify documentation site using React hooks. This enables interactive, real-world examples that improve understanding and adoption of your component library.

---

## Assumptions & Requirements

**Technical Assumptions**

- Mintlify docs supports MDX and custom React components.

- The project uses TypeScript or JavaScript.

- Components are exported from a package (e.g., `liquidify` or `@your-org/liquidify`).

- The bundler (Vite, Webpack, etc.) supports MDX and React imports.

**Required Dependencies**

- `react` and `react-dom`

- `@mintlify/docs` or relevant Mintlify SDK

- MDX plugin for the bundler (e.g., `@mdx-js/loader`)

- Syntax highlighting library (e.g., `prism-react-renderer` or Mintlify’s built-in)

---

## Quick Example (Minimal)

**MDX File Snippet:**

```mdx
import { Button } from "liquidify";
import { Preview } from "../components/Preview";

<Preview
  title="Primary Button"
  code={\`<Button onClick={() => alert('Clicked!')}>Click me</Button>\`}
  language="tsx"
>
  <Button onClick={() => alert('Clicked!')}>Click me</Button>
</Preview>
```

**Component Import:**

```js
import { Preview } from "../components/Preview";
```

---

## How It Works (Concept)

- **MDX Component Wrapper:** The `Preview` component wraps both the live example and the code block.

- **Live Preview:** Renders the React component as a child, allowing hooks and state.

- **Code Block:** Displays the source code, optionally with syntax highlighting.

- **Hooks Support:** Examples can use `useState`, `useEffect`, and other hooks for interactivity.

- **SSR Compatibility:** The Preview component avoids window/document usage during SSR, and uses hydration-safe patterns.

---

## Implementation: Preview Wrapper Component

### TypeScript Variant

```tsx
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

type PreviewProps = {
  title?: string;
  code: string;
  language?: string;
  children: React.ReactNode;
};

export const Preview: React.FC<PreviewProps> = ({
  title,
  code,
  language = "tsx",
  children,
}) => (
  <div className="preview-block">
    {title && <div className="preview-title">{title}</div>}
    <div className="preview-live">{children}</div>
    <Highlight {...defaultProps} code={code.trim()} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  </div>
);
```

### JavaScript Variant

```js
import React from "react";
import Highlight, { defaultProps } from "prism-react-renderer";

export function Preview({ title, code, language = "tsx", children }) {
  return (
    <div className="preview-block">
      {title && <div className="preview-title">{title}</div>}
      <div className="preview-live">{children}</div>
      <Highlight {...defaultProps} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
```

**Props:**

- `title`: Optional, displays a heading above the preview.

- `code`: The code string to display in the code block.

- `language`: Language for syntax highlighting (default: `tsx`).

- `children`: The live React component to render.

**Security Notes:**

- Do not use `dangerouslySetInnerHTML` for code blocks.

- Only render trusted components in the preview.

**Passing Live Props:**

- Pass props/state to children as you would in any React component.

---

## Mintlify Integration (MDX)

1. **Register the Preview Component:**

- Place `Preview.tsx` in your `/components` directory.

- Import and register it in your Mintlify MDXProvider or global MDX components config.

2. **Use in MDX Pages:**

- Import both the Preview and the component you want to showcase.

- Wrap the example in `<Preview>` as shown in the Quick Example.

**Example MDX Page:**

```mdx
import { Button } from "liquidify";
import { Preview } from "../components/Preview";

# Button

<Preview
  title="Primary Button"
  code={\`<Button onClick={() => alert('Clicked!')}>Click me</Button>\`}
  language="tsx"
>
  <Button onClick={() => alert('Clicked!')}>Click me</Button>
</Preview>
```

---

## Exporting Components from Library

- **Named Exports:** Export all components from an `index.ts`/`index.js` barrel file.

- **Default Export:** Optionally provide a default export for the whole library.

- **Local Development:** Use `npm link`, `yarn workspace`, or path aliases to import local components into the docs site during development.

**Example Barrel File:**

```ts
export { Button } from "./Button";
export { Input } from "./Input";
// ...other components
```

---

## Live Examples Using Hooks

### 1\. useState Toggle Example

```mdx
import { Preview } from "../components/Preview";

<Preview
  title="Toggle Example"
  code={\`function Example() {
  const \[on, setOn\] = React.useState(false)
  return (
    <button onClick={() => setOn(o => !o)}>
      {on ? 'ON' : 'OFF'}
    </button>
  )
}\`}
  language="tsx"
>
  {(() => {
    const \[on, setOn\] = React.useState(false)
    return (
      <button onClick={() => setOn(o => !o)}>
        {on ? 'ON' : 'OFF'}
      </button>
    )
  })()}
</Preview>
```

### 2\. useEffect Fetch Mock

```mdx
<Preview
  title="Fetch Example"
  code={\`function Example() {
  const \[data, setData\] = React.useState(null)
  React.useEffect(() => {
    setTimeout(() => setData('Loaded!'), 500)
  }, \[\])
  return <div>{data || 'Loading...'}</div>
}\`}
  language="tsx"
>
  {(() => {
    const \[data, setData\] = React.useState(null)
    React.useEffect(() => {
      setTimeout(() => setData('Loaded!'), 500)
    }, \[\])
    return <div>{data || 'Loading...'}</div>
  })()}
</Preview>
```

### 3\. Controlled Input

```mdx
<Preview
  title="Controlled Input"
  code={\`function Example() {
  const \[value, setValue\] = React.useState('')
  return (
    <input value={value} onChange={e => setValue(e.target.value)} />
  )
}\`}
  language="tsx"
>
  {(() => {
    const \[value, setValue\] = React.useState('')
    return (
      <input value={value} onChange={e => setValue(e.target.value)} />
    )
  })()}
</Preview>
```

**Notes:**

- Test for correct state updates and reactivity.

- Ensure code matches the rendered preview.

---

## Edge Cases & SSR

- **Hydration Errors:** Avoid using `window` or `document` directly in examples. Use `useEffect` for client-only logic.

- **Conditional Rendering:** Only render interactive elements after hydration if needed.

- **Lazy Loading:** Use `React.lazy` and `Suspense` for heavy examples.

- **Diagnostics:** Log hydration errors in development and provide fallback UI.

---

## Accessibility & Styling

- **Keyboard Navigation:** Ensure all interactive elements are focusable and usable via keyboard.

- **ARIA Labels:** Add ARIA attributes to custom controls as needed.

- **Focus Management:** Use focus rings and visible indicators.

- **CSS Layout:**
  - Use `.preview-block` for container, `.preview-live` for preview, and code block styles for code.

  - Stack vertically on mobile, side-by-side on desktop.

  - Ensure high color contrast and readable font sizes.

---

## Testing & Visual Regression

- **Storybook Integration:** Add Preview examples to Storybook for visual review.

- **Chromatic:** Use Chromatic to snapshot and track visual changes.

- **Snapshot Testing:** Use Jest or similar to snapshot rendered previews.

---

## Troubleshooting & FAQ

---

## Appendix: Full MDX Page Example

```mdx
import { Button, Input } from "liquidify";
import { Preview } from "../components/Preview";

# Component Examples

<Preview
  title="Primary Button"
  code={\`<Button onClick={() => alert('Clicked!')}>Click me</Button>\`}
  language="tsx"
>
  <Button onClick={() => alert('Clicked!')}>Click me</Button>
</Preview>

<Preview
  title="Toggle Example"
  code={\`function Example() {
  const \[on, setOn\] = React.useState(false)
  return (
    <button onClick={() => setOn(o => !o)}>
      {on ? 'ON' : 'OFF'}
    </button>
  )
}\`}
  language="tsx"
>
  {(() => {
    const \[on, setOn\] = React.useState(false)
    return (
      <button onClick={() => setOn(o => !o)}>
        {on ? 'ON' : 'OFF'}
      </button>
    )
  })()}
</Preview>

<Preview
  title="Controlled Input"
  code={\`function Example() {
  const \[value, setValue\] = React.useState('')
  return (
    <Input value={value} onChange={e => setValue(e.target.value)} />
  )
}\`}
  language="tsx"
>
  {(() => {
    const \[value, setValue\] = React.useState('')
    return (
      <Input value={value} onChange={e => setValue(e.target.value)} />
    )
  })()}
</Preview>
```

---
