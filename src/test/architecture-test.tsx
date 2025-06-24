/**
 * Test file to verify the architectural separation works correctly
 */

import React from 'react';
import { 
  GlassContainer, 
  GlassSurface, 
  GlassPanel,
  GlassBackdrop,
  GlassSeparator 
} from '../components/glass-foundation';
import { GlassCard } from '../components/glass-card';
import { GlassButton } from '../components/glass-button';

// Test component to verify foundation components work
export const ArchitectureTest: React.FC = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Glass UI Architecture Test</h1>
      
      {/* Test Foundation Components */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Foundation Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GlassContainer className="p-4">
            <h3 className="font-medium">Glass Container</h3>
            <p className="text-sm text-muted-foreground">Basic glass container</p>
          </GlassContainer>
          
          <GlassSurface elevation="medium" padding="lg">
            <h3 className="font-medium">Glass Surface</h3>
            <p className="text-sm text-muted-foreground">Elevated surface</p>
          </GlassSurface>
          
          <GlassPanel hoverable pressable className="p-4">
            <h3 className="font-medium">Glass Panel</h3>
            <p className="text-sm text-muted-foreground">Interactive panel</p>
          </GlassPanel>
        </div>
      </section>

      <GlassSeparator />

      {/* Test Refactored Components */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Refactored Components</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <GlassCard variant="elevated" hover>
            <h3 className="font-medium mb-2">Refactored Glass Card</h3>
            <p className="text-sm text-muted-foreground">
              This card now uses the foundation layer for consistent glass effects.
            </p>
          </GlassCard>
          
          <div className="space-y-3">
            <GlassButton variant="primary">Primary Button</GlassButton>
            <GlassButton variant="secondary">Secondary Button</GlassButton>
            <GlassButton variant="ghost">Ghost Button</GlassButton>
          </div>
        </div>
      </section>

      {/* Test Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Glass Variants</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassContainer variant="default" className="p-3 text-center">
            <span className="text-sm">Default</span>
          </GlassContainer>
          <GlassContainer variant="elevated" className="p-3 text-center">
            <span className="text-sm">Elevated</span>
          </GlassContainer>
          <GlassContainer variant="floating" className="p-3 text-center">
            <span className="text-sm">Floating</span>
          </GlassContainer>
          <GlassContainer variant="overlay" className="p-3 text-center">
            <span className="text-sm">Overlay</span>
          </GlassContainer>
        </div>
      </section>
    </div>
  );
};

export default ArchitectureTest;
