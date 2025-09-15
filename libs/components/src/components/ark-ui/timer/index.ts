import "../../../styles/global";

/**
 * Re-export Timer components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./timer";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Timer from "liquidify/ark-ui/timer").
 */
export { Timer as default } from "./timer";
