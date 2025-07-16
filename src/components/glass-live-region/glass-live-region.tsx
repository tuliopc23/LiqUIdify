import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/glass-utils';

export type AriaLivePriority = 'polite' | 'assertive' | 'off';
export type AriaRelevant = 'additions' | 'removals' | 'text' | 'all' | 'additions removals' | 'additions text' | 'removals additions' | 'removals text' | 'text additions' | 'text removals';

export interface GlassLiveRegionProps {
  message?: string;
  priority?: AriaLivePriority;
  atomic?: boolean;
  relevant?: AriaRelevant | AriaRelevant[];
  className?: string;
  clearDelay?: number;
  visuallyHidden?: boolean;
  role?: 'status' | 'alert' | 'log';
}

export const GlassLiveRegion: React.FC<GlassLiveRegionProps> = ({
  message,
  priority = 'polite',
  atomic = true,
  relevant = 'additions text',
  className,
  clearDelay = 0,
  visuallyHidden = true,
  role = 'status',
}) => {
  const [currentMessage, setCurrentMessage] = useState<string | undefined>(message);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (message) {
      setCurrentMessage(message);

      if (clearDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentMessage(undefined);
        }, clearDelay);
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearDelay]);

  const relevantString = Array.isArray(relevant) ? relevant.join(' ') : relevant;

  return (
    <div
      role={role}
      aria-live={priority}
      aria-atomic={atomic}
      aria-relevant={relevantString as any}
      className={cn(
        'glass-live-region',
        {
          'sr-only': visuallyHidden,
          'glass-live-region-visible': !visuallyHidden,
        },
        className
      )}
    >
      {currentMessage}
    </div>
  );
};

// Hook for managing live region announcements
export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<string>('');
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const announce = (
    message: string,
    options: {
      priority?: AriaLivePriority;
      clearDelay?: number;
    } = {}
  ) => {
    const { clearDelay = 5000 } = options;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set the announcement
    setAnnouncement(message);

    // Clear after delay if specified
    if (clearDelay > 0) {
      timeoutRef.current = setTimeout(() => {
        setAnnouncement('');
      }, clearDelay);
    }
  };

  const clear = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAnnouncement('');
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    announcement,
    announce,
    clear,
  };
}

// Global announcer for convenience
class AnnouncementManager {
  private listeners: Set<(message: string, priority: AriaLivePriority) => void> = new Set();

  announce(message: string, priority: AriaLivePriority = 'polite') {
    this.listeners.forEach((listener) => listener(message, priority));
  }

  subscribe(listener: (message: string, priority: AriaLivePriority) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export const announcer = new AnnouncementManager();

// Global live region provider
export const GlassLiveRegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<
    Array<{ id: string; message: string; priority: AriaLivePriority }>
  >([]);

  useEffect(() => {
    const unsubscribe = announcer.subscribe((message, priority) => {
      const id = `announcement-${Date.now()}-${Math.random()}`;
      setAnnouncements((prev) => [...prev, { id, message, priority }]);

      // Remove announcement after 5 seconds
      setTimeout(() => {
        setAnnouncements((prev) => prev.filter((a) => a.id !== id));
      }, 5000);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {children}
      <div className="glass-live-regions" aria-hidden="true">
        {/* Polite announcements */}
        <GlassLiveRegion
          message={announcements
            .filter((a) => a.priority === 'polite')
            .map((a) => a.message)
            .join('. ')}
          priority="polite"
          role="status"
        />
        {/* Assertive announcements */}
        <GlassLiveRegion
          message={announcements
            .filter((a) => a.priority === 'assertive')
            .map((a) => a.message)
            .join('. ')}
          priority="assertive"
          role="alert"
        />
      </div>
    </>
  );
};