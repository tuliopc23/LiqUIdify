"use client";

import * as React from "react";
import { useCallback, useState } from "react";

// CSS-in-JS styles for liquid glass buttons (from HTML demo)
const styles = {
  // Base liquid glass button
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: 500,
    color: "white",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    cursor: "pointer",
    position: "relative" as const,
    userSelect: "none" as const,
    whiteSpace: "nowrap" as const,
    overflow: "hidden",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",

    // Glass effects from HTML demo
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    boxShadow: `
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 2px 4px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.4),
      inset 0 -1px 0 rgba(0, 0, 0, 0.15),
      0 0 20px rgba(255, 255, 255, 0.1)
    `,
    transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
    transformOrigin: "center center",
  },

  // Pseudo-element styles (applied via ::before and ::after classes)
  beforeGlass: {
    content: '""',
    position: "absolute" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "inherit",
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
    pointerEvents: "none" as const,
    zIndex: 1,
  },

  afterGlass: {
    content: '""',
    position: "absolute" as const,
    top: "2px",
    left: "2px",
    right: "2px",
    bottom: "2px",
    borderRadius: "inherit",
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.05) 100%)",
    pointerEvents: "none" as const,
    zIndex: 0,
  },

  // Size variants
  sizes: {
    sm: {
      padding: "8px 16px",
      fontSize: "14px",
      borderRadius: "12px",
      minHeight: "36px",
    },
    md: {
      padding: "12px 24px",
      fontSize: "16px",
      borderRadius: "16px",
      minHeight: "44px",
    },
    lg: {
      padding: "16px 32px",
      fontSize: "18px",
      borderRadius: "20px",
      minHeight: "52px",
    },
    xl: {
      padding: "20px 40px",
      fontSize: "20px",
      borderRadius: "24px",
      minHeight: "60px",
    },
  },

  // Variant styles
  variants: {
    primary: {
      background:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)",
      borderColor: "rgba(96, 165, 250, 0.4)",
    },
    secondary: {
      background: "rgba(255, 255, 255, 0.1)",
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    ghost: {
      background: "transparent",
      borderColor: "rgba(255, 255, 255, 0.1)",
    },
    danger: {
      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%)",
      borderColor: "rgba(248, 113, 113, 0.4)",
    },
  },

  // State styles
  hover: {
    transform: "translateY(-2px)",
    borderColor: "rgba(255, 255, 255, 0.4)",
    boxShadow: `
      0 16px 50px rgba(0, 0, 0, 0.2),
      inset 0 2px 4px rgba(0, 0, 0, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.5),
      inset 0 -1px 0 rgba(0, 0, 0, 0.15),
      0 0 30px rgba(255, 255, 255, 0.15)
    `,
  },

  active: {
    transform: "translateY(1px) scale(0.96)",
    borderColor: "rgba(255, 255, 255, 0.5)",
    transition: "all 0.1s cubic-bezier(0.23, 1, 0.32, 1)",
  },

  disabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    pointerEvents: "none" as const,
  },

  // Loading spinner
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },

  // Icon container
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    position: "relative" as const,
    zIndex: 2,
  },

  // Content container
  content: {
    position: "relative" as const,
    zIndex: 2,
  },

  // Ripple effect
  ripple: {
    position: "absolute" as const,
    borderRadius: "50%",
    background: "rgba(255, 255, 255, 0.4)",
    transform: "translate(-50%, -50%)",
    animation: "liquidRipple 0.6s ease-out",
    pointerEvents: "none" as const,
    zIndex: 5,
  },
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  rippleEffect?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      style = {},
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon,
      iconPosition = "left",
      rippleEffect = true,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseUp,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const rippleCounter = React.useRef(0);

    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;

        // Ripple effect from HTML demo
        if (rippleEffect) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const rippleId = rippleCounter.current++;

          setRipples((prev) => [...prev, { id: rippleId, x, y }]);

          setTimeout(() => {
            setRipples((prev) => prev.filter((ripple) => ripple.id !== rippleId));
          }, 600);
        }

        onClick?.(e);
      },
      [disabled, loading, rippleEffect, onClick]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      },
      [onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsHovered(false);
        setIsPressed(false);
        onMouseLeave?.(e);
      },
      [onMouseLeave]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(true);
        onMouseDown?.(e);
      },
      [onMouseDown]
    );

    const handleMouseUp = useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsPressed(false);
        onMouseUp?.(e);
      },
      [onMouseUp]
    );

    // Combine styles
    const buttonStyle = {
      ...styles.base,
      ...styles.sizes[size],
      ...styles.variants[variant],
      ...(isHovered && styles.hover),
      ...(isPressed && styles.active),
      ...((disabled || loading) && styles.disabled),
      ...style,
    };

    return (
      <>
        {/* Add keyframes to document head */}
        {typeof document !== "undefined" &&
          (() => {
            const style = document.createElement("style");
            style.textContent = `
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes liquidRipple {
              0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
              50% { opacity: 0.6; }
              100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
            }
          `;
            if (!document.head.querySelector("#liquid-keyframes")) {
              style.id = "liquid-keyframes";
              document.head.appendChild(style);
            }
            return null;
          })()}

        <button
          ref={ref}
          style={buttonStyle}
          disabled={disabled || loading}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          {...props}
        >
          {/* Glass pseudo-elements */}
          <div style={styles.beforeGlass} />
          <div style={styles.afterGlass} />

          {/* Button content */}
          {loading && <div style={styles.spinner} />}

          {icon && iconPosition === "left" && !loading && <span style={styles.icon}>{icon}</span>}

          <span
            style={{
              ...styles.content,
              opacity: loading ? 0.7 : 1,
            }}
          >
            {children}
          </span>

          {icon && iconPosition === "right" && !loading && <span style={styles.icon}>{icon}</span>}

          {/* Dynamic ripples */}
          {ripples.map((ripple) => (
            <div
              key={ripple.id}
              style={{
                ...styles.ripple,
                left: `${ripple.x}px`,
                top: `${ripple.y}px`,
                width: "8px",
                height: "8px",
              }}
            />
          ))}
        </button>
      </>
    );
  }
);

Button.displayName = "Button";

export type { ButtonProps };
