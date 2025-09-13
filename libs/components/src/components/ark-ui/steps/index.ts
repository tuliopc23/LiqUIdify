import "../../../styles/global";

/**
 * Re-export Steps components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./steps";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import Steps from "liquidify/ark-ui/steps").
 */
export { Steps as default } from "./steps";
