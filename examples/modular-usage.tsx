/**
 * Glass UI - Modular Import Examples
 * 
 * This file demonstrates how to use the new modular import system
 * for optimal bundle sizes
 */

// Example 1: Import only core components (smallest bundle)
import { GlassButton, GlassCard, ThemeProvider } from '@glass-ui/core';

// Example 2: Import with dynamic loading for animations
import { loadAnimations } from 'glass-ui';

// Lazy load animations when needed
async function setupAnimations() {
  const animations = await loadAnimations();
  const { GlassLoading, useGlassAnimations } = animations;
  
  // Now you can use animation components
  return { GlassLoading, useGlassAnimations };
}

// Example 3: Tree-shakeable imports for specific components
import { GlassButton } from 'glass-ui/core';
import { GlassModal } from 'glass-ui/advanced';
import { GlassTooltip } from 'glass-ui/feedback';

// Example 4: Code-splitting with React.lazy
import React, { lazy, Suspense } from 'react';

const LazyGlassChart = lazy(() => 
  import('glass-ui/advanced').then(module => ({ 
    default: module.GlassChart 
  }))
);

export function App() {
  return (
    <ThemeProvider>
      {/* Core components are always available */}
      <GlassCard>
        <h1>Optimized Glass UI App</h1>
        <GlassButton>Click me</GlassButton>
      </GlassCard>
      
      {/* Lazy-loaded components */}
      <Suspense fallback={<div>Loading chart...</div>}>
        <LazyGlassChart data={[]} />
      </Suspense>
    </ThemeProvider>
  );
}

// Example 5: Conditional loading based on features
import { FEATURES, autoLoadBundles } from 'glass-ui';

// Enable features you need
FEATURES.animations = true;
FEATURES.accessibility = true;

// Auto-load enabled bundles
autoLoadBundles().then(() => {
  console.log('Glass UI bundles loaded');
});

// Example 6: Import specific utilities
import { cn } from '@glass-ui/core';
import { ANIMATION_PRESETS } from '@glass-ui/animations';

// Example 7: Server-side rendering safe imports
export async function getServerSideProps() {
  // Only import what's needed for SSR
  const { GlassButton, GlassCard } = await import('@glass-ui/core');
  
  // Skip client-only features
  return {
    props: {
      // Your props
    }
  };
}

// Example 8: Bundle size tracking
import { getBundleSize, markBundleStart, markBundleEnd } from 'glass-ui';

async function loadWithTracking() {
  markBundleStart('animations');
  const animations = await loadAnimations();
  markBundleEnd('animations');
  
  console.log('Animations bundle size:', getBundleSize('animations'));
  
  return animations;
}

// Example 9: Custom lazy component factory
import { lazyGlassComponent } from 'glass-ui';

export function MyComponent() {
  const [showModal, setShowModal] = React.useState(false);
  const [GlassModal, setGlassModal] = React.useState<any>(null);
  
  React.useEffect(() => {
    if (showModal && !GlassModal) {
      lazyGlassComponent('GlassModal').then(Modal => {
        setGlassModal(() => Modal);
      });
    }
  }, [showModal, GlassModal]);
  
  return (
    <>
      <GlassButton onClick={() => setShowModal(true)}>
        Open Modal
      </GlassButton>
      
      {showModal && GlassModal && (
        <GlassModal onClose={() => setShowModal(false)}>
          Modal content
        </GlassModal>
      )}
    </>
  );
}

// Example 10: Type-safe modular imports
import type { GlassButtonProps } from '@glass-ui/core';
import type { GlassModalProps } from '@glass-ui/advanced';
import type { AnimationPreset } from '@glass-ui/animations';

interface MyButtonProps extends GlassButtonProps {
  customProp?: string;
}

export const MyButton: React.FC<MyButtonProps> = (props) => {
  return <GlassButton {...props} />;
};