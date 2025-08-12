import { SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import React from "react";

export function PreviewWithToolbar({
  initialFiles,
  height = 320,
  showOpenInCodeSandbox = true,
}: {
  initialFiles: Record<string, any>;
  height?: number;
  showOpenInCodeSandbox?: boolean;
}) {
  const { sandpack } = useSandpack();
  const handleReset = () => {
    for (const [path, content] of Object.entries(initialFiles)) {
      const code = typeof content === "string" ? content : (content as any).code;
      sandpack.updateFile(path, code, false);
    }
    if (initialFiles["/App.tsx"]) sandpack.setActiveFile("/App.tsx");
    sandpack.runSandpack();
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginBottom: 8 }}>
        <button onClick={handleReset} style={{ fontSize: 12, padding: "4px 8px" }}>Reset</button>
        {showOpenInCodeSandbox && (
          <SandpackPreview showOpenInCodeSandbox style={{ height: 0 }} />
        )}
      </div>
      <div style={{ height }}>
        <SandpackPreview style={{ height: "100%" }} showOpenInCodeSandbox={false} />
      </div>
    </div>
  );
}
