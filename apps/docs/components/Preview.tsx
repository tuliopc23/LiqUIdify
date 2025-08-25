import { Highlight } from "prism-react-renderer";
import React from "react";

export type PreviewProps = {
  title?: string;
  code: string;
  language?: string;
  children: React.ReactNode;
};

// Simple styling hooks via classNames to let Mintlify / site CSS theme it.
export const Preview: React.FC<PreviewProps> = ({
  title,
  code,
  language = "tsx",
  children,
}) => {
  return (
    <div className="preview-block not-prose my-6">
      {title && <div className="preview-title text-sm">{title}</div>}
      <div className="preview-live">{children}</div>
      <div className="preview-code relative group">
        <CopyButton code={code} />
        <Highlight
          code={code.trim()}
          language={language as any}
          theme={{ plain: {}, styles: [] } as any}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className} style={style}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
};

const CopyButton: React.FC<{ code: string }> = ({ code }) => {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      type="button"
      aria-label="Copy code"
      onClick={() => {
        const doCopy = async () => {
          try {
            if (navigator?.clipboard?.writeText) {
              await navigator.clipboard.writeText(code);
            } else {
              // Fallback: create temporary textarea
              const el = document.createElement("textarea");
              el.value = code;
              el.style.position = "fixed";
              el.style.opacity = "0";
              document.body.appendChild(el);
              el.select();
              document.execCommand("copy");
              document.body.removeChild(el);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
          } catch (e) {
            console.warn("Copy failed", e);
          }
        };
        void doCopy();
      }}
      className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-md text-[10px] px-2 py-1 font-medium"
      style={{
        background: "color-mix(in oklab, var(--liquid-bg) 85%, white 15%)",
        color: "var(--liquid-text)",
        border: "1px solid var(--liquid-highlight)",
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default Preview;
