import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/glass-utils';
import { useLiquidGlass, useContentAwareGlass } from '@/hooks/use-liquid-glass';
import { useMagneticHover } from '@/lib/glass-physics';
import { easeInOut, fadeInUp, containerFadeIn, } from '@/lib/framer-motion-constants';
const GlassFeatureShowcase = forwardRef(({ className, title, subtitle, description, features, layout = 'grid', columns = 3, variant = 'default', enableMagnetic = false, enableParallax = true, children, ...props }, ref) => {
    const contentRef = useRef(null);
    const { specularHighlights } = useLiquidGlass();
    const contentAnalysis = useContentAwareGlass(contentRef);
    const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    };
    const containerVariants = containerFadeIn;
    const itemVariants = fadeInUp;
    const FeatureCard = ({ feature, index, }) => {
        const cardRef = useRef(null);
        const { elementRef: magneticRef, transform } = useMagneticHover(0.15, 100);
        return (_jsxs(motion.div, { ref: node => {
                cardRef.current = node;
                if (enableMagnetic && magneticRef) {
                    magneticRef.current = node;
                }
            }, variants: itemVariants, className: cn('group relative', variant === 'cards' &&
                'liquid-glass liquid-glass-interactive liquid-glass-depth-2 p-6 rounded-2xl', variant === 'floating' &&
                'liquid-glass liquid-glass-interactive liquid-glass-depth-3 p-8 rounded-3xl liquid-glass-glow', variant === 'minimal' && 'p-6', variant === 'default' &&
                'liquid-glass liquid-glass-interactive p-6 rounded-xl', specularHighlights && 'liquid-glass-specular liquid-glass-shimmer', enableMagnetic && 'liquid-glass-magnetic'), style: {
                transform: enableMagnetic ? transform : undefined,
            }, whileHover: variant === 'floating' ? { y: -8, scale: 1.02 } : { y: -4 }, transition: easeInOut, children: [feature.image && (_jsxs("div", { className: "relative mb-6 overflow-hidden rounded-xl", children: [_jsx("img", { src: feature.image, alt: feature.title, className: "w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110" }), feature.badge && (_jsx("div", { className: "absolute top-4 left-4 px-3 py-1 liquid-glass liquid-glass-specular rounded-full text-xs font-medium text-[var(--text-primary)]", children: feature.badge }))] })), _jsx("div", { className: cn('flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110', variant === 'floating' ? 'w-16 h-16' : 'w-12 h-12', 'liquid-glass liquid-glass-specular rounded-2xl'), children: feature.icon }), _jsxs("div", { className: "space-y-3", children: [_jsx("h3", { className: cn('font-semibold text-[var(--text-primary)] transition-colors duration-300', variant === 'floating' ? 'text-xl' : 'text-lg'), children: feature.title }), _jsx("p", { className: "text-[var(--text-secondary)] leading-relaxed", children: feature.description }), feature.link && (_jsx("div", { className: "pt-2", children: feature.link.href ? (_jsxs("a", { href: feature.link.href, className: "inline-flex items-center text-sm font-medium text-[var(--glass-primary)] hover:text-[var(--glass-primary-hover)] transition-colors duration-200", children: [feature.link.label, _jsx("svg", { className: "ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] })) : (_jsxs("button", { onClick: feature.link.onClick, className: "inline-flex items-center text-sm font-medium text-[var(--glass-primary)] hover:text-[var(--glass-primary-hover)] transition-colors duration-200", children: [feature.link.label, _jsx("svg", { className: "ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] })) }))] }), _jsx("div", { className: "absolute inset-0 rounded-inherit bg-gradient-to-br from-[var(--glass-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" })] }));
    };
    return (_jsxs("div", { ref: node => {
            contentRef.current = node;
            if (typeof ref === 'function') {
                ref(node);
            }
            else if (ref) {
                ref.current = node;
            }
        }, className: cn('relative py-16 px-6 md:py-24 md:px-8', className), ...props, children: [enableParallax && (_jsx("div", { className: "absolute inset-0 overflow-hidden pointer-events-none", children: _jsx(motion.div, { className: "absolute top-1/4 right-1/4 w-32 h-32 rounded-full", style: {
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                    }, animate: {
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.1, 1],
                    }, transition: {
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    } }) })), _jsxs("div", { className: "relative max-w-7xl mx-auto", children: [(title || subtitle || description) && (_jsxs(motion.div, { className: "text-center mb-16", variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: '-100px' }, children: [subtitle && (_jsx(motion.div, { variants: itemVariants, className: "inline-flex items-center px-4 py-2 mb-4 rounded-full liquid-glass liquid-glass-specular text-sm font-medium text-[var(--text-secondary)]", children: subtitle })), title && (_jsx(motion.h2, { variants: itemVariants, className: "text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-6", children: title })), description && (_jsx(motion.p, { variants: itemVariants, className: "text-lg text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed", children: description }))] })), _jsx(motion.div, { className: cn('grid gap-8', layout === 'grid' && gridClasses[columns], layout === 'masonry' &&
                            'columns-1 md:columns-2 lg:columns-3 space-y-8', layout === 'stacked' && 'space-y-8'), variants: containerVariants, initial: "hidden", whileInView: "visible", viewport: { once: true, margin: '-50px' }, children: features.map((feature, index) => (_jsx(FeatureCard, { feature: feature, index: index }, index))) }), children && (_jsx(motion.div, { className: "mt-16", variants: itemVariants, initial: "hidden", whileInView: "visible", viewport: { once: true }, children: children }))] }), _jsxs("div", { className: "absolute inset-0 pointer-events-none overflow-hidden", children: [_jsx(motion.div, { className: "absolute top-1/3 left-8 w-2 h-2 liquid-glass rounded-full", animate: {
                            y: [0, -15, 0],
                            opacity: [0.2, 0.6, 0.2],
                        }, transition: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        } }), _jsx(motion.div, { className: "absolute bottom-1/4 right-12 w-3 h-3 liquid-glass rounded-full", animate: {
                            y: [0, 10, 0],
                            opacity: [0.3, 0.7, 0.3],
                        }, transition: {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1,
                        } })] })] }));
});
GlassFeatureShowcase.displayName = 'GlassFeatureShowcase';
export { GlassFeatureShowcase };
