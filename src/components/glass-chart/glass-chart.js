import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useEffect, useState } from "react";
import { cn, getGlassClass } from "@/lib/glass-utils";
export const LineChart = ({ data, width = 400, height = 200, className, animated = true, showTooltip = true, strokeWidth = 3, showDots = true, gradient = true }) => {
    const svgRef = useRef(null);
    const [hoveredPoint, setHoveredPoint] = useState(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!data.length)
        return null;
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const points = data.map((d, i) => ({
        x: padding + (i / (data.length - 1)) * chartWidth,
        y: padding + ((maxValue - d.value) / range) * chartHeight,
        data: d
    }));
    const pathData = points.reduce((path, point, i) => {
        const command = i === 0 ? "M" : "L";
        return `${path} ${command} ${point.x} ${point.y}`;
    }, "");
    const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
    return (_jsxs("div", { className: cn("relative", className), children: [_jsxs("svg", { ref: svgRef, width: width, height: height, className: "overflow-visible", children: [gradient && (_jsx("defs", { children: _jsxs("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "var(--glass-primary)", stopOpacity: "0.2" }), _jsx("stop", { offset: "100%", stopColor: "var(--glass-primary)", stopOpacity: "0" })] }) })), _jsx("g", { className: "opacity-20", children: [...Array(5)].map((_, i) => {
                            const y = padding + (i / 4) * chartHeight;
                            return (_jsx("line", { x1: padding, y1: y, x2: width - padding, y2: y, stroke: "var(--text-secondary)", strokeWidth: "1", strokeDasharray: "2,2" }, i));
                        }) }), gradient && (_jsx("path", { d: `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${padding} ${height - padding} Z`, fill: `url(#${gradientId})`, className: cn(animated && "transition-all duration-1000 ease-out"), style: {
                            opacity: mounted ? 1 : 0
                        } })), _jsx("path", { d: pathData, fill: "none", stroke: "var(--glass-primary)", strokeWidth: strokeWidth, strokeLinecap: "round", strokeLinejoin: "round", className: cn(animated && "transition-all duration-1000 ease-out"), style: {
                            strokeDasharray: animated ? (mounted ? "none" : "1000") : "none",
                            strokeDashoffset: animated ? (mounted ? "0" : "1000") : "0"
                        } }), showDots && points.map((point, i) => (_jsx("circle", { cx: point.x, cy: point.y, r: hoveredPoint === i ? 6 : 4, fill: "var(--glass-primary)", stroke: "white", strokeWidth: "2", className: cn("cursor-pointer transition-all duration-200", animated && "animate-in zoom-in-0 duration-500", hoveredPoint === i && "shadow-lg"), style: {
                            animationDelay: animated ? `${i * 100}ms` : "0ms"
                        }, onMouseEnter: () => setHoveredPoint(i), onMouseLeave: () => setHoveredPoint(null) }, i)))] }), showTooltip && hoveredPoint !== null && (_jsxs("div", { className: cn("absolute z-10 px-3 py-2 rounded-lg text-sm pointer-events-none", getGlassClass("elevated"), "border border-[var(--glass-border)]"), style: {
                    left: points[hoveredPoint].x - 40,
                    top: points[hoveredPoint].y - 60,
                    transform: "translateX(-50%)"
                }, children: [_jsx("div", { className: "font-medium text-[var(--text-primary)]", children: points[hoveredPoint].data.label }), _jsx("div", { className: "text-[var(--text-secondary)]", children: points[hoveredPoint].data.value.toLocaleString() })] }))] }));
};
export const BarChart = ({ data, width = 400, height = 200, className, animated = true, orientation = "vertical", showValues = true }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!data.length)
        return null;
    const maxValue = Math.max(...data.map(d => d.value));
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const barThickness = Math.min((orientation === "vertical" ? chartWidth : chartHeight) / data.length * 0.6, 40);
    return (_jsx("div", { className: cn("relative", className), children: _jsx("svg", { width: width, height: height, className: "overflow-visible", children: data.map((item, i) => {
                const barLength = (item.value / maxValue) * (orientation === "vertical" ? chartHeight : chartWidth);
                const x = orientation === "vertical"
                    ? padding + (i / data.length) * chartWidth + (chartWidth / data.length - barThickness) / 2
                    : padding;
                const y = orientation === "vertical"
                    ? height - padding - barLength
                    : padding + (i / data.length) * chartHeight + (chartHeight / data.length - barThickness) / 2;
                const barWidth = orientation === "vertical" ? barThickness : barLength;
                const barHeight = orientation === "vertical" ? barLength : barThickness;
                return (_jsxs("g", { children: [_jsx("rect", { x: x, y: y, width: barWidth, height: barHeight, fill: item.color || "var(--glass-primary)", rx: "4", className: cn("transition-all duration-500 ease-out", animated && "animate-in fade-in-0 slide-in-from-bottom-4"), style: {
                                animationDelay: animated ? `${i * 100}ms` : "0ms",
                                transform: mounted ? "scaleY(1)" : "scaleY(0)",
                                transformOrigin: "bottom"
                            } }), showValues && (_jsx("text", { x: x + barWidth / 2, y: y - 8, textAnchor: "middle", className: "text-xs fill-[var(--text-secondary)]", children: item.value.toLocaleString() }))] }, i));
            }) }) }));
};
export const DonutChart = ({ data, width = 200, height = 200, className, animated = true, innerRadius = 60, showLabels = true, centerContent }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!data.length)
        return null;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const radius = Math.min(width, height) / 2 - 20;
    const centerX = width / 2;
    const centerY = height / 2;
    let cumulativePercentage = 0;
    const segments = data.map((item, i) => {
        const percentage = item.value / total;
        const startAngle = cumulativePercentage * 2 * Math.PI - Math.PI / 2;
        const endAngle = (cumulativePercentage + percentage) * 2 * Math.PI - Math.PI / 2;
        const largeArcFlag = percentage > 0.5 ? 1 : 0;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);
        const innerX1 = centerX + innerRadius * Math.cos(startAngle);
        const innerY1 = centerY + innerRadius * Math.sin(startAngle);
        const innerX2 = centerX + innerRadius * Math.cos(endAngle);
        const innerY2 = centerY + innerRadius * Math.sin(endAngle);
        const pathData = [
            `M ${x1} ${y1}`,
            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
            `L ${innerX2} ${innerY2}`,
            `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerX1} ${innerY1}`,
            "Z"
        ].join(" ");
        cumulativePercentage += percentage;
        return {
            path: pathData,
            color: item.color || `hsl(${(i * 360) / data.length}, 70%, 60%)`,
            percentage,
            ...item
        };
    });
    return (_jsxs("div", { className: cn("relative", className), children: [_jsx("svg", { width: width, height: height, children: segments.map((segment, i) => (_jsx("path", { d: segment.path, fill: segment.color, className: cn("transition-all duration-500 ease-out hover:opacity-80", animated && "animate-in fade-in-0"), style: {
                        animationDelay: animated ? `${i * 150}ms` : "0ms",
                        transform: mounted ? "scale(1)" : "scale(0)",
                        transformOrigin: `${centerX}px ${centerY}px`
                    } }, i))) }), centerContent && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", style: {
                    width: innerRadius * 2,
                    height: innerRadius * 2,
                    left: centerX - innerRadius,
                    top: centerY - innerRadius
                }, children: centerContent })), showLabels && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--text-primary)]", children: total.toLocaleString() }), _jsx("div", { className: "text-sm text-[var(--text-secondary)]", children: "Total" })] }) }))] }));
};
