import { useState } from "react";
import { DemoFrame } from "/snippets/DemoFrame.jsx";

// Minimal interactive demo for Liquid/Glass Button
// Assumes global styles for Liquidify are already loaded in the docs site

function GlassButton({ variant = "primary", size = "md", children, ...props }) {
  // Placeholder visual so the demo works in docs without bundling the real library.
  const base =
    "inline-flex items-center justify-center rounded-md transition active:scale-[.98] select-none";
  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-9 px-4 text-sm",
    lg: "h-10 px-5 text-base",
  };
  const variants = {
    primary:
      "bg-blue-600/80 text-white shadow-sm hover:bg-blue-600/90 dark:bg-blue-500/80 dark:hover:bg-blue-500/90",
    secondary:
      "bg-slate-900/5 text-slate-900 hover:bg-slate-900/10 dark:text-slate-100 dark:hover:bg-white/10",
    ghost: "bg-transparent hover:bg-slate-900/5 dark:hover:bg-white/5",
    destructive:
      "bg-rose-600/80 text-white hover:bg-rose-600/90 dark:bg-rose-500/80 dark:hover:bg-rose-500/90",
  };
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

export function LiquidButtonDemo() {
  const [variant, setVariant] = useState("primary");
  const [size, setSize] = useState("md");

  return (
    <DemoFrame>
      <div className="flex items-center gap-2 flex-wrap">
        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Variant
        </label>
        {["primary", "secondary", "ghost", "destructive"].map((v) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`text-xs px-2 py-1 rounded border ${
              variant === v
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-transparent text-slate-700 dark:text-slate-200"
            }`}
            aria-pressed={variant === v}
          >
            {v}
          </button>
        ))}

        <div className="w-px h-5 bg-slate-300/60 dark:bg-white/15 mx-2" />

        <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
          Size
        </label>
        {["sm", "md", "lg"].map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`text-xs px-2 py-1 rounded border ${
              size === s
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                : "bg-transparent text-slate-700 dark:text-slate-200"
            }`}
            aria-pressed={size === s}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="pt-2">
        <GlassButton variant={variant} size={size}>
          Click me
        </GlassButton>
      </div>
    </DemoFrame>
  );
}
