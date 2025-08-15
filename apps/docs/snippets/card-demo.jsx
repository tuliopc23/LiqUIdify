import { DemoFrame } from "/snippets/DemoFrame.jsx";

function GlassCard({ children, tone = "slate", bordered = true }) {
  const tones = {
    slate: "bg-slate-900/5 dark:bg-white/5",
    blue: "bg-blue-500/10",
    rose: "bg-rose-500/10",
  };
  return (
    <div
      className={`rounded-xl ${bordered ? "border border-black/10 dark:border-white/10" : ""} ${tones[tone]} backdrop-blur p-4 md:p-5`}
      style={{ WebkitBackdropFilter: "blur(8px)", backdropFilter: "blur(8px)" }}
    >
      {children}
    </div>
  );
}

export function CardDemo() {
  return (
    <DemoFrame>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard tone="slate">
          <h4 className="text-sm font-medium">Default</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">A simple glass card</p>
        </GlassCard>
        <GlassCard tone="blue">
          <h4 className="text-sm font-medium">Blue</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">Accent tone</p>
        </GlassCard>
        <GlassCard tone="rose" bordered={false}>
          <h4 className="text-sm font-medium">Borderless</h4>
          <p className="text-xs text-slate-600 dark:text-slate-300">Softer look</p>
        </GlassCard>
      </div>
    </DemoFrame>
  );
}
