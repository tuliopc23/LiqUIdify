import React from 'react';
import { cn } from '@/core/utils/classname';

export interface GlassLoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dots' | 'spinner' | 'pulse' | 'bars';
  className?: string;
  text?: string;
}

export const GlassLoading = React.forwardRef<HTMLDivElement, GlassLoadingProps>(
  ({ size = 'md', variant = 'spinner', className, text, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12',
    };

    const dotSizes = {
      sm: 'w-1 h-1',
      md: 'w-1.5 h-1.5',
      lg: 'w-2 h-2',
      xl: 'w-3 h-3',
    };

    const barSizes = {
      sm: 'w-0.5 h-3',
      md: 'w-0.5 h-4',
      lg: 'w-1 h-5',
      xl: 'w-1 h-6',
    };

    const renderSpinner = () => (
      <div
        className={cn(
          sizeClasses[size],
          'border-2 border-gray-300 dark:border-gray-600 border-t-blue-500 rounded-full animate-spin'
        )}
      />
    );

    const renderDots = () => (
      <div className="flex space-x-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className={cn(
              dotSizes[size],
              'bg-blue-500 rounded-full animate-pulse'
            )}
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s',
            }}
          />
        ))}
      </div>
    );

    const renderPulse = () => (
      <div
        className={cn(
          sizeClasses[size],
          'bg-blue-500 rounded-full animate-ping opacity-75'
        )}
      />
    );

    const renderBars = () => (
      <div className="flex space-x-1 items-end">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={cn(barSizes[size], 'bg-blue-500 animate-pulse')}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: '0.8s',
            }}
          />
        ))}
      </div>
    );

    const renderVariant = () => {
      switch (variant) {
        case 'dots':
          return renderDots();
        case 'pulse':
          return renderPulse();
        case 'bars':
          return renderBars();
        default:
          return renderSpinner();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center space-y-3',
          className
        )}
        {...props}
      >
        {renderVariant()}
        {text && (
          <p className="text-sm text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  }
);

GlassLoading.displayName = 'GlassLoading';
