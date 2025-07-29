import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';
import React from 'react';
import { cn, getGlassClass, microInteraction } from '@/core/utils/classname';

export interface GlassBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const variantConfig = {
  info: {
    icon: Info,
    className: 'border-blue-500/20 bg-blue-500/10 text-blue-400',
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-500/20 bg-green-500/10 text-green-400',
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400',
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-500/20 bg-red-500/10 text-red-400',
  },
};

export const GlassBanner: React.FC<GlassBannerProps> = ({
  variant = 'info',
  dismissible = false,
  onDismiss,
  icon,
  action,
  children,
  className,
  ...props
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      onDismiss?.();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg border p-4',
        getGlassClass('default'),
        config.className,
        'slide-in-from-top-2 animate-in',
        !isVisible && 'slide-out-to-top-2 animate-out',
        className
      )}
      role="alert"
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon || <Icon className="h-5 w-5 flex-shrink-0" />}

        <div className="flex-1">{children}</div>

        <div className="flex items-center gap-2">
          {action}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              className={cn(
                'rounded-lg p-1 hover:bg-white/10',
                microInteraction.interactive,
                'focus:outline-none focus:ring-2 focus:ring-white/20'
              )}
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
