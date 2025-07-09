import React from 'react';
import { cn } from '../../lib/glass-utils';

export function GlassShowcase() {
  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">
          Authentic Apple Liquid Glass Effects
        </h1>
        <p className="text-white/80 text-lg">
          Based on Apple's 2025 design system with depth, micro-interactions,
          and liquid animations
        </p>
      </div>

      {/* Depth Showcase */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Glass Depth Layers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="apple-glass apple-glass--depth-1 p-6 text-center">
            <h3 className="text-white font-medium mb-2">Depth 1</h3>
            <p className="text-white/70 text-sm">Subtle surface glass</p>
          </div>
          <div className="apple-glass apple-glass--depth-2 p-6 text-center">
            <h3 className="text-white font-medium mb-2">Depth 2</h3>
            <p className="text-white/70 text-sm">Standard glass depth</p>
          </div>
          <div className="apple-glass apple-glass--depth-3 p-6 text-center">
            <h3 className="text-white font-medium mb-2">Depth 3</h3>
            <p className="text-white/70 text-sm">Elevated glass</p>
          </div>
          <div className="apple-glass apple-glass--depth-4 p-6 text-center">
            <h3 className="text-white font-medium mb-2">Depth 4</h3>
            <p className="text-white/70 text-sm">Maximum depth</p>
          </div>
        </div>
      </div>

      {/* Interactive Effects Showcase */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Interactive Effects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="apple-glass apple-glass--depth-2 apple-glass--magnetic p-6 text-center">
            <h3 className="text-white font-medium mb-2">Magnetic Hover</h3>
            <p className="text-white/70 text-sm">
              Hover for magnetic lift effect
            </p>
          </div>
          <div className="apple-glass apple-glass--depth-2 apple-glass--shimmer p-6 text-center">
            <h3 className="text-white font-medium mb-2">Shimmer Effect</h3>
            <p className="text-white/70 text-sm">Hover for shimmer animation</p>
          </div>
          <div className="apple-glass apple-glass--depth-2 apple-glass--ripple p-6 text-center">
            <h3 className="text-white font-medium mb-2">Ripple Effect</h3>
            <p className="text-white/70 text-sm">Click for ripple animation</p>
          </div>
          <div className="apple-glass apple-glass--depth-2 apple-glass--glow p-6 text-center">
            <h3 className="text-white font-medium mb-2">Glow Effect</h3>
            <p className="text-white/70 text-sm">Hover for glow border</p>
          </div>
        </div>
      </div>

      {/* Component Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Component Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Button Examples */}
          <div className="apple-glass apple-glass--depth-2 p-6">
            <h3 className="text-white font-medium mb-4">Glass Buttons</h3>
            <div className="space-y-3">
              <button className="apple-glass apple-glass--depth-1 apple-glass--magnetic px-4 py-2 text-white w-full rounded-lg">
                Primary Button
              </button>
              <button className="apple-glass apple-glass--depth-2 apple-glass--shimmer px-4 py-2 text-white w-full rounded-lg">
                Shimmer Button
              </button>
              <button className="apple-glass apple-glass--depth-1 apple-glass--ripple px-4 py-2 text-white w-full rounded-lg">
                Ripple Button
              </button>
            </div>
          </div>

          {/* Input Examples */}
          <div className="apple-glass apple-glass--depth-2 p-6">
            <h3 className="text-white font-medium mb-4">Glass Inputs</h3>
            <div className="space-y-3">
              <input
                className="apple-glass apple-glass--depth-1 px-3 py-2 text-white placeholder-white/60 w-full rounded-lg bg-transparent border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Enter text..."
              />
              <input
                className="apple-glass apple-glass--depth-2 apple-glass--glow px-3 py-2 text-white placeholder-white/60 w-full rounded-lg bg-transparent border-0 focus:outline-none"
                placeholder="Glow input..."
              />
              <textarea
                className="apple-glass apple-glass--depth-1 px-3 py-2 text-white placeholder-white/60 w-full rounded-lg bg-transparent border-0 focus:outline-none resize-none"
                placeholder="Textarea..."
                rows={3}
              />
            </div>
          </div>

          {/* Card Examples */}
          <div className="apple-glass apple-glass--depth-3 apple-glass--magnetic p-6">
            <h3 className="text-white font-medium mb-4">Glass Card</h3>
            <p className="text-white/80 text-sm mb-4">
              This card demonstrates the authentic Apple liquid glass effect
              with depth, luminosity, and interactive animations.
            </p>
            <div className="flex gap-2">
              <span className="apple-glass apple-glass--depth-1 px-2 py-1 text-xs text-white rounded">
                New
              </span>
              <span className="apple-glass apple-glass--depth-1 px-2 py-1 text-xs text-white rounded">
                Featured
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Examples */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-white">
          Navigation Components
        </h2>
        <div className="apple-glass apple-glass--depth-2 p-4 rounded-2xl">
          <nav className="flex items-center justify-between">
            <div className="apple-glass apple-glass--depth-1 apple-glass--magnetic px-4 py-2 rounded-lg">
              <span className="text-white font-medium">Logo</span>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="apple-glass apple-glass--depth-1 apple-glass--shimmer px-3 py-2 text-white rounded-lg hover:no-underline"
              >
                Home
              </a>
              <a
                href="#"
                className="apple-glass apple-glass--depth-1 apple-glass--shimmer px-3 py-2 text-white rounded-lg hover:no-underline"
              >
                About
              </a>
              <a
                href="#"
                className="apple-glass apple-glass--depth-1 apple-glass--shimmer px-3 py-2 text-white rounded-lg hover:no-underline"
              >
                Contact
              </a>
            </div>
            <button className="apple-glass apple-glass--depth-2 apple-glass--ripple px-4 py-2 text-white rounded-lg">
              Get Started
            </button>
          </nav>
        </div>
      </div>

      <div className="text-center mt-12">
        <p className="text-white/60 text-sm">
          Authentic Apple liquid glass effects with depth layers,
          micro-interactions, and liquid animations
        </p>
      </div>
    </div>
  );
}
