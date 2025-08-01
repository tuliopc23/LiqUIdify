import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "./components/ComponentPreview";
import { LiveCodeExample } from "./components/LiveCodeExample";

// Re-export LiqUIdify components for use in MDX
export * from "@liquidify/components";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom interactive components
    ComponentPreview,
    LiveCodeExample,

    // Enhanced code blocks with syntax highlighting
    pre: (props) => (
      <pre
        className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm"
        {...props}
      />
    ),

    // Enhanced inline code
    code: (props) => (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      />
    ),

    // Custom headings with anchor links
    h1: (props) => (
      <h1
        className="text-4xl font-bold mb-6 text-gray-900 dark:text-white"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white"
        {...props}
      />
    ),

    // Enhanced links
    a: (props) => (
      <a
        className="text-blue-600 dark:text-blue-400 hover:underline"
        {...props}
      />
    ),

    // Pass through all other components
    ...components,
  };
}
