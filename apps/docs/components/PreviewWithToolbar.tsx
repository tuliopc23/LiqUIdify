// Removed Sandpack-based preview with toolbar. Keeping a minimal stub to avoid breaking imports.
import React from "react";

export function PreviewWithToolbar({ children }: { children?: React.ReactNode }) {
  return <div className="not-prose">{children ?? null}</div>;
}
