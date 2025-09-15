import "../../../styles/global";

/**
 * Re-export Toggle components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./toggle";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Toggle from "liquidify/ark-ui/toggle").
 */
export { Toggle as default } from "./toggle";
