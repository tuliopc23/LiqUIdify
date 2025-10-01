/**
 * Re-export ScrollArea components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./scrollArea";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import ScrollArea from "liquidify/ark-ui/scrollArea").
 */
export { ScrollArea as default } from "./scrollArea";
