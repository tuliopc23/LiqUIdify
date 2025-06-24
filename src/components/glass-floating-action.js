import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { forwardRef, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/glass-utils";
import { useLiquidGlass } from "@/hooks/use-liquid-glass";
import { useMagneticHover, createGlassRipple } from "@/lib/glass-physics";
const GlassFloatingAction = forwardRef(({ className, mainIcon, actions = [], position = "bottom-right", size = "md", variant = "default", enableMagnetic = true, expandDirection = "up", tooltip, onClick, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const buttonRef = useRef(null);
    const { specularHighlights } = useLiquidGlass();
    const { elementRef: magneticRef, transform } = useMagneticHover(0.4, 80);
    const positionClasses = {
        "bottom-right": "fixed bottom-6 right-6 z-50",
        "bottom-left": "fixed bottom-6 left-6 z-50",
        "top-right": "fixed top-6 right-6 z-50",
        "top-left": "fixed top-6 left-6 z-50",
        "center": "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    };
    const sizeClasses = {
        sm: "w-12 h-12",
        md: "w-14 h-14",
        lg: "w-16 h-16"
    };
    const iconSizes = {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7"
    };
    const handleMainClick = (e) => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            createGlassRipple(buttonRef.current, x, y, 'rgba(255, 255, 255, 0.4)');
        }
        if (actions.length > 0) {
            setIsExpanded(!isExpanded);
        }
        else {
            onClick?.(e);
        }
    };
    const getActionPosition = (index) => {
        const distance = 70;
        const actionCount = actions.length;
        switch (expandDirection) {
            case "up":
                return { x: 0, y: -(distance * (index + 1)) };
            case "down":
                return { x: 0, y: distance * (index + 1) };
            case "left":
                return { x: -(distance * (index + 1)), y: 0 };
            case "right":
                return { x: distance * (index + 1), y: 0 };
            case "radial":
                const angle = (index * 360) / actionCount;
                const radian = (angle * Math.PI) / 180;
                return {
                    x: Math.cos(radian) * distance,
                    y: Math.sin(radian) * distance
                };
            default:
                return { x: 0, y: -(distance * (index + 1)) };
        }
    };
    const getColorClasses = (color = "primary") => {
        const colors = {
            primary: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/25",
            secondary: "liquid-glass text-[var(--text-primary)]",
            success: "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-green-500/25",
            warning: "bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-yellow-500/25",
            error: "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/25"
        };
        return colors[color];
    };
    return (_jsxs("div", { ref: ref, className: cn(positionClasses[position], className), ...props, children: [_jsx(AnimatePresence, { children: isExpanded && actions.map((action, index) => {
                    const position = getActionPosition(index);
                    return (_jsx(motion.div, { className: "absolute", initial: { scale: 0, opacity: 0 }, animate: {
                            scale: 1,
                            opacity: 1,
                            x: position.x,
                            y: position.y
                        }, exit: { scale: 0, opacity: 0, x: 0, y: 0 }, transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: index * 0.05
                        }, children: _jsxs(motion.button, { className: cn("relative group flex items-center justify-center rounded-full shadow-lg", "liquid-glass liquid-glass-interactive liquid-glass-ripple", specularHighlights && "liquid-glass-specular", sizeClasses[size === "lg" ? "md" : "sm"], getColorClasses(action.color)), onClick: () => {
                                action.onClick();
                                setIsExpanded(false);
                            }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: [_jsx("span", { className: iconSizes[size === "lg" ? "md" : "sm"], children: action.icon }), _jsx(motion.div, { className: "absolute whitespace-nowrap px-3 py-1 liquid-glass liquid-glass-specular rounded-lg text-xs font-medium text-[var(--text-primary)] pointer-events-none", style: {
                                        [expandDirection === "left" ? "right" : "left"]: expandDirection === "left" || expandDirection === "right" ? "100%" : "50%",
                                        [expandDirection === "up" ? "bottom" : "top"]: expandDirection === "up" || expandDirection === "down" ? "100%" : "50%",
                                        transform: expandDirection === "radial" ? "translate(-50%, -50%)" :
                                            expandDirection === "left" || expandDirection === "right" ? "translateY(-50%)" : "translateX(-50%)",
                                        marginLeft: expandDirection === "left" ? "-8px" : expandDirection === "right" ? "8px" : "0",
                                        marginTop: expandDirection === "up" ? "-8px" : expandDirection === "down" ? "8px" : "0"
                                    }, initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.2 }, children: action.label })] }) }, index));
                }) }), _jsxs(motion.button, { ref: (node) => {
                    buttonRef.current = node;
                    if (enableMagnetic && magneticRef) {
                        magneticRef.current = node;
                    }
                }, className: cn("relative group flex items-center justify-center rounded-full shadow-xl", "liquid-glass liquid-glass-interactive liquid-glass-ripple", variant === "glow" && "liquid-glass-glow", specularHighlights && "liquid-glass-specular liquid-glass-shimmer", enableMagnetic && "liquid-glass-magnetic", sizeClasses[size], variant === "default" && "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/25", variant === "minimal" && "liquid-glass text-[var(--text-primary)]", variant === "glow" && "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-purple-500/25"), style: {
                    transform: enableMagnetic ? transform : undefined
                }, onClick: handleMainClick, onMouseEnter: () => setShowTooltip(true), onMouseLeave: () => setShowTooltip(false), whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, animate: isExpanded ? { rotate: 45 } : { rotate: 0 }, transition: { type: "spring", stiffness: 300, damping: 20 }, children: [_jsx(motion.span, { className: iconSizes[size], animate: isExpanded ? { rotate: 45 } : { rotate: 0 }, transition: { type: "spring", stiffness: 300, damping: 20 }, children: mainIcon }), _jsx(motion.div, { className: "absolute inset-0 rounded-full border-2 border-current", animate: {
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5]
                        }, transition: {
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        } })] }), _jsx(AnimatePresence, { children: tooltip && showTooltip && !isExpanded && (_jsx(motion.div, { className: "absolute whitespace-nowrap px-3 py-2 liquid-glass liquid-glass-specular rounded-lg text-sm font-medium text-[var(--text-primary)] pointer-events-none", style: {
                        [position.includes("right") ? "right" : "left"]: "100%",
                        [position.includes("bottom") ? "bottom" : "top"]: "50%",
                        transform: "translateY(-50%)",
                        marginRight: position.includes("right") ? "12px" : "0",
                        marginLeft: position.includes("left") ? "12px" : "0"
                    }, initial: { opacity: 0, scale: 0.8, x: position.includes("right") ? 10 : -10 }, animate: { opacity: 1, scale: 1, x: 0 }, exit: { opacity: 0, scale: 0.8, x: position.includes("right") ? 10 : -10 }, transition: { type: "spring", stiffness: 300, damping: 20 }, children: tooltip })) }), _jsx(AnimatePresence, { children: isExpanded && (_jsx(motion.div, { className: "fixed inset-0 bg-black/10 backdrop-blur-sm -z-10", initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: () => setIsExpanded(false) })) })] }));
});
GlassFloatingAction.displayName = "GlassFloatingAction";
export { GlassFloatingAction };
