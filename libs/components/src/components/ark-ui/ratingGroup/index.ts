/**
 * Re-export RatingGroup components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./ratingGroup";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import RatingGroup from "liquidify/ark-ui/ratingGroup").
 */
export { RatingGroup as default } from "./ratingGroup";
