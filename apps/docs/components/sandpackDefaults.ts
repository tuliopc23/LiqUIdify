// Shared Sandpack defaults and helpers for docs showcase
export type Files = Record<
  string,
  string | { code: string; hidden?: boolean; active?: boolean }
>;

export const DEFAULT_DEPS: Record<string, string> = {
  react: "18",
  "react-dom": "18",
  "@liquidify/components": "1.3.3",
};

export const DEFAULT_CSS: string[] = [
  "/styles/liquid-glass.css",
  "/styles/visual-enhancements.css",
  "/styles/enhanced-typography.css",
  "/styles/theme-backgrounds.css",
];

export function withBaseFiles(files: Files): Files {
  return {
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
}
