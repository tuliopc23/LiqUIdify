import React from 'react';
import { cn } from '@/core/utils/classname';
import { AppleLiquidGlassCard } from '@/components/apple-liquid-glass';
import { LiquidGlassSvgFilters } from '@/components/liquid-glass-svg-filters';

// Enhanced Props Table Component
export const PropsTable = ({
  data,
  title = 'Component Props',
}: {
  data: Array<{
    name: string;
    type: string;
    default?: string;
    required?: boolean;
    description: string;
  }>;
  title?: string;
}) => {
  return (
    <>
      <LiquidGlassSvgFilters />
      <AppleLiquidGlassCard
        intensity="medium"
        magnetic={true}
        animated={true}
        className="my-6"
      >
        <h3 className="text-lg font-semibold mb-4 text-white">{title}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/15">
                <th className="text-left py-2 px-3 font-medium text-white">
                  Name
                </th>
                <th className="text-left py-2 px-3 font-medium text-white">
                  Type
                </th>
                <th className="text-left py-2 px-3 font-medium text-white">
                  Default
                </th>
                <th className="text-left py-2 px-3 font-medium text-white">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((prop) => (
                <tr
                  key={prop.name}
                  className="border-b border-white/8 last:border-b-0"
                >
                  <td className="py-3 px-3">
                    <code className="text-sm bg-white/25 px-2 py-1 rounded font-mono text-white">
                      {prop.name}
                      {prop.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </code>
                  </td>
                  <td className="py-3 px-3">
                    <code className="text-sm text-blue-300 font-mono">
                      {prop.type}
                    </code>
                  </td>
                  <td className="py-3 px-3">
                    {prop.default ? (
                      <code className="text-sm bg-white/20 px-2 py-1 rounded font-mono text-white">
                        {prop.default}
                      </code>
                    ) : (
                      <span className="text-white/60">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-white/80">
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AppleLiquidGlassCard>
    </>
  );
};

// Code Block Component
export const CodeBlock = ({
  code,
  language = 'tsx',
  title,
}: {
  code: string;
  language?: string;
  title?: string;
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <AppleLiquidGlassCard
      intensity="strong"
      magnetic={true}
      animated={false}
      className="overflow-hidden my-6"
    >
      {title && (
        <div className="px-4 py-2 bg-white/25 border-b border-white/15 mb-4">
          <h4 className="text-sm font-medium text-white">{title}</h4>
        </div>
      )}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm bg-black/20 rounded-lg">
          <code className={`language-${language} text-white`}>{code}</code>
        </pre>
        <button
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/18"
          title="Copy code"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
        </button>
      </div>
    </AppleLiquidGlassCard>
  );
};

// Usage Examples Component
export const UsageExample = ({
  title,
  description,
  example,
  code,
}: {
  title: string;
  description?: string;
  example: React.ReactNode;
  code: string;
}) => {
  return (
    <div className="my-8">
      <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
      {description && <p className="text-white/70 mb-4">{description}</p>}

      {/* Live Example */}
      <AppleLiquidGlassCard
        intensity="subtle"
        magnetic={true}
        animated={true}
        className="mb-4"
      >
        <div className="flex items-center justify-center min-h-[120px]">
          {example}
        </div>
      </AppleLiquidGlassCard>

      {/* Code */}
      <CodeBlock code={code} title="Code" />
    </div>
  );
};

// Feature Badge Component
export const FeatureBadge = ({
  type,
  children,
}: {
  type: 'new' | 'updated' | 'experimental' | 'deprecated';
  children: React.ReactNode;
}) => {
  const styles = {
    new: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    updated: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    experimental:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    deprecated: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        styles[type]
      )}
    >
      {children}
    </span>
  );
};

// Design System Colors Component
export const ColorPalette = ({
  colors,
}: {
  colors: Array<{
    name: string;
    value: string;
    description?: string;
  }>;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
      {colors.map((color) => (
        <div
          key={color.name}
          className="liquid-glass rounded-lg p-4 border border-white/15"
        >
          <div
            className="w-full h-16 rounded-md mb-3 border border-white/8"
            style={{ backgroundColor: color.value }}
          />
          <div className="text-sm">
            <div className="font-medium text-gray-900 dark:text-white">
              {color.name}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
              {color.value}
            </div>
            {color.description && (
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">
                {color.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// Accessibility Guidelines Component
export const AccessibilityGuidelines = ({
  guidelines,
}: {
  guidelines: Array<{
    title: string;
    description: string;
    level: 'A' | 'AA' | 'AAA';
  }>;
}) => {
  const levelColors = {
    A: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    AA: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    AAA: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  };

  return (
    <div className="liquid-glass rounded-xl p-6 my-6 border border-white/15">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Accessibility Guidelines
      </h3>
      <div className="space-y-4">
        {guidelines.map((guideline, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium text-gray-900 dark:text-white">
                {guideline.title}
              </h4>
              <span
                className={cn(
                  'px-2 py-1 rounded text-xs font-medium',
                  levelColors[guideline.level]
                )}
              >
                WCAG {guideline.level}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {guideline.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component Status Component
export const ComponentStatus = ({
  status,
}: {
  status: 'stable' | 'beta' | 'alpha' | 'deprecated';
}) => {
  const statusConfig = {
    stable: {
      color:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      icon: '✅',
      description: 'Ready for production use',
    },
    beta: {
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      icon: '🧪',
      description: 'Feature complete, may have minor changes',
    },
    alpha: {
      color:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      icon: '⚠️',
      description: 'Under development, breaking changes possible',
    },
    deprecated: {
      color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      icon: '🚫',
      description: 'Will be removed in future versions',
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium mb-4',
        config.color
      )}
    >
      <span>{config.icon}</span>
      <span>Status: {status.charAt(0).toUpperCase() + status.slice(1)}</span>
      <span className="text-xs opacity-75">— {config.description}</span>
    </div>
  );
};
