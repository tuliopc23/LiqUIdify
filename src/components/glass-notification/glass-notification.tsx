import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  X,
} from 'lucide-react';
import { cn, getGlassClass, microInteraction } from '@/lib/glass-utils';

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
  notifications: NotificationItem[];
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
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: NotificationItem['type']) => {
    const iconClasses = 'w-4 h-4 flex-shrink-0';
    switch (type) {
      case 'success':
        return <CheckCircle className={cn(iconClasses, 'text-green-500')} />;
      case 'error':
        return <AlertCircle className={cn(iconClasses, 'text-red-500')} />;
      case 'warning':
        return <AlertTriangle className={cn(iconClasses, 'text-yellow-500')} />;
      case 'info':
        return <Info className={cn(iconClasses, 'text-blue-500')} />;
      default:
        return <Bell className={cn(iconClasses, 'text-gray-500')} />;
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60_000);
    const hours = Math.floor(diff / 3_600_000);

    if (1 > minutes) {return 'Just now';}
    if (60 > minutes) {return `${minutes}m ago`;}
    if (24 > hours) {return `${hours}h ago`;}
    return timestamp.toLocaleDateString();
  };

  return (
    <div className={cn('relative', className)}>
      {/* Notification Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative p-2 rounded-xl',
          getGlassClass('default'),
          'hover:bg-[var(--glass-bg-elevated)]',
          microInteraction.gentle,
          'focus:outline-none focus:ring-2 focus:ring-blue-500/30'
        )}
      >
        <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
        { 0 < unreadCount && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            { 9 < unreadCount ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 w-80 max-h-96 overflow-hidden rounded-xl z-50',
            getGlassClass('elevated'),
            'border border-[var(--glass-border)]'
          )}
        >
          {/* Header */}
          <div className="p-4 border-b border-[var(--glass-border)]">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[var(--text-primary)]">
                Notifications
              </h3>
              <div className="flex items-center gap-2">
                { 0 < unreadCount && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Mark all read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-secondary)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-80 overflow-y-auto">
            { 0 === notifications.length ? (
              <div className="p-8 text-center">
                <Bell className="w-8 h-8 text-[var(--text-tertiary)] mx-auto mb-2" />
                <p className="text-[var(--text-secondary)] text-sm">
                  No notifications
                </p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={cn(
                    'p-4 border-b border-[var(--glass-border)] last:border-b-0',
                    'hover:bg-[var(--glass-bg)] cursor-pointer',
                    microInteraction.gentle,
                    !notification.read && 'bg-blue-50/50 dark:bg-blue-950/20'
                  )}
                  onClick={() => onMarkAsRead?.(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4
                          className={cn(
                            'text-sm font-medium truncate',
                            notification.read
                              ? 'text-[var(--text-secondary)]'
                              : 'text-[var(--text-primary)]'
                          )}
                        >
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        {notification.timestamp && (
                          <span className="text-xs text-[var(--text-tertiary)]">
                            {formatTime(notification.timestamp)}
                          </span>
                        )}
                        {notification.action && (
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              notification.action!.onClick();
                            }}
                            className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                          >
                            {notification.action.label}
                          </button>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        onDismiss?.(notification.id);
                      }}
                      className="p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
