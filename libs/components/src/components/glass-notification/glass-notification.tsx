import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  X,
} from 'lucide-react';
import type React from 'react';
import { useState } from 'react';

import { cn, getGlassClass, microInteraction } from '@/core/utils/classname';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info' | 'system';
  timestamp?: Date;
  read?: boolean;
  avatar?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationCenterProps {
  notifications: Array<NotificationItem>;
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    const iconClasses = 'w-4 h-4 flex-shrink-0';
    switch (type) {
      case 'success': {
        return <CheckCircle className={cn(iconClasses, 'text-green-500')} />;
      }
      case 'error': {
        return <AlertCircle className={cn(iconClasses, 'text-red-500')} />;
      }
      case 'warning': {
        return <AlertTriangle className={cn(iconClasses, 'text-yellow-500')} />;
      }
      case 'info': {
        return <Info className={cn(iconClasses, 'text-blue-500')} />;
      }
      default: {
        return <Bell className={cn(iconClasses, 'text-gray-500')} />;
      }
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);

    if (minutes < 1) {
      return 'Just now';
    }
    if (minutes < 60) {
      return `${minutes}m ago`;
    }
    if (hours < 24) {
      return `${hours}h ago`;
    }
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={cn('relative', className)}>
      {/* Notification Bell Button */}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative rounded-xl p-2',
          getGlassClass('default'),
          'hover:bg-[var(--glass-bg-elevated)]',
          microInteraction.gentle,
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30'
        )}
      >
        <Bell className="h-5 w-5 text-[var(--text-secondary)]" />
        {unreadCount > 0 && (
          <span className="-top-1 -right-1 absolute flex h-5 w-5 items-center justify-center rounded-full bg-red-500 font-medium text-white text-xs">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div
          className={cn(
            'absolute top-full right-0 z-50 mt-2 max-h-96 w-80 overflow-hidden rounded-xl',
            getGlassClass('elevated'),
            'border border-[var(--glass-border)]'
          )}
        >
          {/* Header */}

          <div className="border-[var(--glass-border)] border-b p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Notifications
              </h3>

              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={onMarkAllAsRead}
                    className="font-medium text-blue-500 text-xs hover:text-blue-600"
                  >
                    Mark all read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="mx-auto mb-2 h-8 w-8 text-[var(--text-tertiary)]" />

                <p className="text-[var(--text-secondary)] text-sm">
                  No notifications
                </p>
              </div>
            ) : (
              notifications.map((notification) => (
                <button
                  type="button"
                  key={notification.id}
                  className={cn(
                    'border-[var(--glass-border)] border-b p-4 last:border-b-0',
                    'w-full cursor-pointer text-left hover:bg-[var(--glass-bg)]',
                    microInteraction.gentle,
                    !notification.read && 'bg-blue-50/50 dark:bg-blue-950/20'
                  )}
                  onClick={() => onMarkAsRead?.(notification.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onMarkAsRead?.(notification.id);
                    }
                  }}
                  aria-label={`Notification: ${notification.title}`}
                  aria-describedby={`notification-${notification.id}-desc`}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={cn(
                            'truncate font-medium text-sm',
                            notification.read
                              ? 'text-[var(--text-secondary)]'
                              : 'text-[var(--text-primary)]'
                          )}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                        )}
                      </div>

                      <p
                        id={`notification-${notification.id}-desc`}
                        className="mt-1 line-clamp-2 text-[var(--text-secondary)] text-xs"
                      >
                        {notification.message}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        {notification.timestamp && (
                          <span className="text-[var(--text-tertiary)] text-xs">
                            {formatTime(notification.timestamp)}
                          </span>
                        )}
                        {notification.action && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              notification.action?.onClick();
                            }}
                            className="font-medium text-blue-500 text-xs hover:text-blue-600"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDismiss?.(notification.id);
                      }}
                      className="rounded-lg p-1 text-[var(--text-tertiary)] opacity-0 transition-opacity hover:bg-[var(--glass-bg)] group-hover:opacity-100"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
