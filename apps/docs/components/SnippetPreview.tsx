import React, { useState } from "react";

interface SnippetPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  language?: string;
  variant?: "default" | "elevated" | "minimal";
  showCopyButton?: boolean;
}

export function SnippetPreview({
  title,
  description,
  children,
  code,
  language = "tsx",
  variant = "elevated",
  showCopyButton = true,
}: SnippetPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const baseClasses =
    "relative rounded-xl overflow-hidden border transition-all duration-300";
  const variantClasses = {
    default:
      "bg-white/50 dark:bg-black/20 border-gray-200/50 dark:border-gray-700/50",
    elevated:
      "bg-white/80 dark:bg-black/40 border-gray-200/30 dark:border-gray-700/30 shadow-lg backdrop-blur-xl",
    minimal:
      "bg-gray-50/50 dark:bg-gray-900/30 border-gray-200/30 dark:border-gray-700/30",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200/30 dark:border-gray-700/30 bg-white/30 dark:bg-black/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 ml-4">
            <button
              onClick={() => setIsCodeVisible(!isCodeVisible)}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100/50 dark:bg-gray-800/50 rounded-md hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition-colors"
            >
              {isCodeVisible ? "Hide Code" : "Show Code"}
            </button>

            {showCopyButton && (
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-100/50 dark:bg-blue-900/30 rounded-md hover:bg-blue-200/50 dark:hover:bg-blue-800/40 transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Copied
                  </>
                ) : (
                  <>
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
                      <path d="M3 5a2 2 0 012-2 3 3 0 003 3h6a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L14.586 13H19v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Area */}
      <div className="px-6 py-8 bg-gradient-to-br from-gray-50/50 to-white/30 dark:from-gray-900/30 dark:to-black/20">
        <div className="flex items-center justify-center min-h-[120px]">
          {children}
        </div>
      </div>

      {/* Code Block */}
      {isCodeVisible && (
        <div className="border-t border-gray-200/30 dark:border-gray-700/30">
          <div className="px-6 py-4 bg-gray-900/95 dark:bg-black/80">
            <pre className="text-sm text-gray-100 overflow-x-auto">
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default SnippetPreview;
