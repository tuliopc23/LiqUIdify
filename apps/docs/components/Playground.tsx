// filepath: apps/docs/components/Playground.tsx
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

export type Files = Record<string, string | { code: string; hidden?: boolean; active?: boolean }>;

export default function Playground({
  files,
  deps = {},
  externalCSS = ["/styles/liquid-glass.css"],
}: {
  files: Files;
  deps?: Record<string, string>;
  externalCSS?: string[];
}) {
  return (
    <SandpackProvider
      template="react-ts"
      theme={githubLight}
      files={files}
      customSetup={{
        dependencies: {
          react: "18",
          "react-dom": "18",
          "@liquidify/components": "latest",
          ...deps,
        },
      }}
      options={{ recompileMode: "delayed", externalResources: externalCSS }}
    >
      <SandpackLayout>
        <SandpackCodeEditor showTabs showLineNumbers />
        <SandpackPreview showOpenInCodeSandbox={false} />
      </SandpackLayout>
    </SandpackProvider>
  );
}
