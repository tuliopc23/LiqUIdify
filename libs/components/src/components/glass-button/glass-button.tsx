"use client";

import * as React from "react";
import { css, cx } from "../../../../../styled-system/css";

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  reduceTransparency?: boolean;
}

function useReduceTransparency(explicit?: boolean) {
  const [reduced, setReduced] = React.useState<boolean>(!!explicit);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // respect explicit prop first
    if (typeof explicit === "boolean") {
      setReduced(explicit);
    }

    const root = document.documentElement;
    const attr = root.getAttribute("data-reduce-transparency");
    if (attr === "true") {
      setReduced(true);
    }

    let mq: MediaQueryList | undefined;
    let handler: ((e: any) => void) | undefined;

    try {
      // @ts-ignore - not in TS lib dom yet
      mq = window.matchMedia && window.matchMedia("(prefers-reduced-transparency: reduce)");
      if (mq && typeof mq.matches === "boolean") {
        setReduced(mq.matches);
        handler = (e: any) => setReduced(!!e.matches);
        mq.addEventListener?.("change", handler as any);
      }
    } catch {}

    return () => {
      if (mq && handler) mq.removeEventListener?.("change", handler as any);
    };
  }, [explicit]);

  return reduced;
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, variant = "primary", reduceTransparency, ...props }, ref) => {
    const reduced = useReduceTransparency(reduceTransparency);

    const base = css({
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      borderRadius: "token(radii.2xl)", // 32px
      paddingInline: "16px",
      paddingBlock: "8px",
      fontWeight: 500,
      lineHeight: 1.2,
      color: "token(colors.text.glass.primary)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "token(colors.glass.border)",
      cursor: "pointer",
      transition: "transform 0.15s ease, box-shadow 0.2s ease, background 0.2s ease",
      backdropFilter: reduced ? "none" : "blur(10px) saturate(140%)",
      boxShadow: "token(shadows.glass.sm)",
      _hover: {
        transform: "translateY(-2px)",
        boxShadow: "token(shadows.glass.hover)",
      },
      _active: {
        transform: "translateY(0)",
        boxShadow: "token(shadows.glass.sm)",
      },
      _disabled: {
        opacity: 0.6,
        cursor: "not-allowed",
        transform: "none",
        boxShadow: "none",
      },
    });

    const primary = css({
      background: reduced
        ? "rgba(255,255,255,0.95)"
        : "token(colors.button.primary.bg)",
      color: "token(colors.text.glass.primary)",
      borderColor: "token(colors.button.primary.border)",
    });

    const secondary = css({
      background: reduced
        ? "rgba(255,255,255,0.92)"
        : "token(colors.button.secondary.bg)",
      color: "token(colors.text.glass.primary)",
      borderColor: "token(colors.button.secondary.border)",
    });

    const variantClass = variant === "primary" ? primary : secondary;

    return (
      <button ref={ref} className={cx(base, variantClass, className)} {...props}>
        {children}
      </button>
    );
  }
);

GlassButton.displayName = "GlassButton";
