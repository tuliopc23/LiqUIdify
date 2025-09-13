import "../../../styles/global";

/**
 * Re-export Editable components for subpath imports with global styles applied.
 */
export * from "./editable";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Editable from "liquidify/ark-ui/editable").
 */
export { Editable as default } from "./editable";
