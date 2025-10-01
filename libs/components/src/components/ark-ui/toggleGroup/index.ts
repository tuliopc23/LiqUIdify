/**
 * Re-export ToggleGroup components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./toggleGroup";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import ToggleGroup from "liquidify/ark-ui/toggleGroup").
 */
export { ToggleGroup as default } from "./toggleGroup";
