import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { cn } from "../../core/utils/classname";

type AriaLivePriority = "polite" | "assertive" | "off";
type AriaRelevant =
  | "additions"
  | "removals"
  | "text"
  | "all"
  | "additions removals"
  | "additions text"
  | "removals additions"
  | "removals text"
  | "text additions"
  | "text removals";

type AnnouncementPriority = "low" | "medium" | "high" | "critical";
type AnnouncementContext =
  | "navigation"
  | "form"
  | "notification"
  | "error"
  | "success"
  | "loading"
  | "general";

interface QueuedAnnouncement {
  id: string;
  message: string;
  priority: AnnouncementPriority;
  context: AnnouncementContext;
  timestamp: number;
  delay?: number;
  clearDelay?: number;
  dedupKey?: string;
}

interface AnnouncementOptions {
  priority?: AnnouncementPriority;
  context?: AnnouncementContext;
  delay?: number;
  clearDelay?: number;
  dedupKey?: string;
}

interface GlassLiveRegionProps {
  message?: string;
  priority?: AriaLivePriority;
  atomic?: boolean;
  relevant?: AriaRelevant | Array<AriaRelevant>;
  className?: string;
  clearDelay?: number;
  visuallyHidden?: boolean;
  role?: "status" | "alert" | "log";
  queueingEnabled?: boolean;
  maxQueueSize?: number;
  contextualPrefix?: boolean;
}

const PRIORITY_MAP: Record<AnnouncementPriority, AriaLivePriority> = {
  low: "polite",
  medium: "polite",
  high: "assertive",
  critical: "assertive",
};

const PRIORITY_DELAYS: Record<AnnouncementPriority, number> = {
  low: 500,
  medium: 200,
  high: 100,
  critical: 0,
};

const CONTEXT_PREFIXES: Record<AnnouncementContext, string> = {
  navigation: "Navigation: ",
  form: "Form update: ",
  notification: "Notification: ",
  error: "Error: ",
  success: "Success: ",
  loading: "Loading: ",
  general: "",
};

const GlassLiveRegion: React.FC<GlassLiveRegionProps> = ({
  message,
  priority = "polite",
  atomic = true,
  relevant = "additions text",
  className,
  clearDelay = 0,
  visuallyHidden = true,
  role = "status",
  queueingEnabled = false,
  maxQueueSize = 10,
  contextualPrefix = true,
}) => {
  const [currentMessage, setCurrentMessage] = useState<string | undefined>(
    message,
  );
  const [announcementQueue, setAnnouncementQueue] = useState<
    Array<QueuedAnnouncement>
  >([]);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const processingRef = useRef<boolean>(false);
  const dedupMapRef = useRef<Map<string, number>>(new Map());

  // Process queue
  const processQueue = useCallback(() => {
    if (processingRef.current || announcementQueue.length === 0) {
      return;
    }

    processingRef.current = true;
    const announcement = announcementQueue[0];

    if (!announcement) {
      processingRef.current = false;
      return;
    }

    // Apply contextual prefix if enabled
    const messageToAnnounce =
      contextualPrefix && announcement.context !== "general"
        ? `${CONTEXT_PREFIXES[announcement.context]}${announcement.message}`
        : announcement.message;

    setCurrentMessage(messageToAnnounce);

    // Remove from queue
    setAnnouncementQueue((previous) => previous.slice(1));

    // Schedule clear
    const clearTime = announcement.clearDelay || clearDelay || 5000;
    timeoutRef.current = setTimeout(() => {
      setCurrentMessage(undefined);
      processingRef.current = false;

      // Process next in queue after a brief pause
      setTimeout(processQueue, 100);
    }, clearTime);
  }, [announcementQueue, clearDelay, contextualPrefix]);

  // Queue announcement
  const queueAnnouncement = useCallback(
    (message_: string, options: AnnouncementOptions = {}) => {
      const {
        priority: announcementPriority = "medium",
        context = "general",
        delay = PRIORITY_DELAYS[announcementPriority || "medium"],
        clearDelay: announcementClearDelay,
        dedupKey,
      } = options;

      // Deduplication check
      if (dedupKey) {
        const lastTime = dedupMapRef.current.get(dedupKey);
        const now = Date.now();
        if (lastTime && now - lastTime < 1000) {
          return; // Skip duplicate within 1 second
        }
        dedupMapRef.current.set(dedupKey, now);
      }

      const announcement: QueuedAnnouncement = {
        id: `announcement-${Date.now()}-${Math.random()}`,
        message: message_,
        priority: announcementPriority,
        context,
        timestamp: Date.now(),
        delay,
        clearDelay: announcementClearDelay,
        dedupKey,
      };

      setAnnouncementQueue((previous) => {
        // Add to queue
        let newQueue = [...previous, announcement];

        // Sort by priority (critical first)
        newQueue.sort((a, b) => {
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        // Trim queue if needed
        if (newQueue.length > maxQueueSize) {
          newQueue = newQueue.slice(0, maxQueueSize);
        }

        return newQueue;
      });
    },
    [maxQueueSize],
  );

  // Handle direct message updates
  useEffect(() => {
    if (message && !queueingEnabled) {
      setCurrentMessage(message);

      if (clearDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentMessage(undefined);
        }, clearDelay);
      }
    } else if (message && queueingEnabled) {
      queueAnnouncement(message);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearDelay, queueingEnabled, queueAnnouncement]);

  // Process queue when it changes
  useEffect(() => {
    if (
      queueingEnabled &&
      announcementQueue.length > 0 &&
      !processingRef.current
    ) {
      processQueue();
    }
  }, [announcementQueue, queueingEnabled, processQueue]);

  // Cleanup dedup map periodically
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      for (const [key, time] of dedupMapRef.current.entries()) {
        if (now - time > 60_000) {
          // Remove entries older than 1 minute
          dedupMapRef.current.delete(key);
        }
      }
    }, 30_000); // Clean every 30 seconds

    return () => clearInterval(cleanupInterval);
  }, []);

  const relevantString = Array.isArray(relevant)
    ? relevant.join(" ")
    : relevant;

  return (
    <div
      role={role}
      aria-live={priority}
      aria-atomic={atomic}
      aria-relevant={
        relevantString as
          | "text"
          | "additions"
          | "additions removals"
          | "additions text"
          | "all"
          | "removals"
          | "removals additions"
          | "removals text"
          | "text additions"
          | "text removals"
          | undefined
      }
      className={cn(
        "glass-live-region",
        {
          "sr-only": visuallyHidden,
          "glass-live-region-visible": !visuallyHidden,
        },
        className,
      )}
    >
      {currentMessage}
    </div>
  );
};

