import React, { useEffect, useState } from 'react';

import { useDegradationAware } from '../../utils/graceful-degradation';
import '../../styles/graceful-degradation.css';

export interface GracefulComponentProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  staticFallback?: React.ReactNode;
  feature: string;
  className?: string;
  style?: React.CSSProperties;
  onError?: (error: Error) => void;
}

export const GracefulComponent: React.FC<GracefulComponentProps> = ({
  children,
  fallback,
  staticFallback,
  feature,
  className = '',
  style,
  onError,
}) => {
  const {
    shouldUseFallback,
    getDegradationClass,
    networkStatus,
    performanceLevel,
  } = useDegradationAware();

  const [hasError, setHasError] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setHasError(true);
      onError?.(event.error);
    };

    if ('undefined' !== typeof window) {
      window.addEventListener('error', handleError);
    }
    return () => {
      if ('undefined' !== typeof window) {
        window.removeEventListener('error', handleError);
      }
    };
  }, [onError]);

  const shouldFallback = hasError || shouldUseFallback(feature as unknown);
  const degradationClass = getDegradationClass(feature, className);

  if (!isMounted) {
    // SSR-safe rendering
    return (
      <div className={`graceful-component ${degradationClass}`} style={style}>
        {children}
      </div>
    );
  }

  if (shouldFallback) {
    if (
      staticFallback &&
      (!networkStatus.online || 'low' === performanceLevel)
    ) {
      return (
        <div
          className={`graceful-component graceful-static-fallback ${degradationClass}`}
          style={style}
        >
          {staticFallback}
        </div>
      );
    }

    if (fallback) {
      return (
        <div
          className={`graceful-component graceful-fallback ${degradationClass}`}
          style={style}
        >
          {fallback}
        </div>
      );
    }

    // Default fallback
    return (
      <div
        className={`graceful-component graceful-static-fallback ${degradationClass}`}
        style={style}
      >
        <p>Feature temporarily unavailable</p>
      </div>
    );
  }

  return (
    <div className={`graceful-component ${degradationClass}`} style={style}>
      {children}
    </div>
  );
};

export interface GracefulImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

export const GracefulImage: React.FC<GracefulImageProps> = ({
  src,
  alt,
  fallbackSrc,
  placeholder,
  className = '',
  style,
  loading = 'lazy',
}) => {
  const { networkStatus, performanceLevel } = useDegradationAware();
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const shouldUseLowQuality =
    !networkStatus.online || 'low' === performanceLevel;
  const processedSource =
    shouldUseLowQuality && fallbackSrc ? fallbackSrc : src;

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (imageError && fallbackSrc) {
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={`graceful-image graceful-fallback ${className}`}
        style={style}
        loading={loading}
      />
    );
  }

  return (
    <div className={`graceful-image-container ${className}`} style={style}>
      {!imageLoaded && placeholder && (
        <div className="graceful-image-placeholder">{placeholder}</div>
      )}

      <img
        src={processedSource}
        alt={alt}
        className={`graceful-image ${imageLoaded ? '' : 'graceful-image-loading'}`}
        style={{
          ...style,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        loading={loading}
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
};

export interface GracefulAnimationProps {
  children: React.ReactNode;
  animation?: string;
  duration?: number;
  delay?: number;
  disabled?: boolean;
  className?: string;
}

export const GracefulAnimation: React.FC<GracefulAnimationProps> = ({
  children,
  animation = 'fadeIn',
  duration = 300,
  delay = 0,
  disabled = false,
  className = '',
}) => {
  const { prefersReducedMotion, shouldUseFallback } = useDegradationAware();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (
      !disabled &&
      !prefersReducedMotion &&
      !shouldUseFallback('animations')
    ) {
      const timer = setTimeout(() => setIsVisible(true), delay);
      return () => clearTimeout(timer);
    }
    setIsVisible(true);
    return () => {};
  }, [disabled, prefersReducedMotion, shouldUseFallback, delay]);

  const animationStyle: React.CSSProperties = {
    animation:
      isVisible &&
      !disabled &&
      !prefersReducedMotion &&
      !shouldUseFallback('animations')
        ? `${animation} ${duration}ms ease-out forwards`
        : 'none',
    opacity: isVisible ? 1 : 0,
  };

  return (
    <div className={`graceful-animation ${className}`} style={animationStyle}>
      {children}
    </div>
  );
};

