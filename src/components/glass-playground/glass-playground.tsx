/**
 * S-tier Interactive Component Playground
 * Live editing and preview system for LiqUIdify components
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createComponentSize } from '@/types/branded';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import { themes } from 'prism-react-renderer';
import { Check, Code, Copy, Download, Eye, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/glass-utils';
import * as LiquidComponents from '@/components';
import { GlassButton } from '../glass-button';
import { GlassTabs } from '../glass-tabs';
import { useSSRSafeWindow } from '@/hooks/use-ssr-safe';

export interface PlaygroundProps {
  code: string;
  scope?: Record<string, any>;
  title?: string;
  description?: string;
  showEditor?: boolean;
  showPreview?: boolean;
  editable?: boolean;
  className?: string;
  height?: string | number;
  theme?: 'light' | 'dark';
  autoRun?: boolean;
}

export function GlassPlayground({
                                  code: initialCode,
                                  scope = {},
                                  title,
                                  description,
                                  showEditor = true,
                                  showPreview = true,
                                  editable = true,
                                  className,
                                  height = 400,
                                  theme = 'light',
                                  autoRun = true,
                                }: PlaygroundProps) {
  const [code, setCode] = useState(initialCode);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTab] = useState<'preview' | 'code'>('preview');
  const window = useSSRSafeWindow(w => w, null);

  // Combine default scope with provided scope
  const playgroundScope = useMemo(
    () => ({
      ...LiquidComponents,
      React,
      useState,
      useCallback,
      useEffect,
      ...scope,
    }),
    [scope],
  );

  // Copy code to clipboard
  const handleCopy = useCallback(async () => {
    if (window?.navigator?.clipboard) {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  }, [code, window]);

  // Download code as file
  const handleDownload = useCallback(() => {
    if (window) {
      const blob = new Blob([code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title?.toLowerCase().replace(/\s+/g, '-') || 'component'}.tsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [code, title, window]);

  // Toggle fullscreen
  const handleFullscreen = useCallback(() => {
    setFullscreen(prev => !prev);
  }, []);

  // Get appropriate theme
  const editorTheme = theme === 'dark' ? themes.nightOwl : themes.github;

  return (
    <div
      className={cn(
        'glass-effect rounded-xl overflow-hidden',
        fullscreen && 'fixed inset-4 z-50',
        className,
      )}
    >
      {/* Header */}
      <div className="glass-header border-b border-white/10 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-primary">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-secondary mt-1">{description}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <GlassButton
              variant="ghost"
              size={createComponentSize('sm')}
              onClick={handleCopy}
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </GlassButton>

            <GlassButton
              variant="ghost"
              size={createComponentSize('sm')}
              onClick={handleDownload}
              aria-label="Download code"
            >
              <Download className="h-4 w-4" />
            </GlassButton>

            <GlassButton
              variant="ghost"
              size={createComponentSize('sm')}
              onClick={handleFullscreen}
              aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              <Maximize2 className="h-4 w-4" />
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Content */}
      <div
        className="relative"
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
      >
        <LiveProvider
          code={code}
          scope={playgroundScope}
          theme={editorTheme}
          noInline={!autoRun}
        >
          {showEditor && showPreview ? (
            <GlassTabs
              tabs={[
                {
                  id: 'preview',
                  label: (
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </div>
                  ),
                  content: <PlaygroundPreview />,
                },
                {
                  id: 'code',
                  label: (
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Code
                    </div>
                  ),
                  content: (
                    <PlaygroundEditor
                      editable={editable}
                      onChange={setCode}
                      className="h-full"
                    />
                  ),
                },
              ]}
              defaultTab={activeTab}
              className="h-full"
              tabListClassName="px-4 pt-2"
              tabPanelClassName="h-full"
            />
          ) : (
            <div className="h-full flex">
              {showEditor && (
                <div
                  className={cn(
                    'flex-1',
                    showPreview && 'border-r border-white/10',
                  )}
                >
                  <PlaygroundEditor
                    editable={editable}
                    onChange={setCode}
                    className="h-full"
                  />
                </div>
              )}

              {showPreview && (
                <div className="flex-1 p-6">
                  <PlaygroundPreview />
                </div>
              )}
            </div>
          )}

          {/* Error display */}
          <PlaygroundError />
        </LiveProvider>
      </div>
    </div>
  );
}

// Playground Editor Component
interface PlaygroundEditorProps {
  editable?: boolean;
  onChange?: (code: string) => void;
  className?: string;
}

function PlaygroundEditor({
                            editable = true,
                            onChange,
                            className,
                          }: PlaygroundEditorProps) {
  return (
    <div className={cn('relative h-full', className)}>
      <LiveEditor
        className="playground-editor h-full overflow-auto p-4 text-sm font-mono"
        disabled={!editable}
        onChange={onChange}
        style={{
          fontFamily:
            'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
      />

      {!editable && (
        <div className="absolute top-2 right-2 text-xs text-secondary bg-glass px-2 py-1 rounded">
          Read-only
        </div>
      )}
    </div>
  );
}

// Playground Preview Component
function PlaygroundPreview() {
  return (
    <div className="playground-preview h-full flex items-center justify-center">
      <LivePreview
        Component={({ children, ...props }: any) => (
          <div className="w-full max-w-2xl mx-auto" {...props}>
            {children}
          </div>
        )}
      />
    </div>
  );
}

// Playground Error Component
function PlaygroundError() {
  return (
    <LiveError
      className="absolute bottom-0 left-0 right-0 bg-red-500/10 backdrop-blur-md p-4 text-sm text-red-600 font-mono border-t border-red-500/20" />
  );
}

// Styles for the playground
const playgroundStyles = `
  .playground-editor {
    background: transparent !important;
  }

  .playground-editor textarea {
    outline: none !important;
  }

  .playground-preview {
    background-image:
      repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255, 255, 255, 0.03) 10px,
        rgba(255, 255, 255, 0.03) 20px
      );
  }

  .prism-code {
    background: transparent !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleId = 'glass-playground-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = playgroundStyles;
    document.head.appendChild(style);
  }
}

// Export example templates
export const PlaygroundTemplates = {
  button: `
<div className="flex gap-4 items-center">
  <GlassButton variant="primary">
    Primary Button
  </GlassButton>

  <GlassButton variant="secondary">
    Secondary Button
  </GlassButton>

  <GlassButton variant="ghost">
    Ghost Button
  </GlassButton>
</div>
`,

  card: `
<GlassCard className="max-w-md">
  <GlassCardHeader>
    <GlassCardTitle>Interactive Card</GlassCardTitle>
    <GlassCardDescription>
      Edit this code to see changes in real-time
    </GlassCardDescription>
  </GlassCardHeader>

  <GlassCardContent>
    <p>This is an interactive playground where you can experiment with LiqUIdify components.</p>
  </GlassCardContent>

  <GlassCardFooter>
    <GlassButton variant="primary">Action</GlassButton>
  </GlassCardFooter>
</GlassCard>
`,

  form: `
function FormExample() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <GlassInput
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <GlassButton type="submit" variant="primary" className="w-full">
        Submit
      </GlassButton>

      {submitted && (
        <GlassAlert variant="success">
          Form submitted successfully!
        </GlassAlert>
      )}
    </form>
  );
}

render(<FormExample />);
`,
};
