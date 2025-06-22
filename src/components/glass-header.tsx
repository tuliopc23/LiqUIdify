import { cn } from "@/lib/glass-utils";

export interface GlassHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function GlassHeader({
  title,
  subtitle,
  actions,
  className
}: GlassHeaderProps) {
  return (
    <header
      className={cn(
        "glass-effect-elevated border-b border-[var(--glass-border)] py-6 backdrop-blur-lg",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary">{title}</h1>
          {subtitle && <p className="text-secondary mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="mt-4 md:mt-0 flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
