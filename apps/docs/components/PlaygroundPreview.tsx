// filepath: apps/docs/components/PlaygroundPreview.tsx
import { SandpackProvider, SandpackPreview } from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

// Sandpack files map: path -> code or object with code/flags
export type Files = Record<string, string | { code: string; hidden?: boolean; active?: boolean }>;

export default function PlaygroundPreview({
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
      <SandpackPreview showOpenInCodeSandbox={false} />
    </SandpackProvider>
  );
}
