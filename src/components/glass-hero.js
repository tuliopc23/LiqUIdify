import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/glass-utils';
import { useLiquidGlass, useContentAwareGlass } from '@/hooks/use-liquid-glass';
import { useMagneticHover } from '@/lib/glass-physics';
import { GlassButton } from './glass-button';
import { fadeInUpLarge, containerFadeInFast, } from '@/lib/framer-motion-constants';
const GlassHero = forwardRef(({ className, title, subtitle, description, primaryAction, secondaryAction, backgroundImage, backgroundVideo, variant = 'default', size = 'lg', enableParallax = true, enableMagnetic = false, children, ...props }, ref) => {
    const contentRef = useRef(null);
    const { specularHighlights } = useLiquidGlass();
    useContentAwareGlass(contentRef);
    const { elementRef: magneticRef, transform } = useMagneticHover(0.2, 200);
    // Callback ref to handle both content and magnetic refs
    const setRefs = useCallback((node) => {
        contentRef.current = node;
        if (enableMagnetic && magneticRef) {
            magneticRef.current = node;
        }
        if (typeof ref === 'function') {
            ref(node);
        }
        else if (ref) {
            ref.current = node;
        }
    }, [enableMagnetic, magneticRef, ref]);
    const sizeClasses = {
        sm: 'min-h-[60vh] py-16 px-6',
        md: 'min-h-[70vh] py-20 px-8',
        lg: 'min-h-[80vh] py-24 px-8',
        xl: 'min-h-[90vh] py-32 px-12',
    };
    const variantClasses = {
        default: 'text-center',
        centered: 'text-center items-center justify-center',
        split: 'text-left lg:text-left items-center',
        minimal: 'text-center items-center justify-center py-16',
    };
    const titleSizes = {
        sm: 'text-4xl md:text-5xl',
        md: 'text-5xl md:text-6xl',
        lg: 'text-6xl md:text-7xl lg:text-8xl',
        xl: 'text-7xl md:text-8xl lg:text-9xl',
    };
    const containerVariants = containerFadeInFast;
    const itemVariants = fadeInUpLarge;
    const parallaxVariants = enableParallax
        ? {
            initial: { y: 0 },
            animate: { y: -20 },
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
            },
        }
        : {};
    return (_jsxs("div", { ref: setRefs, className: cn('relative overflow-hidden', 'liquid-glass-adaptive liquid-glass-depth-2', specularHighlights && 'liquid-glass-specular', sizeClasses[size], className), style: {
            transform: enableMagnetic ? transform : undefined,
            backgroundImage: backgroundImage
                ? `url(${backgroundImage})`
                : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 20%, #4a4a4a 40%, #6b7280 60%, #9ca3af 80%, #e5e7eb 100%)',
            backgroundSize: backgroundImage ? 'cover' : '400% 400%',
            backgroundPosition: 'center',
            backgroundAttachment: enableParallax ? 'fixed' : 'scroll',
            animation: !backgroundImage
                ? 'gradientShift 15s ease infinite'
                : undefined,
        }, ...props, children: [backgroundVideo && (_jsx("video", { autoPlay: true, muted: true, loop: true, playsInline: true, className: "absolute inset-0 w-full h-full object-cover -z-10", children: _jsx("source", { src: backgroundVideo, type: "video/mp4" }) })), _jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/5 dark:from-black/20 dark:via-transparent dark:to-black/40 -z-5" }), _jsxs("div", { className: "absolute inset-0 overflow-hidden -z-10", children: [_jsx(motion.div, { className: "absolute top-1/4 left-1/4 w-96 h-96 rounded-full", style: {
                            background: 'radial-gradient(circle, rgba(156, 163, 175, 0.08) 0%, transparent 70%)',
                            filter: 'blur(60px)',
                        }, animate: {
                            x: [0, 80, 0],
                            y: [0, -40, 0],
                            scale: [1, 1.1, 1],
                        }, transition: {
                            duration: 12,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full", style: {
                            background: 'radial-gradient(circle, rgba(107, 114, 128, 0.06) 0%, transparent 70%)',
                            filter: 'blur(50px)',
                        }, animate: {
                            x: [0, -60, 0],
                            y: [0, 40, 0],
                            scale: [1, 0.9, 1],
                        }, transition: {
                            duration: 14,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 3,
                        } }), _jsx(motion.div, { className: "absolute top-1/2 right-1/3 w-64 h-64 rounded-full", style: {
                            background: 'radial-gradient(circle, rgba(229, 231, 235, 0.04) 0%, transparent 70%)',
                            filter: 'blur(40px)',
                        }, animate: {
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.15, 1],
                        }, transition: {
                            duration: 16,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 5,
                        } })] }), _jsx(motion.div, { className: cn('relative z-10 flex flex-col h-full max-w-7xl mx-auto', variantClasses[variant]), variants: containerVariants, initial: "hidden", animate: "visible", ...parallaxVariants, children: variant === 'split' ? (_jsxs("div", { className: "grid lg:grid-cols-2 gap-12 items-center h-full", children: [_jsxs("div", { className: "space-y-8", children: [subtitle && (_jsx(motion.div, { variants: itemVariants, className: "inline-flex items-center px-4 py-2 rounded-full liquid-glass liquid-glass-specular text-sm font-medium text-[var(--text-secondary)]", children: subtitle })), _jsx(motion.h1, { variants: itemVariants, className: cn('font-bold tracking-tight text-[var(--text-primary)]', titleSizes[size]), children: title }), description && (_jsx(motion.p, { variants: itemVariants, className: "text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed", children: description })), (primaryAction || secondaryAction) && (_jsxs(motion.div, { variants: itemVariants, className: "flex flex-col sm:flex-row gap-4", children: [primaryAction && (_jsx(GlassButton, { variant: "primary", size: "lg", onClick: primaryAction.onClick, leftIcon: primaryAction.icon, className: "min-w-[200px]", children: primaryAction.label })), secondaryAction && (_jsx(GlassButton, { variant: "secondary", size: "lg", onClick: secondaryAction.onClick, leftIcon: secondaryAction.icon, className: "min-w-[200px]", children: secondaryAction.label }))] }))] }), _jsx("div", { className: "relative", children: children })] })) : (_jsxs("div", { className: "flex flex-col justify-center items-center h-full space-y-8 text-center", children: [subtitle && (_jsx(motion.div, { variants: itemVariants, className: "inline-flex items-center px-6 py-3 rounded-full liquid-glass liquid-glass-specular text-sm font-medium text-[var(--text-secondary)]", children: subtitle })), _jsx(motion.h1, { variants: itemVariants, className: cn('font-bold tracking-tight text-[var(--text-primary)] max-w-5xl', titleSizes[size]), children: title }), description && (_jsx(motion.p, { variants: itemVariants, className: "text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed", children: description })), (primaryAction || secondaryAction) && (_jsxs(motion.div, { variants: itemVariants, className: "flex flex-col sm:flex-row gap-6 pt-4", children: [primaryAction && (_jsx(GlassButton, { variant: "primary", size: "xl", onClick: primaryAction.onClick, leftIcon: primaryAction.icon, className: "min-w-[220px]", children: primaryAction.label })), secondaryAction && (_jsx(GlassButton, { variant: "secondary", size: "xl", onClick: secondaryAction.onClick, leftIcon: secondaryAction.icon, className: "min-w-[220px]", children: secondaryAction.label }))] })), children && (_jsx(motion.div, { variants: itemVariants, className: "pt-8", children: children }))] })) }), _jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [_jsx(motion.div, { className: "absolute top-20 right-20 w-4 h-4 liquid-glass rounded-full", animate: {
                            y: [0, -20, 0],
                            opacity: [0.3, 0.7, 0.3],
                        }, transition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        } }), _jsx(motion.div, { className: "absolute bottom-32 left-16 w-6 h-6 liquid-glass rounded-full", animate: {
                            y: [0, 15, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }, transition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1.5,
                        } }), _jsx(motion.div, { className: "absolute top-1/2 right-8 w-3 h-3 liquid-glass rounded-full", animate: {
                            y: [0, -10, 0],
                            x: [0, 5, 0],
                            opacity: [0.4, 0.8, 0.4],
                        }, transition: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 0.8,
                        } })] })] }));
});
GlassHero.displayName = 'GlassHero';
export { GlassHero };
