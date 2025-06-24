import { Transition, Variants } from 'framer-motion';

// Reusable transition constants typed as Transition
export const springFast: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
};

export const easeOutExpo: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

export const easeOutQuart: Transition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1],
};

export const easeInOut: Transition = {
  duration: 0.3,
  ease: 'easeInOut',
};

export const smoothTransition: Transition = {
  duration: 0.8,
  ease: 'easeInOut',
};

export const bounceTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

export const staggeredContainer: Transition = {
  duration: 0.6,
  staggerChildren: 0.1,
};

export const fastStaggeredContainer: Transition = {
  duration: 0.8,
  staggerChildren: 0.2,
};

// Common variants typed as Variants
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutExpo,
  },
};

export const fadeInUpLarge: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutExpo,
  },
};

export const containerFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: staggeredContainer,
  },
};

export const containerFadeInFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: fastStaggeredContainer,
  },
};
