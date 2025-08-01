/**
 * Core Architecture Module
 *
 * This module provides the foundational architecture for the LiquidUI component library.
 * It includes shared utilities, hooks, types, and base components that ensure consistency
 * across all components while maintaining modularity and scalability.
 */

// Export base component types and interfaces (avoiding duplicates);

// Export core types (primary source);
export * from "./base-component";

export * from "./components";
export * from "./hooks";
export * from "./patterns";
// Re-export all modules
export * from "./utils";

// Re-export specific named exports
