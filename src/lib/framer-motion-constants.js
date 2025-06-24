// Reusable transition constants typed as Transition
export const springFast = {
    type: 'spring',
    stiffness: 400,
    damping: 30,
};
export const easeOutExpo = {
    duration: 0.6,
    ease: [0.4, 0, 0.2, 1],
};
export const easeOutQuart = {
    duration: 0.5,
    ease: [0.25, 1, 0.5, 1],
};
export const easeInOut = {
    duration: 0.3,
    ease: 'easeInOut',
};
export const smoothTransition = {
    duration: 0.8,
    ease: 'easeInOut',
};
export const bounceTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    mass: 0.8,
};
export const staggeredContainer = {
    duration: 0.6,
    staggerChildren: 0.1,
};
export const fastStaggeredContainer = {
    duration: 0.8,
    staggerChildren: 0.2,
};
// Common variants typed as Variants
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: easeOutExpo,
    },
};
export const fadeInUpLarge = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: easeOutExpo,
    },
};
export const containerFadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: staggeredContainer,
    },
};
export const containerFadeInFast = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: fastStaggeredContainer,
    },
};
