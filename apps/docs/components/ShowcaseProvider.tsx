import { SandpackProvider } from "@codesandbox/sandpack-react";
import { githubLight, nightOwl } from "@codesandbox/sandpack-themes";
import type { Files } from "./sandpackDefaults";
import { DEFAULT_CSS, DEFAULT_DEPS, withBaseFiles } from "./sandpackDefaults";
import React from "react";

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
  const mergedFiles: Files = withBaseFiles(files);

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
