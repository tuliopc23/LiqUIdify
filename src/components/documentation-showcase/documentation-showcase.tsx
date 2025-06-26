/**
 * Professional Documentation Showcase
 * 
 * Interactive documentation system with design guidelines, 
 * component examples, and best practices for LiquidiUI.
 */

import React, { useState } from 'react';
import { cn } from '@/lib/glass-utils';
import { GlassButton } from '@/components/glass-button';
import { GlassInput } from '@/components/glass-input';
import { GlassCard } from '@/components/glass-card';
import { GlassBadge } from '@/components/glass-badge';
import { useTheme } from '@/lib/theming-system';
import { useBreakpoint } from '@/lib/responsive-system';
import { 
  Book, 
  Palette, 
  Code, 
  Layers, 
  Zap, 
  Heart, 
  Star, 
  Shield,
  Smartphone,
  Monitor,
  Tablet,
  Eye,
  Accessibility,
  Settings,
  Sparkles,
  Play,
  Download,
  Copy,
  CheckCircle,
       Mail
     } from 'lucide-react';

interface DocumentationShowcaseProps {
  className?: string;
}

export function DocumentationShowcase({ className }: DocumentationShowcaseProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { currentTheme, toggleMode } = useTheme();
  const { currentBreakpoint, isMobile, isTablet, isDesktop } = useBreakpoint();

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      console.warn('Failed to copy code:', error);
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'design-system', label: 'Design System', icon: Palette },
    { id: 'components', label: 'Components', icon: Layers },
    { id: 'theming', label: 'Theming', icon: Settings },
    { id: 'responsive', label: 'Responsive', icon: Smartphone },
    { id: 'animations', label: 'Animations', icon: Zap },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'best-practices', label: 'Best Practices', icon: Star },
  ];

  const codeExamples = {
    basicButton: `import { GlassButton } from 'liquidui';

<GlassButton variant="primary" size="md">
  Click me
</GlassButton>`,
    
    responsiveButton: `<GlassButton 
  variant="primary"
  adaptiveSize
  hideOn={['xs']}
  leftIcon={<Star />}
>
  Responsive Button
</GlassButton>`,

    themedComponent: `import { useTheme, GlassCard } from 'liquidui';

function ThemedCard() {
  const { currentTheme, toggleMode } = useTheme();
  
  return (
    <GlassCard variant="elevated">
      <p>Current theme: {currentTheme.name}</p>
      <GlassButton onClick={toggleMode}>
        Toggle Theme
      </GlassButton>
    </GlassCard>
  );
}`,

    animatedInput: `<GlassInput
  placeholder="Enter your email"
  inputVariant="email"
  adaptiveSize
  clearable
  status="success"
  helperText="Email looks good!"
  leftIcon={<Mail />}
/>`
  };

  const renderCodeBlock = (code: string, id: string) => (
    <div className="relative glass-effect rounded-lg border border-[var(--glass-border)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--glass-border)] bg-[var(--glass-bg-secondary)]">
        <span className="text-sm font-medium text-[var(--text-secondary)]">Code Example</span>
        <GlassButton
          size="xs"
          variant="ghost"
          onClick={() => copyToClipboard(code, id)}
          leftIcon={copiedCode === id ? <CheckCircle className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        >
          {copiedCode === id ? 'Copied!' : 'Copy'}
        </GlassButton>
      </div>
      <pre className="p-4 text-sm text-[var(--text-primary)] overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const renderOverviewSection = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 glass-effect rounded-2xl flex items-center justify-center border border-[var(--glass-border)]">
              <Sparkles className="w-12 h-12 text-blue-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
          LiquidiUI
        </h1>
        
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto">
          A professional-grade React component library featuring advanced glassmorphism effects,
          responsive design, and comprehensive accessibility support.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <GlassBadge variant="success">✨ Professional Grade</GlassBadge>
          <GlassBadge variant="default">🎨 Glassmorphism</GlassBadge>
          <GlassBadge variant="default">📱 Responsive</GlassBadge>
          <GlassBadge variant="default">♿ Accessible</GlassBadge>
          <GlassBadge variant="default">⚡ Performant</GlassBadge>
        </div>
      </div>

      {/* Quick Start */}
      <GlassCard padding="lg" className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Play className="w-6 h-6 text-blue-500" />
          Quick Start
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Installation</h3>
            {renderCodeBlock('npm install liquidui', 'install')}
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            {renderCodeBlock(codeExamples.basicButton, 'basic')}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Live Example</h3>
          <div className="p-6 glass-effect rounded-lg border border-[var(--glass-border)]">
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary" leftIcon={<Heart />}>
                Primary Button
              </GlassButton>
              <GlassButton variant="secondary">
                Secondary
              </GlassButton>
              <GlassButton variant="ghost" rightIcon={<Download />}>
                Download
              </GlassButton>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: Layers,
            title: "Rich Component Library",
            description: "30+ professional components with consistent APIs and advanced features"
          },
          {
            icon: Palette,
            title: "Advanced Theming",
            description: "Design tokens, CSS variables, and dynamic theme switching"
          },
          {
            icon: Smartphone,
            title: "Responsive Design",
            description: "Adaptive components that work seamlessly across all devices"
          },
          {
            icon: Zap,
            title: "Spring Animations",
            description: "Physics-based animations with micro-interactions and performance optimization"
          },
          {
            icon: Accessibility,
            title: "Accessibility First",
            description: "WCAG 2.1 AA compliant with screen reader and keyboard navigation support"
          },
          {
            icon: Shield,
            title: "Production Ready",
            description: "TypeScript support, comprehensive testing, and enterprise-grade reliability"
          }
        ].map((feature, index) => (
          <GlassCard key={index} padding="md" hover className="text-center space-y-4">
            <div className="w-12 h-12 mx-auto glass-effect rounded-xl flex items-center justify-center border border-[var(--glass-border)]">
              <feature.icon className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-[var(--text-secondary)]">{feature.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );

  const renderDesignSystemSection = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Design System</h2>
        <p className="text-lg text-[var(--text-secondary)]">
          LiquidiUI follows a comprehensive design system with consistent patterns, 
          spacing, and visual hierarchy across all components.
        </p>
      </div>

      {/* Color Palette */}
      <GlassCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold">Color Palette</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Primary Colors</h4>
            <div className="flex flex-wrap gap-2">
              {['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'].map(shade => (
                <div key={shade} className="text-center">
                  <div 
                    className={`w-12 h-12 rounded-lg border border-[var(--glass-border)]`}
                    style={{ backgroundColor: `hsl(217, 91%, ${100 - parseInt(shade) / 10}%)` }}
                  />
                  <span className="text-xs text-[var(--text-secondary)] mt-1 block">{shade}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Glass Colors</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Primary', bg: 'rgba(255, 255, 255, 0.12)' },
                { name: 'Secondary', bg: 'rgba(248, 250, 252, 0.15)' },
                { name: 'Elevated', bg: 'rgba(255, 255, 255, 0.25)' },
                { name: 'Floating', bg: 'rgba(255, 255, 255, 0.20)' },
              ].map(color => (
                <div key={color.name} className="text-center">
                  <div 
                    className="w-full h-16 rounded-lg border border-[var(--glass-border)] backdrop-blur-md"
                    style={{ backgroundColor: color.bg }}
                  />
                  <span className="text-sm mt-2 block">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Typography */}
      <GlassCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold">Typography Scale</h3>
        <div className="space-y-4">
          {[
            { size: 'text-xs', label: 'XS - 12px', sample: 'The quick brown fox jumps over the lazy dog' },
            { size: 'text-sm', label: 'SM - 14px', sample: 'The quick brown fox jumps over the lazy dog' },
            { size: 'text-base', label: 'Base - 16px', sample: 'The quick brown fox jumps over the lazy dog' },
            { size: 'text-lg', label: 'LG - 18px', sample: 'The quick brown fox jumps over the lazy dog' },
            { size: 'text-xl', label: 'XL - 20px', sample: 'The quick brown fox jumps over the lazy dog' },
            { size: 'text-2xl', label: '2XL - 24px', sample: 'The quick brown fox jumps over the lazy dog' },
          ].map(({ size, label, sample }) => (
            <div key={size} className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-secondary)] w-20 shrink-0">{label}</span>
              <span className={cn(size, "text-[var(--text-primary)]")}>{sample}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Spacing Scale */}
      <GlassCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold">Spacing Scale</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map(space => (
            <div key={space} className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-secondary)] w-16">{space * 4}px</span>
              <div 
                className="bg-blue-500 h-4 rounded"
                style={{ width: `${space * 4}px` }}
              />
              <span className="text-sm text-[var(--text-secondary)]">spacing-{space}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );

  const renderComponentsSection = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Components</h2>
        <p className="text-lg text-[var(--text-secondary)]">
          Comprehensive component library with consistent APIs and advanced features.
        </p>
      </div>

      {/* Button Examples */}
      <GlassCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold">Buttons</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Variants</h4>
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary">Primary</GlassButton>
              <GlassButton variant="secondary">Secondary</GlassButton>
              <GlassButton variant="tertiary">Tertiary</GlassButton>
              <GlassButton variant="ghost">Ghost</GlassButton>
              <GlassButton variant="success">Success</GlassButton>
              <GlassButton variant="warning">Warning</GlassButton>
              <GlassButton variant="destructive">Destructive</GlassButton>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Sizes</h4>
            <div className="flex flex-wrap items-center gap-4">
              <GlassButton size="xs">Extra Small</GlassButton>
              <GlassButton size="sm">Small</GlassButton>
              <GlassButton size="md">Medium</GlassButton>
              <GlassButton size="lg">Large</GlassButton>
              <GlassButton size="xl">Extra Large</GlassButton>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">With Icons</h4>
            <div className="flex flex-wrap gap-4">
              <GlassButton leftIcon={<Heart />}>Like</GlassButton>
              <GlassButton rightIcon={<Download />}>Download</GlassButton>
              <GlassButton leftIcon={<Star />} rightIcon={<Heart />}>Both Icons</GlassButton>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">States</h4>
            <div className="flex flex-wrap gap-4">
              <GlassButton loading loadingText="Saving...">Save Changes</GlassButton>
              <GlassButton disabled>Disabled</GlassButton>
            </div>
          </div>
        </div>

        {renderCodeBlock(codeExamples.responsiveButton, 'responsive-button')}
      </GlassCard>

      {/* Input Examples */}
      <GlassCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold">Inputs</h3>
        
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <GlassInput placeholder="Default input" />
            <GlassInput 
              placeholder="Search..." 
              inputVariant="search" 
              clearable 
            />
            <GlassInput 
              placeholder="Enter email" 
              inputVariant="email"
              helperText="We'll never share your email"
            />
            <GlassInput 
              placeholder="Password" 
              inputVariant="password"
            />
            <GlassInput 
              placeholder="Success state" 
              status="success"
              helperText="Looks good!"
            />
            <GlassInput 
              placeholder="Error state" 
              status="error"
              errorMessage="This field is required"
            />
          </div>
        </div>

        {renderCodeBlock(codeExamples.animatedInput, 'animated-input')}
      </GlassCard>

      {/* Card Examples */}
      <GlassCard padding="lg" className="space-y-6">
        <h3 className="text-xl font-semibold">Cards</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <GlassCard variant="default" padding="md">
            <h4 className="font-semibold mb-2">Default Card</h4>
            <p className="text-[var(--text-secondary)]">Basic glass card with subtle background.</p>
          </GlassCard>
          
          <GlassCard variant="elevated" padding="md">
            <h4 className="font-semibold mb-2">Elevated Card</h4>
            <p className="text-[var(--text-secondary)]">Enhanced glass effect with more prominence.</p>
          </GlassCard>
          
          <GlassCard variant="outlined" padding="md">
            <h4 className="font-semibold mb-2">Outlined Card</h4>
            <p className="text-[var(--text-secondary)]">Transparent with border emphasis.</p>
          </GlassCard>
        </div>
      </GlassCard>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverviewSection();
      case 'design-system':
        return renderDesignSystemSection();
      case 'components':
        return renderComponentsSection();
      case 'theming':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Theming System</h2>
            <GlassCard padding="lg">
              <div className="space-y-6">
                <p className="text-lg text-[var(--text-secondary)]">
                  Advanced theming with design tokens, CSS variables, and dynamic theme switching.
                </p>
                
                <div className="flex items-center gap-4">
                  <span>Current theme: {currentTheme.name}</span>
                  <GlassButton onClick={toggleMode}>
                    Toggle Theme
                  </GlassButton>
                </div>

                {renderCodeBlock(codeExamples.themedComponent, 'themed-component')}
              </div>
            </GlassCard>
          </div>
        );
      case 'responsive':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Responsive Design</h2>
            <GlassCard padding="lg">
              <div className="space-y-6">
                <p className="text-lg text-[var(--text-secondary)]">
                  Components automatically adapt to different screen sizes and device capabilities.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 glass-effect rounded-xl flex items-center justify-center">
                      {isMobile ? <Smartphone className="w-6 h-6" /> : 
                       isTablet ? <Tablet className="w-6 h-6" /> : 
                       <Monitor className="w-6 h-6" />}
                    </div>
                    <p>Current: {currentBreakpoint.toUpperCase()}</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 glass-effect rounded-xl flex items-center justify-center">
                      <Eye className="w-6 h-6" />
                    </div>
                    <p>Device: {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}</p>
                  </div>
                  
                  <div className="text-center">
                    <GlassButton adaptiveSize>
                      Adaptive Button
                    </GlassButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        );
      default:
        return renderOverviewSection();
    }
  };

  return (
    <div className={cn("min-h-screen", className)}>
      {/* Header */}
      <div className="sticky top-0 z-50 glass-effect border-b border-[var(--glass-border)] backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 glass-effect rounded-lg flex items-center justify-center border border-[var(--glass-border)]">
                <Sparkles className="w-4 h-4 text-blue-500" />
              </div>
              <span className="text-xl font-bold">LiquidiUI Docs</span>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--text-secondary)]">
                Theme: {currentTheme.name}
              </span>
              <GlassButton variant="ghost" size="sm" onClick={toggleMode}>
                Toggle Theme
              </GlassButton>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 h-screen sticky top-16 glass-effect border-r border-[var(--glass-border)] p-6">
          <nav className="space-y-2">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all",
                  activeSection === id 
                    ? "glass-effect text-[var(--text-primary)] border border-[var(--glass-border)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:glass-effect"
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentationShowcase;