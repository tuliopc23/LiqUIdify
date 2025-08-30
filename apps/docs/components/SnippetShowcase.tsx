import React from 'react';
import SnippetPreview from './SnippetPreview';

// Enhanced wrapper for existing snippet components with Apple design
export function SnippetShowcase({ snippetComponent, title, description, category }) {
  return (
    <div className="mb-8">
      {/* Category Header */}
      {category && (
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            {category}
          </span>
        </div>
      )}
      
      {/* Snippet Component */}
      <div className="relative">
        {snippetComponent}
      </div>
      
      {/* Optional description */}
      {description && (
        <div className="mt-4 p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg border border-blue-200/30 dark:border-blue-800/30">
          <p className="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}

// Gallery component for organizing multiple snippets
export function SnippetGallery({ children, title, description }) {
  return (
    <div className="space-y-8">
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// Quick access component for common snippets
export function QuickSnippets() {
  const quickExamples = [
    {
      title: "Install Liquidify",
      description: "Get started with Liquidify in your project",
      code: "npm install @liquidify/react",
      language: "bash"
    },
    {
      title: "Basic Import",
      description: "Import and use your first component",
      code: `import { GlassButton } from '@liquidify/react';

function App() {
  return (
    <GlassButton>
      Hello World
    </GlassButton>
  );
}`,
      language: "tsx"
    },
    {
      title: "Theme Setup",
      description: "Configure the Liquidify theme provider",
      code: `import { GlassUIProvider } from '@liquidify/react';

function App() {
  return (
    <GlassUIProvider>
      <YourApp />
    </GlassUIProvider>
  );
}`,
      language: "tsx"
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quickExamples.map((example, index) => (
        <div
          key={index}
          className="bg-white/80 dark:bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-gray-200/30 dark:border-gray-700/30 shadow-lg"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            {example.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {example.description}
          </p>
          <div className="bg-gray-900 rounded-lg p-3 overflow-x-auto">
            <pre className="text-sm text-gray-100">
              <code className={`language-${example.language}`}>
                {example.code}
              </code>
            </pre>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SnippetShowcase;
