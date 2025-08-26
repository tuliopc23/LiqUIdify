import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../core/utils/classname";

export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
  metadata?: Record<string, unknown>;
}

interface BaseChartProps {
  data: Array<ChartDataPoint>;
  width?: number;
  height?: number;
  className?: string;
  animated?: boolean;
  showTooltip?: boolean;
}

interface LineChartProps extends BaseChartProps {
  strokeWidth?: number;
  showDots?: boolean;
  gradient?: boolean;
}

interface BarChartProps extends BaseChartProps {
  orientation?: "vertical" | "horizontal";
  showValues?: boolean;
}

interface DonutChartProps extends BaseChartProps {
  innerRadius?: number;
  showLabels?: boolean;
  centerContent?: React.ReactNode;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  width = 400,
  height = 200,
  className,
  animated = true,
  showTooltip = true,
  strokeWidth = 3,
  showDots = true,
  gradient = true,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (data.length === 0) {
    return (
      <div className={cn("liquid-glass-container liquid-glass-md", className)}>
        <div className="liquid-glass-filter" />
        <div className="liquid-glass-overlay" />
        <div className="liquid-glass-specular" />
        <div className="liquid-glass-content flex items-center justify-center">
          <p className="text-liquid-secondary">No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const range = maxValue - minValue || 1;

  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const points = data.map((d, index) => ({
    x: padding + (index / (data.length - 1)) * chartWidth,
    y: padding + ((maxValue - d.value) / range) * chartHeight,
    data: d,
  }));

  const pathData = points.reduce((path, point, index) => {
    const command = index === 0 ? "M" : "L";
    return `${path} ${command} ${point.x} ${point.y}`;
  }, "");

  const gradientId = `gradient-${Math.random().toString(36).slice(2, 11)}`;

  return (
    <div className={cn("liquid-glass-container liquid-glass-md", className)}>
      {/* Apple-style liquid glass layers */}
      <div className="liquid-glass-filter" />
      <div className="liquid-glass-overlay" />
      <div className="liquid-glass-specular" />

      <div className="liquid-glass-content p-liquid">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="overflow-visible"
          aria-hidden="true"
        >
          <title>Line Chart</title>
          {gradient && (
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--lg-red)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--lg-red)" stopOpacity="0" />
              </linearGradient>
            </defs>
          )}

          {/* Grid lines with Apple-style subtle appearance */}
          <g className="opacity-10">
            {Array.from({ length: 5 }).map((_, index) => {
              const y = padding + (index / 4) * chartHeight;
              return (
                <line
                  key={`grid-line-y-${y}-${index}`}
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth={1}
                  strokeDasharray="2,2"
                />
              );
            })}
          </g>

          {/* Gradient area with Apple-style liquid-glass effect */}
          {gradient && points.length > 0 && (
            <path
              d={`${pathData} L ${points.at(-1)?.x} ${height - padding} L ${padding} ${height - padding} Z`}
              fill={`url(#${gradientId})`}
              className={cn(
                animated && "transition-all duration-1000 ease-out",
              )}
              style={{
                opacity: mounted ? 1 : 0,
              }}
            />
          )}

          {/* Main line with Apple accent color */}
          <path
            d={pathData}
            fill="none"
            stroke="var(--lg-red)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(animated && "transition-all duration-1000 ease-out")}
            style={{
              strokeDasharray: animated ? (mounted ? "none" : "1000") : "none",
              strokeDashoffset: animated ? (mounted ? "0" : "1000") : "0",
            }}
          />

          {/* Data points with Apple-style glow */}
          {showDots &&
            points.map((point, index) => (
              <circle
                key={`point-${point.data.label}-${point.data.value}-${index}`}
                cx={point.x}
                cy={point.y}
                r={hoveredPoint === index ? 6 : 4}
                fill="var(--lg-red)"
                stroke="white"
                strokeWidth="2"
                className={cn(
                  "transition-all duration-200",
                  animated && "zoom-in-0 animate-in duration-500",
                  hoveredPoint === index && "drop-shadow-lg",
                )}
                style={{
                  animationDelay: animated ? `${index * 100}ms` : "0ms",
                  filter:
                    hoveredPoint === index
                      ? "drop-shadow(0 0 8px var(--lg-red))"
                      : undefined,
                  cursor: "pointer",
                }}
                onMouseEnter={() => setHoveredPoint(index)}
                onMouseLeave={() => setHoveredPoint(null)}
                role="button"
                tabIndex={0}
                aria-label={`Data point: ${point.data.label}, value: ${point.data.value}`}
              />
            ))}
        </svg>

        {/* Apple-style tooltip */}
        {showTooltip && hoveredPoint !== null && points[hoveredPoint] && (
          <div
            className="pointer-events-none absolute z-10 liquid-glass-container liquid-glass-sm"
            style={{
              left: points[hoveredPoint]?.x - 40,
              top: points[hoveredPoint]?.y - 60,
              transform: "translateX(-50%)",
            }}
          >
            <div className="liquid-glass-filter" />
            <div className="liquid-glass-overlay" />
            <div className="liquid-glass-specular" />
            <div className="liquid-glass-content">
              <div className="text-center">
                <div className="font-medium text-liquid-primary text-sm">
                  {points[hoveredPoint]?.data.label}
                </div>
                <div className="text-liquid-accent font-semibold">
                  {points[hoveredPoint]?.data.value.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 400,
  height = 200,
  className,
  animated = true,
  orientation = "vertical",
  showValues = true,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (data.length === 0) {
    return (
      <div className={cn("liquid-glass-container liquid-glass-md", className)}>
        <div className="liquid-glass-filter" />
        <div className="liquid-glass-overlay" />
        <div className="liquid-glass-specular" />
        <div className="liquid-glass-content flex items-center justify-center">
          <p className="text-liquid-secondary">No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.value));
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const barThickness = Math.min(
    ((orientation === "vertical" ? chartWidth : chartHeight) / data.length) *
      0.6,
    40,
  );

  return (
    <div className={cn("liquid-glass-container liquid-glass-md", className)}>
      {/* Apple-style liquid glass layers */}
      <div className="liquid-glass-filter" />
      <div className="liquid-glass-overlay" />
      <div className="liquid-glass-specular" />

      <div className="liquid-glass-content p-liquid">
        <svg
          width={width}
          height={height}
          className="overflow-visible"
          aria-hidden="true"
        >
          <title>Bar Chart</title>
          {data.map((item, index) => {
            const barLength =
              (item.value / maxValue) *
              (orientation === "vertical" ? chartHeight : chartWidth);
            const x =
              orientation === "vertical"
                ? padding +
                  (index / data.length) * chartWidth +
                  (chartWidth / data.length - barThickness) / 2
                : padding;
            const y =
              orientation === "vertical"
                ? height - padding - barLength
                : padding +
                  (index / data.length) * chartHeight +
                  (chartHeight / data.length - barThickness) / 2;
            const barWidth =
              orientation === "vertical" ? barThickness : barLength;
            const barHeight =
              orientation === "vertical" ? barLength : barThickness;

            return (
              <g key={`bar-${item.label}-${index}`}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={item.color || "var(--lg-red)"}
                  rx="8"
                  className={cn(
                    "transition-all duration-500 ease-out",
                    animated && "fade-in-0 slide-in-from-bottom-4 animate-in",
                  )}
                  style={{
                    animationDelay: animated ? `${index * 100}ms` : "0ms",
                    transform: mounted ? "scaleY(1)" : "scaleY(0)",
                    transformOrigin: "bottom",
                    filter: "drop-shadow(0 2px 8px rgb(var(--lg-text-rgb) / 0.1))",
                  }}
                />
                {showValues && (
                  <text
                    x={x + barWidth / 2}
                    y={y - 8}
                    textAnchor="middle"
                    className="fill-liquid-secondary text-xs font-medium"
                  >
                    {item.value.toLocaleString()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  width = 200,
  height = 200,
  className,
  animated = true,
  innerRadius = 60,
  showLabels = true,
  centerContent,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (data.length === 0) {
    return (
      <div className={cn("liquid-glass-container liquid-glass-md", className)}>
        <div className="liquid-glass-filter" />
        <div className="liquid-glass-overlay" />
        <div className="liquid-glass-specular" />
        <div className="liquid-glass-content flex items-center justify-center">
          <p className="text-liquid-secondary">No data available</p>
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = Math.min(width, height) / 2 - 20;
  const centerX = width / 2;
  const centerY = height / 2;

  let cumulativePercentage = 0;

  const segments = data.map((item, index) => {
    const percentage = item.value / total;
    const startAngle = cumulativePercentage * 2 * Math.PI - Math.PI / 2;
    const endAngle =
      (cumulativePercentage + percentage) * 2 * Math.PI - Math.PI / 2;

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
      "Z",
    ].join(" ");

    cumulativePercentage += percentage;

    const hue = index === 0 ? 351 : (index * 60) % 360; // Start with red accent, then cycle through hues
    const defaultColor =
      index === 0 ? "var(--lg-red)" : `hsl(${hue}, 70%, 60%)`;

    return {
      path: pathData,
      color: item.color || defaultColor,
      percentage,
      ...item,
    };
  });

  return (
    <div className={cn("liquid-glass-container liquid-glass-md", className)}>
      {/* Apple-style liquid glass layers */}
      <div className="liquid-glass-filter" />
      <div className="liquid-glass-overlay" />
      <div className="liquid-glass-specular" />

      <div className="liquid-glass-content p-liquid relative">
        <svg width={width} height={height} aria-hidden="true">
          <title>Donut Chart</title>
          {segments.map((segment, index) => (
            <path
              key={`segment-${index}-${segment.color}`}
              d={segment.path}
              fill={segment.color}
              className={cn(
                "transition-all duration-500 ease-out hover:opacity-80",
                animated && "fade-in-0 animate-in",
              )}
              style={{
                animationDelay: animated ? `${index * 150}ms` : "0ms",
                transform: mounted ? "scale(1)" : "scale(0)",
                transformOrigin: `${centerX}px ${centerY}px`,
                filter: "drop-shadow(0 2px 8px rgb(var(--lg-text-rgb) / 0.1))",
              }}
            />
          ))}
        </svg>

        {/* Center content with Apple-style positioning */}
        {centerContent && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              width: innerRadius * 2,
              height: innerRadius * 2,
              left: centerX - innerRadius,
              top: centerY - innerRadius,
            }}
          >
            {centerContent}
          </div>
        )}

        {/* Apple-style labels */}
        {showLabels && !centerContent && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="font-bold text-2xl text-liquid-primary">
                {total.toLocaleString()}
              </div>
              <div className="text-liquid-secondary text-sm font-medium">
                Total
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
