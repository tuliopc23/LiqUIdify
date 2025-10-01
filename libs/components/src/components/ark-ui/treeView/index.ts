/**
 * Re-export TreeView components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./treeView";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import TreeView from "liquidify/ark-ui/treeView").
 */
export { TreeView as default } from "./treeView";
