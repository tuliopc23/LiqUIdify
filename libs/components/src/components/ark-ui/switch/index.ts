import "../../../styles/global";

/**
 * Re-export Switch components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./switch";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Switch from "liquidify/ark-ui/switch").
 */
export { Switch as default } from "./switch";
