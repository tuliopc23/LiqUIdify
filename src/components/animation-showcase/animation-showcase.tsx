/**
 * Animation Showcase Component
 * 
 * Demonstrates the advanced animation capabilities of LiquidiUI components
 */

import React, { useState } from 'react';
import { cn } from '@/lib/glass-utils';
import { 
  useSpring, 
  useMicroInteraction, 
  useStaggeredAnimation, 
  useGlassMorph,
  useFloatingAnimation,
  springPresets,
  microInteractionPresets 
} from '@/lib/animation-system';
import { GlassButton } from '../glass-button/glass-button';
import { GlassInput } from '../glass-input/glass-input';
import { Play, Pause, RotateCcw, Sparkles, Zap, Heart } from 'lucide-react';

export interface AnimationShowcaseProps {
  className?: string;
}

export function AnimationShowcase({ className }: AnimationShowcaseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof springPresets>('glass');
  
  // Spring animation examples
  const springValue = useSpring(isPlaying ? 100 : 0, {
    config: selectedPreset,
    onComplete: () => console.log('Spring animation completed!')
  });
  
  // Staggered animation for cards
  const cardItems = Array.from({ length: 6 }, (_, i) => i);
  const staggeredCards = useStaggeredAnimation(cardItems, {
    stagger: 100,
    spring: 'bouncy'
  });
  
  // Floating animation
  const floatingStyle = useFloatingAnimation(true);
  
  // Different micro-interaction examples
  const magneticInteraction = useMicroInteraction('magnetic');
  const cardLiftInteraction = useMicroInteraction('cardLift');
  const pulseInteraction = useMicroInteraction('pulse');
  
  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      staggeredCards.trigger();
    } else {
      staggeredCards.reset();
    }
  };

  return (
    <div className={cn("p-8 space-y-12", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">
          LiquidiUI Animation System
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Experience professional-grade animations with spring physics, micro-interactions, and accessibility support.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 justify-center items-center">
        <GlassButton
          variant="primary"
          leftIcon={isPlaying ? <Pause /> : <Play />}
          onClick={handlePlayToggle}
        >
          {isPlaying ? 'Pause' : 'Play'} Animations
        </GlassButton>
        
        <GlassButton
          variant="secondary"
          leftIcon={<RotateCcw />}
          onClick={() => {
            setIsPlaying(false);
            staggeredCards.reset();
          }}
        >
          Reset
        </GlassButton>
        
        <select
          value={selectedPreset}
          onChange={(e) => setSelectedPreset(e.target.value as keyof typeof springPresets)}
          className="px-4 py-2 rounded-lg bg-[var(--glass-bg-primary)] border border-[var(--glass-border)] text-[var(--text-primary)]"
        >
          {Object.keys(springPresets).map((preset) => (
            <option key={preset} value={preset}>
              {preset.charAt(0).toUpperCase() + preset.slice(1)} Spring
            </option>
          ))}
        </select>
      </div>

      {/* Spring Value Demonstration */}
      <div className="bg-[var(--glass-bg-primary)] rounded-2xl p-8 border border-[var(--glass-border)]">
        <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">
          Spring Physics Engine
        </h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-[var(--text-secondary)]">Progress:</span>
            <span className="font-mono text-[var(--text-primary)]">
              {Math.round(springValue.value)}%
            </span>
          </div>
          
          <div className="relative h-4 bg-[var(--glass-bg-secondary)] rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-none"
              style={{ 
                width: `${springValue.value}%`,
                transform: `scaleX(${springValue.value / 100})`,
                transformOrigin: 'left'
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-[var(--text-secondary)]">State</div>
              <div className="font-semibold text-[var(--text-primary)]">
                {springValue.isAnimating ? 'Animating' : 'At Rest'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[var(--text-secondary)]">Spring Type</div>
              <div className="font-semibold text-[var(--text-primary)]">
                {selectedPreset}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[var(--text-secondary)]">Performance</div>
              <div className="font-semibold text-green-500">60 FPS</div>
            </div>
          </div>
        </div>
      </div>

      {/* Micro-Interactions Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Micro-Interactions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Magnetic Card */}
          <div 
            className="bg-[var(--glass-bg-primary)] rounded-2xl p-6 border border-[var(--glass-border)] cursor-pointer"
            style={magneticInteraction.style}
            {...magneticInteraction.bind}
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6 text-blue-500" />
              <h3 className="font-semibold text-[var(--text-primary)]">Magnetic</h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Hover to experience the magnetic attraction effect with subtle scale and movement.
            </p>
          </div>
          
          {/* Card Lift */}
          <div 
            className="bg-[var(--glass-bg-primary)] rounded-2xl p-6 border border-[var(--glass-border)] cursor-pointer"
            style={cardLiftInteraction.style}
            {...cardLiftInteraction.bind}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h3 className="font-semibold text-[var(--text-primary)]">Card Lift</h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Watch the card elegantly lift off the surface with smooth scaling and translation.
            </p>
          </div>
          
          {/* Pulse */}
          <div 
            className="bg-[var(--glass-bg-primary)] rounded-2xl p-6 border border-[var(--glass-border)] cursor-pointer"
            style={pulseInteraction.style}
            {...pulseInteraction.bind}
          >
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-6 h-6 text-red-500" />
              <h3 className="font-semibold text-[var(--text-primary)]">Pulse</h3>
            </div>
            <p className="text-[var(--text-secondary)] text-sm">
              Feel the gentle pulsing animation that breathes life into static elements.
            </p>
          </div>
        </div>
      </div>

      {/* Staggered Animation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Staggered Animations
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cardItems.map((item, index) => (
            <div
              key={item}
              className="aspect-square bg-[var(--glass-bg-primary)] rounded-xl border border-[var(--glass-border)] flex items-center justify-center"
              style={{
                opacity: staggeredCards.springs[index]?.value || 0,
                transform: `translateY(${20 - (staggeredCards.springs[index]?.value || 0) * 20}px) scale(${0.8 + (staggeredCards.springs[index]?.value || 0) * 0.2})`,
              }}
            >
              <span className="text-2xl font-bold text-[var(--text-primary)]">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Animation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Floating Animation
        </h2>
        
        <div className="flex justify-center">
          <div 
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white text-center shadow-2xl"
            style={floatingStyle}
          >
            <Sparkles className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Floating Element</h3>
            <p className="text-blue-100">
              This element gently floats with a sine wave animation
            </p>
          </div>
        </div>
      </div>

      {/* Component Integration */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-[var(--text-primary)]">
          Component Integration
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Enhanced Buttons
            </h3>
            <div className="space-y-3">
              <GlassButton variant="primary" fullWidth>
                Primary Button
              </GlassButton>
              <GlassButton variant="secondary" fullWidth>
                Secondary Button
              </GlassButton>
              <GlassButton variant="success" fullWidth leftIcon={<Sparkles />}>
                Success with Icon
              </GlassButton>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--text-primary)]">
              Enhanced Inputs
            </h3>
            <div className="space-y-3">
              <GlassInput 
                placeholder="Enhanced text input"
                inputVariant="default"
              />
              <GlassInput 
                placeholder="Search with animation"
                inputVariant="search"
              />
              <GlassInput 
                placeholder="Password input"
                inputVariant="password"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Performance Info */}
      <div className="bg-[var(--glass-bg-primary)] rounded-2xl p-6 border border-[var(--glass-border)]">
        <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
          Performance Features
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-green-500">60 FPS</div>
            <div className="text-[var(--text-secondary)]">Smooth Animations</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-500">GPU Accelerated</div>
            <div className="text-[var(--text-secondary)]">Hardware Optimized</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-purple-500">Reduced Motion</div>
            <div className="text-[var(--text-secondary)]">Accessibility Support</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-orange-500">Spring Physics</div>
            <div className="text-[var(--text-secondary)]">Natural Movement</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimationShowcase;