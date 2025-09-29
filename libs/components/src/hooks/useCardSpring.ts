import { useCallback, useEffect, useState } from 'react';
import { useSpring, useMotionValue, useTransform } from 'framer-motion';

interface UseCardSpringProps {
  /**
   * Card interaction intensity
   * @default "subtle"
   */
  intensity?: 'subtle' | 'medium' | 'strong';
  /**
   * Enable tilt effect on hover
   * @default true
   */
  enableTilt?: boolean;
  /**
   * Maximum tilt rotation in degrees
   * @default 4
   */
  maxTilt?: number;
  /**
   * Enable depth shadow animation
   * @default true
   */
  enableDepth?: boolean;
}

/**
 * Enhanced spring physics hook for card interactions
 * Provides Apple-like card hover and press animations with tilt and depth effects
 */
// Simple reduced motion hook
const useReducedMotion = () => {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);
  return prefersReduced;
};

export const useCardSpring = (props: UseCardSpringProps = {}) => {
  const {
    intensity = 'subtle',
    enableTilt = true,
    maxTilt = 4,
    enableDepth = true,
  } = props;

  const reducedMotion = useReducedMotion();

  // Intensity configurations for different interaction levels
  const configs = {
    subtle: { stiffness: 300, damping: 25, mass: 0.8 },
    medium: { stiffness: 350, damping: 22, mass: 0.9 },
    strong: { stiffness: 400, damping: 20, mass: 1.0 },
  };

  const config = configs[intensity];

  // Core spring animations
  const scale = useSpring(1, {
    stiffness: reducedMotion ? 0 : config.stiffness,
    damping: reducedMotion ? 0 : config.damping,
    mass: reducedMotion ? 0 : config.mass,
    restDelta: 0.001,
  });

  const y = useSpring(0, {
    stiffness: reducedMotion ? 0 : config.stiffness * 0.8,
    damping: reducedMotion ? 0 : config.damping * 1.2,
    mass: reducedMotion ? 0 : config.mass * 0.7,
  });

  // Tilt effect motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  // Depth shadow animation
  const shadowBlur = useSpring(8, {
    stiffness: reducedMotion ? 0 : config.stiffness,
    damping: reducedMotion ? 0 : config.damping,
  });

  const shadowOpacity = useSpring(0.1, {
    stiffness: reducedMotion ? 0 : config.stiffness,
    damping: reducedMotion ? 0 : config.damping,
  });

  // Enhanced interaction handlers
  const handleHoverStart = useCallback((event: React.MouseEvent) => {
    if (reducedMotion) return;

    // Scale and lift effects based on intensity
    const scaleValues = { subtle: 1.02, medium: 1.03, strong: 1.04 };
    const yValues = { subtle: -2, medium: -3, strong: -4 };
    
    scale.set(scaleValues[intensity]);
    y.set(yValues[intensity]);

    if (enableDepth) {
      shadowBlur.set(20);
      shadowOpacity.set(0.15);
    }

    // Tilt calculation
    if (enableTilt) {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set((event.clientX - centerX) / rect.width);
      mouseY.set((event.clientY - centerY) / rect.height);
    }
  }, [reducedMotion, intensity, scale, y, shadowBlur, shadowOpacity, enableTilt, enableDepth, mouseX, mouseY]);

  const handleHoverEnd = useCallback(() => {
    if (reducedMotion) return;

    scale.set(1);
    y.set(0);
    
    if (enableDepth) {
      shadowBlur.set(8);
      shadowOpacity.set(0.1);
    }

    if (enableTilt) {
      mouseX.set(0);
      mouseY.set(0);
    }
  }, [reducedMotion, scale, y, shadowBlur, shadowOpacity, enableTilt, enableDepth, mouseX, mouseY]);

  const handlePressStart = useCallback(() => {
    if (reducedMotion) return;
    
    const scaleValues = { subtle: 0.98, medium: 0.97, strong: 0.96 };
    scale.set(scaleValues[intensity]);
    y.set(1);
    
    if (enableDepth) {
      shadowBlur.set(4);
      shadowOpacity.set(0.08);
    }
  }, [reducedMotion, intensity, scale, y, shadowBlur, shadowOpacity, enableDepth]);

  const handlePressEnd = useCallback(() => {
    if (reducedMotion) return;
    
    // Return to hover state
    const scaleValues = { subtle: 1.02, medium: 1.03, strong: 1.04 };
    const yValues = { subtle: -2, medium: -3, strong: -4 };
    
    scale.set(scaleValues[intensity]);
    y.set(yValues[intensity]);
    
    if (enableDepth) {
      shadowBlur.set(20);
      shadowOpacity.set(0.15);
    }
  }, [reducedMotion, intensity, scale, y, shadowBlur, shadowOpacity, enableDepth]);

  // Mouse move handler for continuous tilt updates
  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (reducedMotion || !enableTilt) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((event.clientX - centerX) / rect.width);
    mouseY.set((event.clientY - centerY) / rect.height);
  }, [reducedMotion, enableTilt, mouseX, mouseY]);

  return {
    // Motion values for style binding
    scale,
    y,
    rotateX: enableTilt ? rotateX : undefined,
    rotateY: enableTilt ? rotateY : undefined,
    
    // Shadow animation values
    shadow: enableDepth ? {
      blur: shadowBlur,
      opacity: shadowOpacity,
    } : undefined,

    // Interaction handlers
    interactions: {
      onHoverStart: handleHoverStart,
      onHoverEnd: handleHoverEnd,
      onPressStart: handlePressStart,
      onPressEnd: handlePressEnd,
      onMouseMove: handleMouseMove,
    },

    // State
    reducedMotion,
  };
};