import "../../../styles/global";

/**
 * Re-export TagsInput components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./tagsInput";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import TagsInput from "liquidify/ark-ui/tagsInput").
 */
export { TagsInput as default } from "./tagsInput";
