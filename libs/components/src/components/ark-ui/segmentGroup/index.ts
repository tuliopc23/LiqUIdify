import "../../../styles/global";

/**
 * Re-export SegmentGroup components for subpath imports,
 * ensuring global Liquidify styles are applied out of the box.
 */
export * from "./segmentGroup";

/**
 * Provide a default export for ergonomic imports
 * (e.g., import SegmentGroup from "liquidify/ark-ui/segmentGroup").
 */
export { SegmentGroup as default } from "./segmentGroup";
