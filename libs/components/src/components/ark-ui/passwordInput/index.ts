import "../../../styles/global";

/**
 * Re-export PasswordInput components for subpath imports
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./passwordInput";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import PasswordInput from "liquidify/ark-ui/passwordInput").
 */
export { PasswordInput as default } from "./passwordInput";
