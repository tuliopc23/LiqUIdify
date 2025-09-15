import "../../../styles/global";

/**
 * Re-export Splitter components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./splitter";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Splitter from "liquidify/ark-ui/splitter").
 */
export { Splitter as default } from "./splitter";