export { GlassLiveRegion };

// Enhanced hook for managing live region announcements
function useAnnouncement() {
  const [announcement, setAnnouncement] = useState<string>("");
  const [announcementOptions, setAnnouncementOptions] =
    useState<AnnouncementOptions>({});
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const queueRef = useRef<Array<QueuedAnnouncement>>([]);
  const dedupMapRef = useRef<Map<string, number>>(new Map());

  const announce = useCallback(
    (message: string, options: AnnouncementOptions = {}) => {
      const {
        priority = "medium",
        context: _context = "general",
        delay = PRIORITY_DELAYS[priority],
        clearDelay = 5000,
        dedupKey,
      } = options;

      // Deduplication check
      if (dedupKey) {
        const lastTime = dedupMapRef.current.get(dedupKey);
        const now = Date.now();
        if (lastTime && now - lastTime < 1000) {
          return; // Skip duplicate
        }
        dedupMapRef.current.set(dedupKey, now);
      }

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Apply delay based on priority
      setTimeout(() => {
        setAnnouncement(message);
        setAnnouncementOptions(options);

        // Clear after delay if specified
        if (clearDelay > 0) {
          timeoutRef.current = setTimeout(() => {
            setAnnouncement("");
          }, clearDelay);
        }
      }, delay);
    },
    [],
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAnnouncement("");
    queueRef.current = [];
  }, []);

  // Context-aware announce helpers
  const announceError = useCallback(
    (message: string, options?: Omit<AnnouncementOptions, "context">) => {
      announce(message, {
        ...options,
        context: "error",
        priority: options?.priority || "high",
      });
    },
    [announce],
  );

  const announceSuccess = useCallback(
    (message: string, options?: Omit<AnnouncementOptions, "context">) => {
      announce(message, {
        ...options,
        context: "success",
        priority: options?.priority || "medium",
      });
    },
    [announce],
  );

  const announceNavigation = useCallback(
    (message: string, options?: Omit<AnnouncementOptions, "context">) => {
      announce(message, {
        ...options,
        context: "navigation",
        priority: options?.priority || "low",
      });
    },
    [announce],
  );

  const announceLoading = useCallback(
    (message: string, options?: Omit<AnnouncementOptions, "context">) => {
      announce(message, {
        ...options,
        context: "loading",
        priority: options?.priority || "low",
      });
    },
    [announce],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    announcement,
    announcementOptions,
    announce,
    clear,
    announceError,
    announceSuccess,
    announceNavigation,
    announceLoading,
  };
}

