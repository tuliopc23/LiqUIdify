/**
 * Responsive Showcase Component
 * 
 * Interactive demonstration of the comprehensive responsive design system
 * built into LiquidiUI components.
 */

import React, { useState } from 'react';
import { 
  useBreakpoint, 
  useResponsiveValue, 
  useResponsiveTypography,
  useResponsiveDensity,
  ResponsiveValue 
} from '@/lib/responsive-system';
import { useTheme } from '@/lib/theming-system';
import { GlassButton } from '@/components/glass-button';
import { GlassInput } from '@/components/glass-input';
import { cn } from '@/lib/glass-utils';
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Palette, 
  Gauge, 
  Eye,
  EyeOff,
  Settings,
  Layers,
  Grid3X3,
  Type,
  Zap
} from 'lucide-react';

interface ResponsiveShowcaseProps {
  className?: string;
}

export function ResponsiveShowcase({ className }: ResponsiveShowcaseProps) {
  const [showBreakpointOverlay, setShowBreakpointOverlay] = useState(false);
  const [demoValues, setDemoValues] = useState({
    text: 'Responsive Demo',
    email: '',
  });

  // Responsive system hooks
  const { 
    currentBreakpoint, 
    windowSize, 
    isMobile, 
    isTablet, 
    isDesktop,
    isBreakpointUp 
  } = useBreakpoint();
  
  const { 
    isTouchOptimized, 
    density, 
    touchTarget, 
    spacing 
  } = useResponsiveDensity();
  
  const { 
    scale, 
    fontSize, 
    lineHeight 
  } = useResponsiveTypography();
  
  const { currentTheme } = useTheme();

  // Responsive values for demonstration
  const responsiveColumns: ResponsiveValue<number> = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
    '2xl': 8
  };

  const responsiveSpacing: ResponsiveValue<string> = {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '2rem'
  };

  const responsiveButtonSize: ResponsiveValue<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = {
    xs: 'sm',
    sm: 'md',
    md: 'md',
    lg: 'lg',
    xl: 'lg'
  };

  const currentColumns = useResponsiveValue(responsiveColumns, 3);
  const currentSpacing = useResponsiveValue(responsiveSpacing, '1rem');
  const currentButtonSize = useResponsiveValue(responsiveButtonSize, 'md');

  // Device type icons
  const getDeviceIcon = () => {
    if (isMobile) return <Smartphone className="w-5 h-5" />;
    if (isTablet) return <Tablet className="w-5 h-5" />;
    return <Monitor className="w-5 h-5" />;
  };

  const getDeviceLabel = () => {
    if (isMobile) return 'Mobile';
    if (isTablet) return 'Tablet';
    return 'Desktop';
  };

  const getDensityColor = () => {
    switch (density) {
      case 'comfortable': return 'text-green-500';
      case 'normal': return 'text-blue-500';
      case 'compact': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={cn("relative space-y-8 p-6", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-responsive-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Responsive Design System
        </h1>
        <p className="text-responsive-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
          Experience how LiquidiUI components automatically adapt to different screen sizes, 
          device types, and user preferences for optimal usability across all devices.
        </p>
      </div>

      {/* Current Breakpoint Info */}
      <div className="glass-effect rounded-xl p-6 border border-[var(--glass-border)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-responsive-xl font-semibold flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            Current State
          </h2>
          <GlassButton
            size="sm"
            variant="secondary"
            onClick={() => setShowBreakpointOverlay(!showBreakpointOverlay)}
            leftIcon={showBreakpointOverlay ? <EyeOff /> : <Eye />}
          >
            {showBreakpointOverlay ? 'Hide' : 'Show'} Overlay
          </GlassButton>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Device Type */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              {getDeviceIcon()}
              Device
            </div>
            <div className="text-lg font-semibold">{getDeviceLabel()}</div>
            <div className="text-xs text-[var(--text-muted)]">
              {windowSize.width} × {windowSize.height}
            </div>
          </div>

          {/* Breakpoint */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <Grid3X3 className="w-4 h-4" />
              Breakpoint
            </div>
            <div className="text-lg font-semibold uppercase">{currentBreakpoint}</div>
            <div className="text-xs text-[var(--text-muted)]">
              Current active breakpoint
            </div>
          </div>

          {/* Density */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <Layers className="w-4 h-4" />
              Density
            </div>
            <div className={cn("text-lg font-semibold capitalize", getDensityColor())}>
              {density}
            </div>
            <div className="text-xs text-[var(--text-muted)]">
              Touch: {touchTarget}px target
            </div>
          </div>

          {/* Typography Scale */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <Type className="w-4 h-4" />
              Scale
            </div>
            <div className="text-lg font-semibold">{scale}×</div>
            <div className="text-xs text-[var(--text-muted)]">
              Font scale factor
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Grid Demo */}
      <div className="space-y-4">
        <h2 className="text-responsive-xl font-semibold flex items-center gap-2">
          <Grid3X3 className="w-5 h-5" />
          Adaptive Grid System
        </h2>
        <p className="text-[var(--text-secondary)]">
          Grid automatically adjusts from {responsiveColumns.xs} column on mobile to {responsiveColumns['2xl']} columns on ultra-wide screens.
          Currently showing {currentColumns} columns.
        </p>
        
        <div 
          className="grid gap-4"
          style={{ 
            gridTemplateColumns: `repeat(${currentColumns}, minmax(0, 1fr))`,
            gap: currentSpacing 
          }}
        >
          {Array.from({ length: Math.min(currentColumns * 2, 12) }, (_, i) => (
            <div
              key={i}
              className="glass-effect rounded-lg p-4 border border-[var(--glass-border)] text-center"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-2" />
              <div className="text-sm font-medium">Item {i + 1}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Components */}
      <div className="space-y-4">
        <h2 className="text-responsive-xl font-semibold flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Responsive Components
        </h2>
        <p className="text-[var(--text-secondary)]">
          Components automatically adapt their size, spacing, and behavior based on the current breakpoint and device capabilities.
        </p>

        <div className="space-y-6">
          {/* Button Showcase */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Adaptive Buttons</h3>
            <div className="flex flex-wrap gap-3">
              <GlassButton 
                variant="primary" 
                adaptiveSize 
                leftIcon={<Zap />}
              >
                Adaptive Size ({currentButtonSize})
              </GlassButton>
              <GlassButton 
                variant="secondary"
                size="md"
                adaptiveSize={false}
              >
                Fixed Size (md)
              </GlassButton>
              <GlassButton 
                variant="tertiary"
                adaptiveSize
                hideOn={['xs']}
                leftIcon={<Monitor />}
              >
                Hidden on Mobile
              </GlassButton>
              <GlassButton 
                variant="ghost"
                adaptiveSize
                showOn={['xs', 'sm']}
                leftIcon={<Smartphone />}
              >
                Mobile Only
              </GlassButton>
            </div>
          </div>

          {/* Input Showcase */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Responsive Inputs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <GlassInput
                placeholder="Adaptive size input"
                value={demoValues.text}
                onChange={(e) => setDemoValues(prev => ({ ...prev, text: e.target.value }))}
                adaptiveSize
                clearable
                helperText={`Current size: ${currentButtonSize}`}
              />
              <GlassInput
                inputVariant="email"
                placeholder="Email with touch optimization"
                value={demoValues.email}
                onChange={(e) => setDemoValues(prev => ({ ...prev, email: e.target.value }))}
                adaptiveSize
                helperText={isTouchOptimized ? "Touch optimized" : "Desktop optimized"}
              />
            </div>
          </div>

          {/* Typography Showcase */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Responsive Typography</h3>
            <div className="space-y-2">
              <div className="text-responsive-3xl font-bold">
                Heading scales to {fontSize['3xl']}
              </div>
              <div className="text-responsive-lg">
                Body text scales to {fontSize.lg}
              </div>
              <div className="text-responsive-sm text-[var(--text-secondary)]">
                Caption text scales to {fontSize.sm}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Features */}
      <div className="space-y-4">
        <h2 className="text-responsive-xl font-semibold flex items-center gap-2">
          <Palette className="w-5 h-5" />
          System Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Breakpoint Detection */}
          <div className="glass-effect rounded-lg p-4 border border-[var(--glass-border)]">
            <h4 className="font-medium mb-2">Breakpoint Detection</h4>
            <div className="space-y-1 text-sm">
              <div className={cn("flex justify-between", currentBreakpoint === 'xs' && "font-bold text-blue-500")}>
                <span>Extra Small (xs)</span>
                <span>{currentBreakpoint === 'xs' ? '✓' : ''}</span>
              </div>
              <div className={cn("flex justify-between", currentBreakpoint === 'sm' && "font-bold text-blue-500")}>
                <span>Small (sm)</span>
                <span>{currentBreakpoint === 'sm' ? '✓' : ''}</span>
              </div>
              <div className={cn("flex justify-between", currentBreakpoint === 'md' && "font-bold text-blue-500")}>
                <span>Medium (md)</span>
                <span>{currentBreakpoint === 'md' ? '✓' : ''}</span>
              </div>
              <div className={cn("flex justify-between", currentBreakpoint === 'lg' && "font-bold text-blue-500")}>
                <span>Large (lg)</span>
                <span>{currentBreakpoint === 'lg' ? '✓' : ''}</span>
              </div>
              <div className={cn("flex justify-between", currentBreakpoint === 'xl' && "font-bold text-blue-500")}>
                <span>Extra Large (xl)</span>
                <span>{currentBreakpoint === 'xl' ? '✓' : ''}</span>
              </div>
              <div className={cn("flex justify-between", currentBreakpoint === '2xl' && "font-bold text-blue-500")}>
                <span>2X Large (2xl)</span>
                <span>{currentBreakpoint === '2xl' ? '✓' : ''}</span>
              </div>
            </div>
          </div>

          {/* Touch Optimization */}
          <div className="glass-effect rounded-lg p-4 border border-[var(--glass-border)]">
            <h4 className="font-medium mb-2">Touch Optimization</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Touch Optimized</span>
                <span className={isTouchOptimized ? "text-green-500" : "text-gray-500"}>
                  {isTouchOptimized ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Min Touch Target</span>
                <span>{touchTarget}px</span>
              </div>
              <div className="flex justify-between">
                <span>Spacing</span>
                <span>{spacing.md}px</span>
              </div>
            </div>
          </div>

          {/* Responsive Values */}
          <div className="glass-effect rounded-lg p-4 border border-[var(--glass-border)]">
            <h4 className="font-medium mb-2">Dynamic Values</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Grid Columns</span>
                <span>{currentColumns}</span>
              </div>
              <div className="flex justify-between">
                <span>Spacing</span>
                <span>{currentSpacing}</span>
              </div>
              <div className="flex justify-between">
                <span>Font Scale</span>
                <span>{scale}×</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breakpoint Overlay */}
      {showBreakpointOverlay && (
        <div className="fixed top-4 right-4 z-50">
          <div className="glass-effect rounded-lg p-3 border border-[var(--glass-border)] shadow-lg">
            <div className="flex items-center gap-2 text-sm font-medium">
              {getDeviceIcon()}
              <span className="uppercase font-bold">{currentBreakpoint}</span>
              <span className="text-[var(--text-muted)]">
                {windowSize.width}×{windowSize.height}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsiveShowcase;