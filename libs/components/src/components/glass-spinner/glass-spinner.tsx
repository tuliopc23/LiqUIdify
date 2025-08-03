import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../core/utils/classname";

// Variant mappings using Tailwind classes
const VARIANT_CLASSES = {
  default: "border-liquid-glass-hl/20 border-t-blue-400",
  primary: "border-liquid-glass-hl/20 border-t-blue-500",
  secondary: "border-liquid-glass-hl/20 border-t-purple-400",
  success: "border-liquid-glass-hl/20 border-t-green-400",
  warning: "border-liquid-glass-hl/20 border-t-yellow-400",
  error: "border-liquid-glass-hl/20 border-t-red-400",
  "liquid-glass":
    "border-liquid-glass-hl/10 border-t-liquid-glass-hl/50 backdrop-blur-liquid-glass",
};

const SIZE_CLASSES = {
  xs: "h-3 w-3 border",
  sm: "h-4 w-4 border",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
  xl: "h-12 w-12 border-2",
  "2xl": "h-16 w-16 border-4",
};

const SPEED_CLASSES = {
  slow: "animate-spin",
  normal: "animate-spin",
  fast: "animate-spin",
};

interface GlassSpinnerProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    keyof React.AriaAttributes
  > {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
  speed?: keyof typeof SPEED_CLASSES;
  orientation?: "horizontal" | "vertical";
  label?: string;
  showLabel?: boolean;
  centered?: boolean;
}

const GlassSpinner = React.forwardRef<HTMLDivElement, GlassSpinnerProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      speed = "normal",
      orientation = "horizontal",
      label = "Loading...",
      showLabel = false,
      centered = false,
      ...props
    },
    ref,
  ) => {
    const SpinnerElement = () => (
      <motion.div
        className={cn(
          "inline-block rounded-full border-2 border-solid",
          VARIANT_CLASSES[variant],
          SIZE_CLASSES[size],
          SPEED_CLASSES[speed],
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: speed === "slow" ? 2 : speed === "fast" ? 0.5 : 1,
          repeat: Infinity,
          ease: "linear",
        }}
        role="status"
        aria-label={label}
      />
    );

    const content = (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center",
          orientation === "horizontal"
            ? "flex-row space-x-2"
            : "flex-col space-y-2",
          centered && "fixed inset-0 z-50 bg-black/20 backdrop-blur-sm",
          className,
        )}
        {...props}
      >
        <SpinnerElement />
        {showLabel && (
          <span className="select-none text-sm text-liquid-primary/70">
            {label}
          </span>
        )}
      </div>
    );

    return content;
  },
);

// Pulse spinner variant with Tailwind classes
export const PulseSpinner: React.FC<{
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}> = ({ className, size = "md", color = "white" }) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4",
  };

  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={`pulse-${index}`}
          className={cn(
            "rounded-full bg-liquid-glass-hl/50",
            sizeClasses[size],
          )}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Dots spinner variant with Tailwind classes
export const DotsSpinner: React.FC<{
  className?: string;
  size?: "sm" | "md" | "lg";
  count?: number;
}> = ({ className, size = "md", count = 3 }) => {
  const sizeClasses = {
    sm: "w-1.5 h-1.5",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  return (
    <div className={cn("flex space-x-1", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={`dot-${index}`}
          className={cn(
            "rounded-full bg-liquid-glass-hl/60",
            sizeClasses[size],
          )}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Ring spinner variant with Tailwind classes
export const RingSpinner: React.FC<{
  className?: string;
  size?: "sm" | "md" | "lg";
  thickness?: number;
}> = ({ className, size = "md", thickness = 2 }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <motion.div
      className={cn(
        "rounded-full border-liquid-glass-hl/20",
        sizeClasses[size],
        className,
      )}
      style={{
        borderWidth: thickness,
        borderTopColor: "rgba(59, 130, 246, 0.8)",
      }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    />
  );
};

// Glass wave spinner with Tailwind classes
export const WaveSpinner: React.FC<{
  className?: string;
  bars?: number;
}> = ({ className, bars = 5 }) => {
  return (
    <div className={cn("flex items-end space-x-1", className)}>
      {Array.from({ length: bars }).map((_, index) => (
        <motion.div
          key={`wave-bar-${index}`}
          className="w-1 liquid-glass-sm bg-gradient-to-t from-blue-400 to-purple-400"
          animate={{
            height: [8, 24, 8],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

GlassSpinner.displayName = "GlassSpinner";

export { GlassSpinner };
