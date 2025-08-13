// filepath: apps/docs/components/PlaygroundPreview.tsx
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { githubLight, nightOwl } from "@codesandbox/sandpack-themes";
import type { Files } from "./sandpackDefaults";
import { DEFAULT_CSS, DEFAULT_DEPS, withBaseFiles } from "./sandpackDefaults";

export default function PlaygroundPreview({
  files,
  deps = {},
  externalCSS = DEFAULT_CSS,
  height = 320,
  theme = typeof window !== "undefined" &&
  document?.documentElement?.classList.contains("dark")
    ? "dark"
    : "light",
}: {
  files: Files;
  deps?: Record<string, string>;
  externalCSS?: string[];
  height?: number;
  theme?: "light" | "dark";
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
      <div style={{ height }}>
        <SandpackPreview
          showOpenInCodeSandbox={false}
          style={{ height: "100%" }}
        />
      </div>
    </SandpackProvider>
  );
}
