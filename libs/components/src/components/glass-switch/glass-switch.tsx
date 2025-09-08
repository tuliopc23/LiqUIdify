"use client";

import * as React from "react";
import { Switch as ArkSwitch } from "@ark-ui/react";
import { css, cx } from "../../../../../styled-system/css";
import type { ComponentProps } from "react";

export interface GlassSwitchProps
  extends ComponentProps<typeof ArkSwitch.Root> {
  reduceTransparency?: boolean;
  label?: string;
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

export const GlassSwitch = React.forwardRef<HTMLLabelElement, GlassSwitchProps>(
  ({ className, children, label, reduceTransparency, ...props }, ref) => {
    const reduced = useReduceTransparency(reduceTransparency);

    const rootClass = css({
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer",
      userSelect: "none",
      position: "relative",
      // Move thumb when checked by targeting the local class
      "&[data-state=checked] .lg-thumb": {
        transform: "translateX(20px)",
      },
    });

    const trackClass = css({
      width: "48px",
      height: "28px",
      borderRadius: "token(radii.full)",
      background: reduced ? "rgba(255,255,255,0.2)" : "token(colors.glass.medium.bg)",
      borderWidth: "1px",
      borderStyle: "solid",
      borderColor: "token(colors.glass.medium.border)",
      backdropFilter: reduced ? "none" : "blur(8px) saturate(150%)",
      transition: "background 0.2s ease",
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      padding: "2px",
      "&[data-state=checked]": {
        background: "token(colors.accent.primary)",
        borderColor: "token(colors.glass.border)",
      },
    });

    const thumbClass = css({
      width: "24px",
      height: "24px",
      borderRadius: "token(radii.full)",
      background: reduced ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.95)",
      boxShadow: "token(shadows.glass.sm)",
      transform: "translateX(0)",
      transition: "transform 0.2s ease",
      willChange: "transform",
    });

    const labelClass = css({
      color: "token(colors.text.glass.secondary)",
      fontSize: "14px",
    });

    return (
      <ArkSwitch.Root ref={ref} className={cx(rootClass, className)} {...props}>
        <ArkSwitch.Control className={trackClass}>
          <ArkSwitch.Thumb className={cx("lg-thumb", thumbClass)} />
        </ArkSwitch.Control>
        {(label || children) && (
          <ArkSwitch.Label className={labelClass}>{label || children}</ArkSwitch.Label>
        )}
      </ArkSwitch.Root>
    );
  }
);

GlassSwitch.displayName = "GlassSwitch";
