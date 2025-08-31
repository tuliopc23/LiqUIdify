// Removed Sandpack integration; ShowcaseProvider is no longer needed.
// Keeping an empty passthrough to avoid breaking imports until all references are cleaned.
import type React from "react";

export function ShowcaseProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
