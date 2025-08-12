// filepath: apps/docs/components/PlaygroundPreview.tsx
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

// Sandpack files map: path -> code or object with code/flags
export type Files = Record<string, string | { code: string; hidden?: boolean; active?: boolean }>;

const DEFAULT_DEPS = {
  react: "18",
  "react-dom": "18",
  "@liquidify/components": "1.2.4", // pinned for stability
};

const DEFAULT_CSS = [
  "/styles/liquid-glass.css",
  "/styles/visual-enhancements.css",
  "/styles/enhanced-typography.css",
  "/styles/theme-backgrounds.css",
];

export default function PlaygroundPreview({
  files,
  deps = {},
  externalCSS = DEFAULT_CSS,
  height = 320,
}: {
  files: Files;
  deps?: Record<string, string>;
  externalCSS?: string[];
  height?: number;
}) {
  const mergedFiles: Files = {
    "/index.html": { code: "<div id='root'></div>", hidden: true },
    "/main.tsx": {
      code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")!).render(<App />);`,
      hidden: true,
    },
    ...files,
  };

  return (
    <SandpackProvider
      template="react-ts"
      theme={githubLight}
      files={mergedFiles}
      customSetup={{ dependencies: { ...DEFAULT_DEPS, ...deps } }}
      options={{ recompileMode: "delayed", externalResources: externalCSS }}
    >
      <div style={{ height }}>
        <SandpackPreview showOpenInCodeSandbox={false} style={{ height: "100%" }} />
      </div>
    </SandpackProvider>
  );
}

