import { SandpackProvider } from "@codesandbox/sandpack-react";
import { githubLight, nightOwl } from "@codesandbox/sandpack-themes";
import type { Files } from "./PlaygroundPreview";
import React from "react";

const DEFAULT_DEPS = { react: "18", "react-dom": "18", "@liquidify/components": "1.2.4" };
const DEFAULT_CSS = [
  "/styles/liquid-glass.css",
  "/styles/visual-enhancements.css",
  "/styles/enhanced-typography.css",
  "/styles/theme-backgrounds.css",
];

export function ShowcaseProvider({
  files,
  deps = {},
  externalCSS = DEFAULT_CSS,
  theme = typeof window !== "undefined" && document?.documentElement?.classList.contains("dark") ? "dark" : "light",
  children,
}: {
  files: Files;
  deps?: Record<string, string>;
  externalCSS?: string[];
  theme?: "light" | "dark";
  children: React.ReactNode;
}) {
  const themeObj = theme === "dark" ? nightOwl : githubLight;
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
      theme={themeObj}
      files={mergedFiles}
      customSetup={{ dependencies: { ...DEFAULT_DEPS, ...deps } }}
      options={{ recompileMode: "delayed", externalResources: externalCSS }}
    >
      {children}
    </SandpackProvider>
  );
}
