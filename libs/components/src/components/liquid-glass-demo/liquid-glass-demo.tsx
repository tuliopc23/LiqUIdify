/**
 * Liquid Glass Demo Component
 * 
 * Comprehensive demonstration of the unified liquid glass system
 * showing all the key features and effects.
 */

import React from "react";
import { cn } from "../../core/utils/classname";
import { GlassButton } from "../glass-button-refactored/glass-button";
import { GlassCard } from "../glass-card-refactored/glass-card";
import { Play, Pause, SkipForward, SkipBack, Heart, Download, Settings } from "lucide-react";

interface LiquidGlassDemoProps {
  className?: string;
}

export const LiquidGlassDemo: React.FC<LiquidGlassDemoProps> = ({ className }) => {
  return (
    <div className={cn("min-h-screen p-8 space-y-8", className)}>
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-liquid-primary">
          LiqUIdify Liquid Glass System
        </h1>
        <p className="text-xl text-liquid-secondary max-w-2xl mx-auto">
          Experience the signature liquid glass effect with layered depth, 
          specular highlights, and smooth interactions.
        </p>
      </div>

      {/* Button Showcase */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-liquid-primary">Liquid Glass Buttons</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <GlassButton variant="primary" size="lg" leftIcon={<Play />}>
            Play Now
          </GlassButton>
          <GlassButton variant="secondary" size="lg" leftIcon={<Heart />}>
            Favorite
          </GlassButton>
          <GlassButton variant="ghost" size="lg" leftIcon={<Download />}>
            Download
          </GlassButton>
          <GlassButton variant="destructive" size="lg" leftIcon={<Settings />}>
            Settings
          </GlassButton>
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <GlassButton iconOnly size="lg">
            <SkipBack />
          </GlassButton>
          <GlassButton iconOnly size="lg" variant="primary">
            <Play />
          </GlassButton>
          <GlassButton iconOnly size="lg">
            <SkipForward />
          </GlassButton>
        </div>
      </section>

      {/* Card Showcase */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-liquid-primary">Liquid Glass Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Music Player Card */}
          <GlassCard size="lg" interactive>
            <GlassCard.Header>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
                <div>
                  <GlassCard.Title>Now Playing</GlassCard.Title>
                  <GlassCard.Description>Liquid Dreams</GlassCard.Description>
                </div>
              </div>
            </GlassCard.Header>
            
            <GlassCard.Content>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-liquid-secondary">
                  <span>2:34</span>
                  <span>4:12</span>
                </div>
                <div className="w-full bg-liquid-bg rounded-full h-2">
                  <div className="bg-liquid-accent h-2 rounded-full w-3/5"></div>
                </div>
              </div>
            </GlassCard.Content>
            
            <GlassCard.Footer>
              <div className="flex items-center justify-center space-x-4">
                <GlassButton iconOnly size="sm">
                  <SkipBack />
                </GlassButton>
                <GlassButton iconOnly size="md" variant="primary">
                  <Pause />
                </GlassButton>
                <GlassButton iconOnly size="sm">
                  <SkipForward />
                </GlassButton>
              </div>
            </GlassCard.Footer>
          </GlassCard>

          {/* Stats Card */}
          <GlassCard size="lg" variant="elevated">
            <GlassCard.Header>
              <GlassCard.Title>Performance</GlassCard.Title>
              <GlassCard.Description>
                Real-time liquid glass metrics
              </GlassCard.Description>
            </GlassCard.Header>
            
            <GlassCard.Content>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-liquid-secondary">Render Time</span>
                  <span className="text-liquid-primary font-semibold">16ms</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-liquid-secondary">Glass Layers</span>
                  <span className="text-liquid-primary font-semibold">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-liquid-secondary">Blur Quality</span>
                  <span className="text-liquid-primary font-semibold">High</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-liquid-secondary">Specular</span>
                  <span className="text-liquid-accent font-semibold">Active</span>
                </div>
              </div>
            </GlassCard.Content>
          </GlassCard>

          {/* Action Card */}
          <GlassCard size="lg" variant="interactive">
            <GlassCard.Header>
              <GlassCard.Title>Get Started</GlassCard.Title>
              <GlassCard.Description>
                Experience the liquid glass effect
              </GlassCard.Description>
            </GlassCard.Header>
            
            <GlassCard.Content>
              <div className="space-y-4">
                <div className="text-sm text-liquid-secondary">
                  ✨ Layered glass system<br />
                  🌟 Specular highlights<br />
                  🎯 Smooth interactions<br />
                  💎 Liquid shine effect
                </div>
              </div>
            </GlassCard.Content>
            
            <GlassCard.Footer>
              <GlassButton fullWidth variant="primary" rightIcon={<Download />}>
                Try It Now
              </GlassButton>
            </GlassCard.Footer>
          </GlassCard>
        </div>
      </section>

      {/* Layered Glass Demo */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-liquid-primary">Layered Glass System</h2>
        
        <div className="liquid-glass-container max-w-2xl mx-auto">
          {/* Glass Filter Layer */}
          <div className="liquid-glass-filter" />
          
          {/* Glass Overlay Layer */}
          <div className="liquid-glass-overlay" />
          
          {/* Glass Specular Layer */}
          <div className="liquid-glass-specular" />
          
          {/* Content Layer */}
          <div className="liquid-glass-content">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-liquid-primary">
                Four-Layer Glass System
              </h3>
              <p className="text-liquid-secondary">
                This demonstrates the complete layered approach: filter → overlay → specular → content
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-3 py-1 bg-liquid-accent/20 rounded-full text-sm text-liquid-primary">
                  Filter Layer (z-index: 0)
                </span>
                <span className="px-3 py-1 bg-liquid-accent/20 rounded-full text-sm text-liquid-primary">
                  Overlay Layer (z-index: 1)
                </span>
                <span className="px-3 py-1 bg-liquid-accent/20 rounded-full text-sm text-liquid-primary">
                  Specular Layer (z-index: 2)
                </span>
                <span className="px-3 py-1 bg-liquid-accent/20 rounded-full text-sm text-liquid-primary">
                  Content Layer (z-index: 3)
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Items */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-liquid-primary">Interactive Glass Items</h2>
        
        <div className="flex flex-wrap gap-8 justify-center">
          <div className="liquid-glass-item">
            <Play className="w-12 h-12 mb-2" />
            <span className="text-sm">Play</span>
          </div>
          
          <div className="liquid-glass-item liquid-glass-item--active">
            <Heart className="w-12 h-12 mb-2" />
            <span className="text-sm">Favorite</span>
          </div>
          
          <div className="liquid-glass-item">
            <Download className="w-12 h-12 mb-2" />
            <span className="text-sm">Download</span>
          </div>
          
          <div className="liquid-glass-item">
            <Settings className="w-12 h-12 mb-2" />
            <span className="text-sm">Settings</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center pt-12">
        <p className="text-liquid-secondary">
          Built with the LiqUIdify Liquid Glass Design System
        </p>
      </footer>
    </div>
  );
};

export default LiquidGlassDemo;
