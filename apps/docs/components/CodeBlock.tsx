interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlight?: number[];
  fileName?: string;
}

export function CodeBlock({
  children,
  language = "tsx",
  title,
  showLineNumbers = false,
  highlight = [],
  fileName,
}: CodeBlockProps) {
  const lines = children.trim().split("\n");

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900 shadow-2xl">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          {(title || fileName) && (
            <span className="ml-3 text-sm text-gray-300 font-medium">{title || fileName}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">{language}</span>
        </div>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto">
        <pre className="text-sm leading-6">
          <code className={`language-${language} block`}>
            {lines.map((line, index) => (
              <div
                key={index}
                className={`${
                  highlight.includes(index + 1) ? "bg-blue-500/10 border-l-2 border-blue-400" : ""
                } ${showLineNumbers ? "pl-12" : "px-4"} py-0.5 relative`}
              >
                {showLineNumbers && (
                  <span className="absolute left-0 w-8 text-right text-gray-500 text-xs select-none">
                    {index + 1}
                  </span>
                )}
                <span className="text-gray-100">{line}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeBlock;
