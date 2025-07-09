/**
 * Apple Liquid Glass SVG Filters Component
 * Provides SVG filter definitions for authentic liquid glass distortion effects
 */

import { memo } from 'react';

export interface LiquidGlassSvgFiltersProps {
  className?: string;
}

/**
 * SVG filter definitions for liquid glass effects
 * Based on patterns from Apple's authentic liquid glass implementations
 */
export const LiquidGlassSvgFilters = memo(function LiquidGlassSvgFilters({
  className = 'apple-liquid-svg-defs',
}: LiquidGlassSvgFiltersProps) {
  return (
    <svg
      className={className}
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Liquid Lens Filter - Creates distortion effect */}
        <filter id="liquid-lens" x="-50%" y="-50%" width="200%" height="200%">
          <feImage
            x="0"
            y="0"
            result="normalMap"
            xlinkHref="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><radialGradient id='nmap' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='rgb(128,128,255)'/><stop offset='100%' stop-color='rgb(255,255,255)'/></radialGradient><rect width='100%' height='100%' fill='url(%23nmap)'/></svg>"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="normalMap"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feMerge>
            <feMergeNode in="displaced" />
          </feMerge>
        </filter>

        {/* Liquid Distortion Filter - Creates turbulence effect */}
        <filter id="liquid-distortion" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.008 0.008"
            numOctaves="2"
            seed="92"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Subtle Liquid Effect - Light distortion */}
        <filter id="liquid-subtle" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.004 0.004"
            numOctaves="1"
            seed="42"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Strong Liquid Effect - Heavy distortion */}
        <filter id="liquid-strong" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.012"
            numOctaves="3"
            seed="123"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="3" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="100"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Liquid Glow Filter - Adds luminous effect */}
        <filter id="liquid-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Liquid Shimmer Filter - Animated highlight effect */}
        <filter
          id="liquid-shimmer"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur" />
          <feSpecularLighting
            in="blur"
            specularConstant="1.5"
            specularExponent="20"
            lighting-color="white"
            result="specOut"
          >
            <fePointLight x="50" y="50" z="100" />
          </feSpecularLighting>
          <feComposite
            in="specOut"
            in2="SourceAlpha"
            operator="in"
            result="specOut2"
          />
          <feComposite
            in="SourceGraphic"
            in2="specOut2"
            operator="arithmetic"
            k1="0"
            k2="1"
            k3="1"
            k4="0"
          />
        </filter>
      </defs>
    </svg>
  );
});

export default LiquidGlassSvgFilters;
