import React from "react";
import { Highlight } from "prism-react-renderer";

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
    <div className="preview-block not-prose my-6 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 backdrop-blur-md p-4 shadow-sm">
      {title && (
        <div className="preview-title mb-3 flex items-center justify-between">
          <div className="font-medium text-gray-900 dark:text-gray-100 text-sm tracking-wide">
            {title}
          </div>
        </div>
      )}
      <div className="preview-live mb-4 py-3 px-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5">
        {children}
      </div>
      <div className="preview-code relative group">
        <CopyButton code={code} />
        <Highlight
          code={code.trim()}
          language={language as any}
          theme={
            {
              plain: { color: "#e6edf3", backgroundColor: "#0d1117" },
              styles: [],
            } as any
          }
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={
                className +
                " text-[12.5px] leading-relaxed overflow-auto rounded-lg p-4 bg-[#0d1117] text-gray-100 border border-gray-700"
              }
              style={style}
            >
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
      className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 rounded-md bg-gray-800/90 text-gray-200 hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 focus-visible:ring-offset-[#0d1117] text-[10px] px-2 py-1 font-medium"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

export default Preview;
