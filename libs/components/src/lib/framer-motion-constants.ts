import type { Transition, Variants } from "framer-motion";

// Reusable transition constants typed as Transition
const _springFast: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

const easeOutExpo: Transition = {
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1],
};

const _easeOutQuart: Transition = {
  duration: 0.5,
  ease: [0.25, 1, 0.5, 1],
};

const _easeInOut: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};

const _smoothTransition: Transition = {
  duration: 0.8,
  ease: "easeInOut",
};

const _bounceTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
  mass: 0.8,
};

const staggeredContainer: Transition = {
  duration: 0.6,
  staggerChildren: 0.1,
};

const fastStaggeredContainer: Transition = {
  duration: 0.8,
  staggerChildren: 0.2,
};

// Common variants typed as Variants
const _fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutExpo,
  },
};

const _fadeInUpLarge: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeOutExpo,
  },
};

const _containerFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: staggeredContainer,
  },
};

const _containerFadeInFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: fastStaggeredContainer,
  },
};
