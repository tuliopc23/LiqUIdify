import { Check, Circle, Clock } from 'lucide-react';
import type React from 'react';
import { cn, getGlassClass, microInteraction } from '@/core/utils/classname';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  date?: string;
  status?: 'completed' | 'active' | 'pending';
  icon?: React.ReactNode;
  content?: React.ReactNode;
}

export interface GlassTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal';
  alternating?: boolean;
}

export const GlassTimeline: React.FC<GlassTimelineProps> = ({
  items,
  orientation = 'vertical',
  alternating = false,
  className,
  ...props
}) => {
  const getStatusIcon = (status?: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4" />;
      case 'active':
        return <Circle className="h-3 w-3 animate-pulse" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusClass = (status?: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      case 'active':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400';
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400';
    }
  };

  if (orientation === 'horizontal') {
    return (
      <div className={cn('relative', className)} {...props}>
        <div className="flex items-start overflow-x-auto pb-4">
          {items.map((item, index) => (
            <div key={item.id} className="flex items-start min-w-[250px]">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2',
                    getGlassClass('default'),
                    getStatusClass(item.status),
                    microInteraction.gentle
                  )}
                >
                  {item.icon || getStatusIcon(item.status)}
                </div>
                <div className="mt-4 space-y-1 text-center px-4">
                  {item.date && (
                    <p className="text-xs text-[var(--text-secondary)]">
                      {item.date}
                    </p>
                  )}
                  <h3 className="font-medium text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
              {index < items.length - 1 && (
                <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mt-5" />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative', className)} {...props}>
      {items.map((item, index) => (
        <div
          key={item.id}
          className={cn(
            'relative flex gap-4',
            alternating && index % 2 === 1 && 'flex-row-reverse'
          )}
        >
          {/* Timeline line */}
          {index < items.length - 1 && (
            <div
              className={cn(
                'absolute top-10 w-[2px] bg-gradient-to-b from-white/20 to-transparent',
                alternating ? 'left-1/2 -translate-x-1/2' : 'left-5',
                'h-full'
              )}
            />
          )}

          {/* Content */}
          <div
            className={cn(
              'flex gap-4',
              alternating && 'w-1/2',
              alternating && index % 2 === 1 && 'justify-end'
            )}
          >
            {(!alternating || index % 2 === 0) && (
              <div
                className={cn(
                  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2',
                  getGlassClass('default'),
                  getStatusClass(item.status),
                  microInteraction.gentle
                )}
              >
                {item.icon || getStatusIcon(item.status)}
              </div>
            )}

            <div
              className={cn(
                'flex-1 pb-8',
                alternating && index % 2 === 1 && 'text-right'
              )}
            >
              {item.date && (
                <p className="text-xs text-[var(--text-secondary)] mb-1">
                  {item.date}
                </p>
              )}
              <h3 className="font-medium text-[var(--text-primary)] mb-2">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-sm text-[var(--text-secondary)] mb-3">
                  {item.description}
                </p>
              )}
              {item.content && (
                <div
                  className={cn(
                    'rounded-lg p-4',
                    getGlassClass('default'),
                    'border border-white/10'
                  )}
                >
                  {item.content}
                </div>
              )}
            </div>

            {alternating && index % 2 === 1 && (
              <div
                className={cn(
                  'flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2',
                  getGlassClass('default'),
                  getStatusClass(item.status),
                  microInteraction.gentle
                )}
              >
                {item.icon || getStatusIcon(item.status)}
              </div>
            )}
          </div>

          {alternating && <div className="w-1/2" />}
        </div>
      ))}
    </div>
  );
};