export interface GracefulVideoProps {
  src: string;
  poster?: string;
  fallbackImage?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}

export const GracefulVideo: React.FC<GracefulVideoProps> = ({
  src,
  poster,
  fallbackImage,
  className = '',
  autoPlay = false,
  muted = false,
  loop = false,
}) => {
  const { shouldUseFallback, networkStatus, performanceLevel } =
    useDegradationAware();
  const [videoError, setVideoError] = useState(false);

  const shouldUseStatic =
    !networkStatus.online ||
    'low' === performanceLevel ||
    shouldUseFallback('webGL');

  const handleError = () => {
    setVideoError(true);
  };

  if (shouldUseStatic || videoError) {
    return (
      <div className={`graceful-video-fallback ${className}`}>
        {fallbackImage ? (
          <img
            src={fallbackImage}
            alt="Video content preview"
            className="graceful-video-fallback-image"
          />
        ) : (
          <div className="graceful-video-placeholder">
            <p>Video unavailable</p>

            {poster && <img src={poster} alt="Video thumbnail preview" />}
          </div>
        )}
      </div>
    );
  }

  return (
    <video
      className={`graceful-video ${className}`}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      onError={handleError}
      controls
    >
      <track kind="captions" srcLang="en" label="English captions" default />
    </video>
  );
};

export interface GracefulInteractiveProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  staticFallback?: React.ReactNode;
  className?: string;
  onInteraction?: () => void;
}

export const GracefulInteractive: React.FC<GracefulInteractiveProps> = ({
  children,
  fallback: _fallback,
  staticFallback,
  className = '',
  onInteraction,
}) => {
  const { networkStatus, performanceLevel } = useDegradationAware();
  const [isInteractive, setIsInteractive] = useState(true);

  useEffect(() => {
    const shouldDisable = !networkStatus.online || 'low' === performanceLevel;
    setIsInteractive(!shouldDisable);
  }, [networkStatus, performanceLevel]);

  if (!isInteractive) {
    return (
      <div className={`graceful-interactive-fallback ${className}`}>
        {staticFallback || (
          <div className="graceful-static-fallback">
            <p>Interactive features disabled</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`graceful-interactive ${className}`}
      onClick={onInteraction}
      onKeyDown={(e) => {
        if ('Enter' === e.key || ' ' === e.key) {
          e.preventDefault();
          onInteraction?.();
        }
      }}
    >
      {children}
    </button>
  );
};

// CSS-only fallback components
export const CSSAccordion: React.FC<{
  items: Array<{
    title: string;
    content: React.ReactNode;
  }>;
  className?: string;
}> = ({ items, className = '' }) => {
  return (
    <div className={`css-accordion-fallback ${className}`}>
      {items.map((item, index) => (
        <div key={index}>
          <input type="checkbox" id={`accordion-${index}`} />

          <label htmlFor={`accordion-${index}`}>{item.title}</label>

          <div className="content">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

export const CSSTabs: React.FC<{
  tabs: Array<{
    label: string;
    content: React.ReactNode;
    id: string;
  }>;
  className?: string;
}> = ({ tabs, className = '' }) => {
  return (
    <div className={`css-tabs-fallback ${className}`}>
      <div className="tab-list">
        {tabs.map((tab) => (
          <a key={tab.id} href={`#${tab.id}`} className="tab-trigger">
            {tab.label}
          </a>
        ))}
      </div>
      {tabs.map((tab) => (
        <div key={tab.id} id={tab.id} className="tab-content">
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export const CSSModal: React.FC<{
  trigger: React.ReactNode;
  content: React.ReactNode;
  modalId: string;
  className?: string;
}> = ({ trigger, content, modalId, className = '' }) => {
  return (
    <div className={`css-modal-container ${className}`}>
      <a href={`#${modalId}`}>{trigger}</a>

      <div id={modalId} className="css-modal-fallback">
        <div className="modal-content">
          <a
            href={`#close-${modalId}`}
            style={{ float: 'right' }}
            aria-label="Close modal"
          >
            ×
          </a>
          {content}
        </div>
      </div>
    </div>
  );
};
