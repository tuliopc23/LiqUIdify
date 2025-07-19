import { cn } from '@/lib/glass-utils';
import { AppleLiquidGlassNav } from '@/components/apple-liquid-glass';
import { LiquidGlassSvgFilters } from '@/components/liquid-glass-svg-filters';

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
  className,
}: GlassHeaderProps) {
  return (
    <>
      <LiquidGlassSvgFilters />
      <AppleLiquidGlassNav
        intensity="subtle"
        magnetic
        animated
        className={cn('border-b border-white/15 py-6', className)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between w-full">
          <div>
            <h1 className="text-2xl font-semibold text-white">{title}</h1>
            {subtitle && <p className="text-white/70 mt-1">{subtitle}</p>}
          </div>
          {actions && (
            <div className="mt-4 md:mt-0 flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </AppleLiquidGlassNav>
    </>
  );
}
