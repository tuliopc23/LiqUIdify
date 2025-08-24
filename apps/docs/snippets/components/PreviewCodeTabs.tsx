import React, { useMemo, useState } from "react";

/**
 * PreviewCodeTabs
 * Lightweight preview/code tab switcher for MDX pages.
 * Usage:
 *   <PreviewCodeTabs code={`<Button>Click</Button>`} language="tsx">
 *     <Button>Click</Button>
 *   </PreviewCodeTabs>
 */
export default function PreviewCodeTabs({
  code,
  language = "tsx",
  previewLabel = "Preview",
  codeLabel = "Code",
  className = "",
  children,
}: {
  code: string;
  language?: string;
  previewLabel?: string;
  codeLabel?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  const langClass = useMemo(
    () => `language-${language}`.toLowerCase(),
    [language],
  );

  return (
    <div className={`not-prose preview-code-tabs ${className}`.trim()}>
      <div
        className="pct-tablist"
        role="tablist"
        aria-label="Preview and code tabs"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "preview"}
          className="pct-tab"
          onClick={() => setTab("preview")}
        >
          {previewLabel}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "code"}
          className="pct-tab"
          onClick={() => setTab("code")}
        >
          {codeLabel}
        </button>
      </div>

      <div className="pct-panels">
        <div
          role="tabpanel"
          hidden={tab !== "preview"}
          className="pct-panel pct-preview"
        >
          {children}
        </div>
        <div
          role="tabpanel"
          hidden={tab !== "code"}
          className="pct-panel pct-code"
        >
          <pre className={langClass}>
            <code className={langClass}>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
