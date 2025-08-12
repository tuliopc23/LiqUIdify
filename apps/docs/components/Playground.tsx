// filepath: apps/docs/components/Playground.tsx
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

export type Files = Record<string, string | { code: string; hidden?: boolean; active?: boolean }>;

const DEFAULT_DEPS = {
  react: "18",
  "react-dom": "18",
  "@liquidify/components": "1.2.4",
};

const DEFAULT_CSS = [
  "/styles/liquid-glass.css",
  "/styles/visual-enhancements.css",
  "/styles/enhanced-typography.css",
  "/styles/theme-backgrounds.css",
];

export default function Playground({
  files,
  deps = {},
  externalCSS = DEFAULT_CSS,
  height = 360,
  showTabs = true,
  showLineNumbers = true,
  showOpenExternal = false,
}: {
  files: Files;
  deps?: Record<string, string>;
  externalCSS?: string[];
  height?: number;
  showTabs?: boolean;
  showLineNumbers?: boolean;
  showOpenExternal?: boolean;
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
      <SandpackLayout style={{ height }}>
        <SandpackCodeEditor showTabs={showTabs} showLineNumbers={showLineNumbers} />
        <SandpackPreview showOpenInCodeSandbox={showOpenExternal} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
