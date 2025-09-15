import "../../../styles/global";

/**
 * Re-export Tour components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./tour";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Tour from "liquidify/ark-ui/tour").
 */
export { Tour as default } from "./tour";
