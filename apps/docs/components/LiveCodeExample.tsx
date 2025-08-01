"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, ExternalLink } from "lucide-react";

interface LiveCodeExampleProps {
  code: string;
  title?: string;
  description?: string;
  height?: string;
  editable?: boolean;
}

export function LiveCodeExample({
  code: initialCode,
  title,
  description,
  height = "400px",
  editable = true,
}: LiveCodeExampleProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<React.ReactNode>(null);
  const [error, setError] = useState<string | null>(null);

  const executeCode = () => {
    try {
      setError(null);
      // This is a simplified example - in a real implementation,
      // you would use a proper code execution engine like react-live
      setOutput(
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>Live code execution disabled in production build.</p>
          <p className="text-sm mt-2">
            Visit our{" "}
            <a
              href="https://storybook.liquidify.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Storybook
            </a>{" "}
            for interactive examples.
          </p>
        </div>,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setError(null);
    setOutput(null);
  };

  const openInStorybook = () => {
    window.open("https://storybook.liquidify.dev", "_blank");
  };

  useEffect(() => {
    executeCode();
  }, []);

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

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <button
            onClick={executeCode}
            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            <Play className="w-4 h-4 inline mr-1" />
            Run
          </button>
          <button
            onClick={resetCode}
            className="px-3 py-1 bg-gray-600 text-white rounded-md text-sm hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4 inline mr-1" />
            Reset
          </button>
        </div>

        <button
          onClick={openInStorybook}
          className="px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          title="Open in Storybook"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>

      {/* Editor and Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ height }}>
        {/* Code Editor */}
        <div className="border-r border-gray-200 dark:border-gray-700">
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Code
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            readOnly={!editable}
            className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none border-none outline-none"
            style={{ minHeight: "300px" }}
          />
        </div>

        {/* Preview */}
        <div>
          <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Preview
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 h-full flex items-center justify-center">
            {error ? (
              <div className="text-red-600 dark:text-red-400 text-sm">
                Error: {error}
              </div>
            ) : (
              output
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
