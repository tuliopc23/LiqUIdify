 Pimport {
  SandpackCodeViewer,
    SandpackPreview,
    useSandpack,
} from "@codesandbox/sandpack-react";
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
  const [showCode, setShowCode] = React.useState(false);
  const [isBooted, setIsBooted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setIsBooted(true), 1000);
    return () => clearTimeout(t);
  }, []);
  const handleReset = () => {
    for (const [path, content] of Object.entries(initialFiles)) {
      const code =
        typeof content === "string" ? content : (content as any).code;
      sandpack.updateFile(path, code, false);
    }
    if (initialFiles["/App.tsx"]) sandpack.setActiveFile("/App.tsx");
    sandpack.runSandpack();
  };

  const handleCopy = async () => {
    try {
      const active = sandpack.activeFile || "/App.tsx";
      const code = sandpack.files[active]?.code ?? "";
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch { }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <strong style={{ fontSize: 12, opacity: 0.7 }}>Live Preview</strong>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            aria-label="Toggle code view"
            onClick={() => setShowCode((v) => !v)}
            style={{ fontSize: 12, padding: "4px 8px" }}
          >
            {showCode ? "Hide code" : "Show code"}
          </button>
          {showCode && (
            <button
              aria-label="Copy active file code"
              onClick={handleCopy}
              style={{ fontSize: 12, padding: "4px 8px" }}
            >
              {copied ? "Copied" : "Copy code"}
            </button>
          )}
          <button
            aria-label="Reset preview"
            onClick={handleReset}
            style={{ fontSize: 12, padding: "4px 8px" }}
          >
            Reset
          </button>
        </div>
      </div>
      <div style={{ height: Math.max(240, height) }}>
        {!isBooted ? (
          <div
            style={{
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "var(--gray-2, #f6f6f6)",
              color: "#888",
              fontSize: 12,
            }}
          >
            Booting sandbox…
          </div>
        ) : showCode ? (
          <div style={{ height: "100%", overflow: "auto" }}>
            <SandpackCodeViewer />
          </div>
        ) : (
          <SandpackPreview
            style={{ height: "100%" }}
            showOpenInCodeSandbox={showOpenInCodeSandbox}
          />
        )}
      </div>
    </div>
  );
}
