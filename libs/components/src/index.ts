/**
 * LiquidUI - Production-ready React component library with glassmorphism design
 * @packageDocumentation
 */

// Re-export utilities
export * from "./utils/type-guards";

// Re-export story helpers for development
export * from "./stories/utils/storyHelpers";

// Export version
export const version = "1.2.4";

// Export library metadata
export const metadata = {
  name: "LiquidUI",
  version: "1.2.4",
  description: "Production-ready React component library with glassmorphism design and physics-based interactions",
} as const;