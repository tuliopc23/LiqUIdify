import React from 'react';
import { User } from 'lucide-react';
import { cn, getGlassClass } from '@/lib/glass-utils';

export interface GlassAvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  variant?: 'circular' | 'rounded' | 'square';
  fallback?: string;
  className?: string;
  showBorder?: boolean;
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export const GlassAvatar = React.forwardRef<HTMLDivElement, GlassAvatarProps>(
  (
    {
      src,
      alt,
      size = 'md',
      variant = 'circular',
      fallback,
      className,
      showBorder = false,
      status,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-20 h-20 text-2xl',
    };

    const variantClasses = {
      circular: 'rounded-full',
      rounded: 'rounded-lg',
      square: 'rounded-none',
    };

    const statusColors = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
    };

    const statusSizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-3.5 h-3.5',
      '2xl': 'w-4 h-4',
    };

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    };

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          sizeClasses[size],
          variantClasses[variant],
          showBorder && getGlassClass('default'),
          showBorder && 'border border-white/20 dark:border-white/10',
          'overflow-hidden',
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className={cn(
              'w-full h-full object-cover',
              variantClasses[variant]
            )}
            onError={e => {
              // Hide image on error, fallback will show
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : fallback ? (
          <span
            className={cn(
              'font-medium text-gray-900 dark:text-white',
              'bg-gradient-to-br from-blue-500 to-purple-500 text-white'
            )}
          >
            {getInitials(fallback)}
          </span>
        ) : (
          <User
            className={cn(
              'w-1/2 h-1/2 text-gray-400',
              'bg-gray-200 dark:bg-gray-700 p-1 rounded-full'
            )}
          />
        )}

        {/* Status indicator */}
        {status && (
          <div
            className={cn(
              'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-gray-900',
              statusSizes[size],
              statusColors[status]
            )}
          />
        )}
      </div>
    );
  }
);

GlassAvatar.displayName = 'GlassAvatar';