// Enhanced global announcer with queue management
class AnnouncementManager {
  private listeners: Set<
    (message: string, options: AnnouncementOptions) => void
  > = new Set();
  private queue: Array<QueuedAnnouncement> = [];
  private processing = false;
  private dedupMap: Map<string, number> = new Map();

  announce(message: string, options: AnnouncementOptions = {}) {
    const {
      priority = "medium",
      context = "general",
      delay = PRIORITY_DELAYS[priority],
      dedupKey,
    } = options;

    // Deduplication
    if (dedupKey) {
      const lastTime = this.dedupMap.get(dedupKey);
      const now = Date.now();
      if (lastTime && now - lastTime < 1000) {
        return;
      }
      this.dedupMap.set(dedupKey, now);
    }

    const announcement: QueuedAnnouncement = {
      id: `announcement-${Date.now()}-${Math.random()}`,
      message,
      priority,
      context,
      timestamp: Date.now(),
      delay,
      dedupKey,
    };

    this.queue.push(announcement);
    this.queue.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    this.processQueue();
  }

  private async processQueue() {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;
    const announcement = this.queue.shift()!;

    // Apply delay
    if (announcement.delay && announcement.delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, announcement.delay));
    }

    // Notify listeners
    for (const listener of this.listeners) {
      listener(announcement.message, {
        priority: announcement.priority,
        context: announcement.context,
        clearDelay: announcement.clearDelay,
      });
    }

    // Continue processing
    setTimeout(() => {
      this.processing = false;
      this.processQueue();
    }, 100);
  }

  subscribe(listener: (message: string, options: AnnouncementOptions) => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // Context-aware methods
  error(message: string, options?: Omit<AnnouncementOptions, "context">) {
    this.announce(message, {
      ...options,
      context: "error",
      priority: options?.priority || "high",
    });
  }

  success(message: string, options?: Omit<AnnouncementOptions, "context">) {
    this.announce(message, {
      ...options,
      context: "success",
      priority: options?.priority || "medium",
    });
  }

  navigation(message: string, options?: Omit<AnnouncementOptions, "context">) {
    this.announce(message, {
      ...options,
      context: "navigation",
      priority: options?.priority || "low",
    });
  }

  loading(message: string, options?: Omit<AnnouncementOptions, "context">) {
    this.announce(message, {
      ...options,
      context: "loading",
      priority: options?.priority || "low",
    });
  }
}

export const announcer = new AnnouncementManager();

// Enhanced global live region provider
const _GlassLiveRegionProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<
    Array<{ id: string; message: string; options: AnnouncementOptions }>
  >([]);

  useEffect(() => {
    const unsubscribe = announcer.subscribe((message, options) => {
      const id = `announcement-${Date.now()}-${Math.random()}`;
      setAnnouncements((previous) => [...previous, { id, message, options }]);

      // Remove announcement after specified time
      const clearTime = options.clearDelay || 5000;
      setTimeout(() => {
        setAnnouncements((previous) => previous.filter((a) => a.id !== id));
      }, clearTime);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Group announcements by aria-live priority
  const politeAnnouncements = useMemo(
    () =>
      announcements.filter(
        (a) => PRIORITY_MAP[a.options.priority || "medium"] === "polite",
      ),
    [announcements],
  );

  const assertiveAnnouncements = useMemo(
    () =>
      announcements.filter(
        (a) => PRIORITY_MAP[a.options.priority || "medium"] === "assertive",
      ),
    [announcements],
  );

  return (
    <>
      {children}

      <div className="glass-live-regions" aria-hidden="true">
        {/* Polite announcements with queue support */}

        <GlassLiveRegion
          message={politeAnnouncements.map((a) => a.message).join(". ")}
          priority="polite"
          role="status"
          queueingEnabled
          contextualPrefix
        />
        {/* Assertive announcements with queue support */}

        <GlassLiveRegion
          message={assertiveAnnouncements.map((a) => a.message).join(". ")}
          priority="assertive"
          role="alert"
          queueingEnabled
          contextualPrefix
        />
      </div>
    </>
  );
};

// Export the provider component
export { _GlassLiveRegionProvider };
