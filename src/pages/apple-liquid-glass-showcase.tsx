/**
 * Apple Liquid Glass Showcase Page
 * Demonstrates all the new liquid glass effects and patterns
 * Based on authentic Apple design language from GitHub gists
 */

import { useState } from 'react';
import {
  AppleLiquidGlassCard,
  AppleLiquidGlassButton,
  AppleLiquidGlassNav,
} from '../components/apple-liquid-glass';
import LiquidGlassSvgFilters from '../components/liquid-glass-svg-filters';

export default function AppleLiquidGlassShowcase() {
  const [selectedIntensity, setSelectedIntensity] = useState<
    'subtle' | 'medium' | 'strong'
  >('medium');
  const [enabledEffects, setEnabledEffects] = useState({
    magnetic: true,
    animated: false,
    multiLayer: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 p-8">
      {/* Include SVG filters */}
      <LiquidGlassSvgFilters />

      {/* Background pattern */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%)
          `,
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <AppleLiquidGlassCard
          className="mb-8 text-center"
          intensity="subtle"
          animated={true}
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Apple Liquid Glass Showcase
          </h1>
          <p className="text-lg text-white/80">
            Authentic Apple 2025 liquid glass design language
          </p>
        </AppleLiquidGlassCard>

        {/* Controls */}
        <AppleLiquidGlassCard className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Effect Controls
          </h2>

          <div className="space-y-4">
            {/* Intensity Control */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Intensity
              </label>
              <div className="flex gap-2">
                {(['subtle', 'medium', 'strong'] as const).map(intensity => (
                  <AppleLiquidGlassButton
                    key={intensity}
                    size="sm"
                    intensity={
                      selectedIntensity === intensity ? 'strong' : 'subtle'
                    }
                    onClick={() => setSelectedIntensity(intensity)}
                    className={
                      selectedIntensity === intensity
                        ? 'ring-2 ring-white/50'
                        : ''
                    }
                  >
                    {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                  </AppleLiquidGlassButton>
                ))}
              </div>
            </div>

            {/* Effect Toggles */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Effects
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(enabledEffects).map(([effect, enabled]) => (
                  <AppleLiquidGlassButton
                    key={effect}
                    size="sm"
                    intensity={enabled ? 'strong' : 'subtle'}
                    onClick={() =>
                      setEnabledEffects(prev => ({
                        ...prev,
                        [effect]: !prev[effect as keyof typeof prev],
                      }))
                    }
                    className={enabled ? 'ring-2 ring-white/50' : ''}
                  >
                    {effect.charAt(0).toUpperCase() + effect.slice(1)}
                  </AppleLiquidGlassButton>
                ))}
              </div>
            </div>
          </div>
        </AppleLiquidGlassCard>

        {/* Glass Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Basic Glass Card */}
          <AppleLiquidGlassCard
            intensity={selectedIntensity}
            magnetic={enabledEffects.magnetic}
            animated={enabledEffects.animated}
            multiLayer={enabledEffects.multiLayer}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">🎵</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Music Player
              </h3>
              <p className="text-white/70">
                Apple Music interface with liquid glass effects
              </p>
            </div>
          </AppleLiquidGlassCard>

          {/* Interactive Glass Card */}
          <AppleLiquidGlassCard
            intensity={selectedIntensity}
            magnetic={enabledEffects.magnetic}
            animated={enabledEffects.animated}
            multiLayer={enabledEffects.multiLayer}
            interactive={true}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Control Center
              </h3>
              <p className="text-white/70">
                Interactive glass controls with hover effects
              </p>
            </div>
          </AppleLiquidGlassCard>

          {/* Animated Glass Card */}
          <AppleLiquidGlassCard
            intensity={selectedIntensity}
            magnetic={enabledEffects.magnetic}
            animated={true}
            multiLayer={enabledEffects.multiLayer}
          >
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Dynamic Effects
              </h3>
              <p className="text-white/70">
                Animated liquid glass with flow effects
              </p>
            </div>
          </AppleLiquidGlassCard>
        </div>

        {/* Button Showcase */}
        <AppleLiquidGlassCard className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Button Variations
          </h2>
          <div className="flex flex-wrap gap-4">
            <AppleLiquidGlassButton
              intensity={selectedIntensity}
              magnetic={enabledEffects.magnetic}
              animated={enabledEffects.animated}
              size="sm"
              variant="primary"
            >
              Small Button
            </AppleLiquidGlassButton>

            <AppleLiquidGlassButton
              intensity={selectedIntensity}
              magnetic={enabledEffects.magnetic}
              animated={enabledEffects.animated}
              size="md"
              variant="secondary"
            >
              Medium Button
            </AppleLiquidGlassButton>

            <AppleLiquidGlassButton
              intensity={selectedIntensity}
              magnetic={enabledEffects.magnetic}
              animated={enabledEffects.animated}
              size="lg"
              variant="ghost"
            >
              Large Button
            </AppleLiquidGlassButton>
          </div>
        </AppleLiquidGlassCard>

        {/* Navigation Showcase */}
        <AppleLiquidGlassCard className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Navigation Components
          </h2>
          <AppleLiquidGlassNav
            className="p-4 rounded-2xl"
            intensity={selectedIntensity}
            magnetic={enabledEffects.magnetic}
            animated={enabledEffects.animated}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  🍎
                </div>
                <span className="text-white font-medium">LiqUIdify</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-white/80 hover:text-white transition-colors">
                  Home
                </button>
                <button className="text-white/80 hover:text-white transition-colors">
                  Docs
                </button>
                <button className="text-white/80 hover:text-white transition-colors">
                  Components
                </button>
              </div>
            </div>
          </AppleLiquidGlassNav>
        </AppleLiquidGlassCard>

        {/* Player Widget Example */}
        <AppleLiquidGlassCard
          className="mb-8"
          intensity={selectedIntensity}
          magnetic={enabledEffects.magnetic}
          animated={enabledEffects.animated}
          multiLayer={enabledEffects.multiLayer}
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Music Player Widget
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              ♪
            </div>
            <div className="flex-1">
              <div className="text-white font-medium">All Of Me</div>
              <div className="text-white/70 text-sm">John Legend</div>
            </div>
            <div className="flex items-center gap-2">
              <AppleLiquidGlassButton
                size="sm"
                intensity="subtle"
                className="p-2 rounded-full"
              >
                ⏮
              </AppleLiquidGlassButton>
              <AppleLiquidGlassButton
                size="sm"
                intensity="medium"
                className="p-3 rounded-full"
              >
                ▶
              </AppleLiquidGlassButton>
              <AppleLiquidGlassButton
                size="sm"
                intensity="subtle"
                className="p-2 rounded-full"
              >
                ⏭
              </AppleLiquidGlassButton>
            </div>
          </div>
        </AppleLiquidGlassCard>

        {/* Technical Details */}
        <AppleLiquidGlassCard intensity="subtle" animated={true}>
          <h2 className="text-2xl font-semibold text-white mb-4">
            Technical Implementation
          </h2>
          <div className="space-y-3 text-white/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              <span>
                Multi-layer glass structure with filter, overlay, and specular
                layers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>SVG filters for authentic liquid distortion effects</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              <span>
                React 19 patterns with startTransition and enhanced hooks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
              <span>Tailwind v4 CSS layers and modern utilities</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              <span>
                Magnetic hover effects with physics-based interactions
              </span>
            </div>
          </div>
        </AppleLiquidGlassCard>
      </div>
    </div>
  );
}
