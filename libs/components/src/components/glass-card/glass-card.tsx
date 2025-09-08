"use client";

import * as React from "react";
import { css, cx } from "../../../../../styled-system/css";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  reduceTransparency?: boolean;
}

function useReduceTransparency(explicit?: boolean) {
  const [reduced, setReduced] = React.useState<boolean>(!!explicit);
  React.useEffect(() => {
    if (typeof window === "undefined") return;

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
      // @ts-ignore
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

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, children, elevated = true, reduceTransparency, ...props }, ref) => {
    const reduced = useReduceTransparency(reduceTransparency);

    const cardClass = css({
      position: "relative",
      padding: "24px",
      borderRadius: "token(radii.xl)", // 24px
      background: reduced ? "rgba(255,255,255,0.92)" : "token(colors.glass.medium.bg)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "token(colors.glass.medium.border)",
      backdropFilter: reduced ? "none" : "blur(12px) saturate(150%)",
      boxShadow: elevated ? "token(shadows.glass.lg)" : "none",
      overflow: "hidden",
    });

    return (
      <div ref={ref} className={cx(cardClass, className)} {...props}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
