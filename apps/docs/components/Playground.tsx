// filepath: apps/docs/components/Playground.tsx
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import type { Files } from "./sandpackDefaults";
import {
  DEFAULT_CSS,
  DEFAULT_DEPS,
  withBaseFiles,
  LIQUID_GLASS_DARK_THEME,
  LIQUID_GLASS_LIGHT_THEME,
} from "./sandpackDefaults";

export default function Playground({
  files,
  deps = {},
  externalCSS = DEFAULT_CSS,
  height = 360,
  theme = typeof window !== "undefined" &&
  document?.documentElement?.classList.contains("dark")
    ? "dark"
    : "light",
  showTabs = true,
  showLineNumbers = true,
  showOpenExternal = false,
}: {
  files: Files;
  deps?: Record<string, string>;
  externalCSS?: string[];
  height?: number;
  theme?: "light" | "dark";
  showTabs?: boolean;
  showLineNumbers?: boolean;
  showOpenExternal?: boolean;
}) {
  const themeObj = theme === "dark" ? LIQUID_GLASS_DARK_THEME : LIQUID_GLASS_LIGHT_THEME;
  const mergedFiles: Files = withBaseFiles(files);

  return (
    <SandpackProvider
      template="react-ts"
      theme={themeObj}
      files={mergedFiles}
      customSetup={{ dependencies: { ...DEFAULT_DEPS, ...deps } }}
      options={{ recompileMode: "delayed", externalResources: externalCSS }}
    >
      <SandpackLayout style={{ height }}>
        <SandpackCodeEditor
          showTabs={showTabs}
          showLineNumbers={showLineNumbers}
        />
        <SandpackPreview showOpenInCodeSandbox={showOpenExternal} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
