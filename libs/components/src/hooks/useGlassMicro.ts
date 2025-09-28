import { useCallback, useEffect, useRef } from 'react';
import { useSpring, useMotionValue, useTransform, motion } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion'; // Assume this exists or implement as a simple media query hook

interface UseGlassMicroProps {
  duration?: number; // Default 150ms
  stiffness?: number; // For spring, default 300
  damping?: number; // Default 20
  rippleColor?: string; // Default 'rgba(255,255,255,0.3)'
  onTap?: () => void;
}

export const useGlassMicro = (props: UseGlassMicroProps = {}) => {
  const {
    duration = 150,
    stiffness = 300,
    damping = 20,
    rippleColor = 'rgba(255,255,255,0.3)',
    onTap,
  } = props;

  const reducedMotion = useReducedMotion();
  const scale = useSpring(1, {
    stiffness: reducedMotion ? 0 : stiffness,
    damping: reducedMotion ? 0 : damping,
    duration: reducedMotion ? 0 : duration,
  });

  const rippleX = useMotionValue(0);
  const rippleY = useMotionValue(0);
  const rippleOpacity = useMotionValue(1);

  const rippleSize = useTransform(rippleOpacity, [0, 1], ['0%', '200%']);
  const rippleScale = useTransform(rippleOpacity, [0, 1], [0, 1]);

  const handleTap = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (reducedMotion || !onTap) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    const y = event instanceof MouseEvent ? event.clientY : event.touches[0].clientY;

    rippleX.set(x - rect.left);
    rippleY.set(y - rect.top);
    rippleOpacity.set(1);

    // Animate ripple fade
    rippleOpacity.start(0, {
      duration: 300,
      ease: 'easeOut',
    });

    onTap();
  }, [reducedMotion, onTap, rippleX, rippleY, rippleOpacity]);

  // Hover/Press springs
  const handleHoverStart = useCallback(() => {
    if (!reducedMotion) {
      scale.set(1.02);
    }
  }, [scale, reducedMotion]);

  const handleHoverEnd = useCallback(() => {
    if (!reducedMotion) {
      scale.set(1);
    }
  }, [scale, reducedMotion]);

  const handlePressStart = useCallback(() => {
    if (!reducedMotion) {
      scale.set(0.96);
    }
  }, [scale, reducedMotion]);

  const handlePressEnd = useCallback(() => {
    if (!reducedMotion) {
      scale.set(1);
    }
  }, [scale, reducedMotion]);

  // Ripple motion component (to be rendered in JSX)
  const Ripple = motion.div({
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: `radial-gradient(circle at var(--ripple-x, 50%) var(--ripple-y, 50%), ${rippleColor} 0%, transparent 70%)`,
      scale: rippleScale,
      opacity: rippleOpacity,
      borderRadius: 'inherit',
      pointerEvents: 'none',
      transformOrigin: 'var(--ripple-x, 50%) var(--ripple-y, 50%)',
    },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: rippleSize, opacity: rippleOpacity },
    transition: { duration: 0.3, ease: 'easeOut' },
  });

  return {
    scale, // Use in motion.div style={{ scale }}
    ripple: {
      Ripple, // Render <Ripple style={{ '--ripple-x': `${rippleX.get()}px`, '--ripple-y': `${rippleY.get()}px` }} />
      handleTap,
    },
    interactions: {
      onHoverStart: handleHoverStart,
      onHoverEnd: handleHoverEnd,
      onPressStart: handlePressStart,
      onPressEnd: handlePressEnd,
    },
    reducedMotion,
  };
};

// Simple reduced motion hook (if not existing)
export const useReducedMotion = () => {
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
