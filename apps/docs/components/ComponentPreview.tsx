"use client";

import React, { useState, useEffect } from "react";
import { Copy, Eye, Code, ExternalLink } from "lucide-react";

interface ComponentPreviewProps {
  children: React.ReactNode;
  code: string;
  title?: string;
  description?: string;
  showCode?: boolean;
  height?: string;
}

export function ComponentPreview({
  children,
  code,
  title,
  description,
  showCode = true,
  height = "auto",
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const openInStorybook = () => {
    window.open("https://storybook.liquidify.dev", "_blank");
  };

  return (
    <div className="not-prose border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden my-6">
      {/* Header */}
      {(title || description) && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {title && (
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      {showCode && (
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === "preview"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              Preview
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                activeTab === "code"
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Code className="w-4 h-4 inline mr-1" />
              Code
            </button>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={openInStorybook}
              className="px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              title="Open in Storybook"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ height }}>
        {activeTab === "preview" ? (
          <div className="p-6 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-center">{children}</div>
          </div>
        ) : (
          <div className="relative">
            <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-x-auto">
              <code>{code}</code>
            </pre>
            {copied && (
              <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                Copied!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
