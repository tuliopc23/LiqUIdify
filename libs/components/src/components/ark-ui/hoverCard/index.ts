/**
 * Re-export HoverCard components for subpath imports
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./hoverCard";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import HoverCard from "liquidify/ark-ui/hoverCard").
 */
export { HoverCard as default } from "./hoverCard";
