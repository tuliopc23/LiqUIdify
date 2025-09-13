import "../../../styles/global";

/**
 * Re-export SignaturePad components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./signaturePad";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import SignaturePad from "liquidify/ark-ui/signaturePad").
 */
export { SignaturePad as default } from "./signaturePad";
