import React, { forwardRef, useCallback, useRef } from 'react';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { cn } from '@/lib/glass-utils';
import { useContentAwareGlass, useLiquidGlass } from '@/hooks/use-liquid-glass';
import { useMagneticHover } from '@/lib/glass-physics';
import { GlassButton } from './glass-button';
import { createComponentSize } from '@/types/branded';
import {
  containerFadeInFast,
  fadeInUpLarge,
} from '@/lib/framer-motion-constants';

export interface GlassHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  backgroundImage?: string;
  backgroundVideo?: string;
  variant?: 'default' | 'centered' | 'split' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  enableParallax?: boolean;
  enableMagnetic?: boolean;
}

const GlassHero = forwardRef<HTMLDivElement, GlassHeroProps>(
  (
    {
      className,
      title,
      subtitle,
      description,
      primaryAction,
      secondaryAction,
      backgroundImage,
      backgroundVideo,
      variant = 'default',
      size = 'lg',
      enableParallax = true,
      enableMagnetic = false,
      children,
      ...props
    },
    ref
  ) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { specularHighlights } = useLiquidGlass();
    useContentAwareGlass(contentRef as React.RefObject<HTMLElement>);
    const { elementRef: magneticRef, transform } = useMagneticHover(0.2, 200);

    // Callback ref to handle both content and magnetic refs
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current =
          node;
        if (enableMagnetic && magneticRef) {
          (magneticRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
        }
        if ('function' === typeof ref) {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }
      },
      [enableMagnetic, magneticRef, ref]
    );

    const sizeClasses = {
      sm: 'min-h-[60vh] py-16 px-6',
      md: 'min-h-[70vh] py-20 px-8',
      lg: 'min-h-[80vh] py-24 px-8',
      xl: 'min-h-[90vh] py-32 px-12',
    };

    const variantClasses = {
      default: 'text-center',
      centered: 'text-center items-center justify-center',
      split: 'text-left lg:text-left items-center',
      minimal: 'text-center items-center justify-center py-16',
    };

    const titleSizes = {
      sm: 'text-4xl md:text-5xl',
      md: 'text-5xl md:text-6xl',
      lg: 'text-6xl md:text-7xl lg:text-8xl',
      xl: 'text-7xl md:text-8xl lg:text-9xl',
    };

    const containerVariants: Variants = containerFadeInFast;

    const itemVariants: Variants = fadeInUpLarge;

    const parallaxVariants = enableParallax
      ? {
          initial: { y: 0 },
          animate: { y: -20 },
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse' as const,
            ease: 'easeInOut' as const,
          },
        }
      : {};

    return (
      <div
        ref={setRefs}
        className={cn(
          'relative overflow-hidden',
          'liquid-glass-adaptive liquid-glass-depth-2',
          specularHighlights && 'liquid-glass-specular',
          sizeClasses[size],
          className
        )}
        style={{
          transform: enableMagnetic ? transform : undefined,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 20%, #4a4a4a 40%, #6b7280 60%, #9ca3af 80%, #e5e7eb 100%)',
          backgroundSize: backgroundImage ? 'cover' : '400% 400%',
          backgroundPosition: 'center',
          backgroundAttachment: enableParallax ? 'fixed' : 'scroll',
          animation: !backgroundImage
            ? 'gradientShift 15s ease infinite'
            : undefined,
        }}
        {...props}
      >
        {/* Background Video */}
        {backgroundVideo && (
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-10"
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        )}

        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-black/5 dark:from-black/20 dark:via-transparent dark:to-black/40 -z-5" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(156, 163, 175, 0.08) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              x: [0, 80, 0],
              y: [0, -40, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(107, 114, 128, 0.06) 0%, transparent 70%)',
              filter: 'blur(50px)',
            }}
            animate={{
              x: [0, -60, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 3,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(229, 231, 235, 0.04) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 5,
            }}
          />
        </div>

        {/* Content Container */}
        <motion.div
          className={cn(
            'relative z-10 flex flex-col h-full max-w-7xl mx-auto',
            variantClasses[variant]
          )}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          {...parallaxVariants}
        >
          {'split' === variant ? (
            <div className="grid lg:grid-cols-2 gap-12 items-center h-full">
              <div className="space-y-8">
                {subtitle && (
                  <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center px-4 py-2 rounded-full liquid-glass liquid-glass-specular text-sm font-medium text-[var(--text-secondary)]"
                  >
                    {subtitle}
                  </motion.div>
                )}

                <motion.h1
                  variants={itemVariants}
                  className={cn(
                    'font-bold tracking-tight text-[var(--text-primary)]',
                    titleSizes[size]
                  )}
                >
                  {title}
                </motion.h1>

                {description && (
                  <motion.p
                    variants={itemVariants}
                    className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl leading-relaxed"
                  >
                    {description}
                  </motion.p>
                )}

                {(primaryAction || secondaryAction) && (
                  <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    {primaryAction && (
                      <GlassButton
                        variant="primary"
                        size={createComponentSize('lg')}
                        onClick={primaryAction.onClick}
                        leftIcon={primaryAction.icon}
                        className="min-w-[200px]"
                      >
                        {primaryAction.label}
                      </GlassButton>
                    )}
                    {secondaryAction && (
                      <GlassButton
                        variant="secondary"
                        size={createComponentSize('lg')}
                        onClick={secondaryAction.onClick}
                        leftIcon={secondaryAction.icon}
                        className="min-w-[200px]"
                      >
                        {secondaryAction.label}
                      </GlassButton>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="relative">{children}</div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full space-y-8 text-center">
              {subtitle && (
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center px-6 py-3 rounded-full liquid-glass liquid-glass-specular text-sm font-medium text-[var(--text-secondary)]"
                >
                  {subtitle}
                </motion.div>
              )}

              <motion.h1
                variants={itemVariants}
                className={cn(
                  'font-bold tracking-tight text-[var(--text-primary)] max-w-5xl',
                  titleSizes[size]
                )}
              >
                {title}
              </motion.h1>

              {description && (
                <motion.p
                  variants={itemVariants}
                  className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl leading-relaxed"
                >
                  {description}
                </motion.p>
              )}

              {(primaryAction || secondaryAction) && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-6 pt-4"
                >
                  {primaryAction && (
                    <GlassButton
                      variant="primary"
                      size={createComponentSize('xl')}
                      onClick={primaryAction.onClick}
                      leftIcon={primaryAction.icon}
                      className="min-w-[220px]"
                    >
                      {primaryAction.label}
                    </GlassButton>
                  )}
                  {secondaryAction && (
                    <GlassButton
                      variant="secondary"
                      size={createComponentSize('xl')}
                      onClick={secondaryAction.onClick}
                      leftIcon={secondaryAction.icon}
                      className="min-w-[220px]"
                    >
                      {secondaryAction.label}
                    </GlassButton>
                  )}
                </motion.div>
              )}

              {children && (
                <motion.div variants={itemVariants} className="pt-8">
                  {children}
                </motion.div>
              )}
            </div>
          )}
        </motion.div>

        {/* Floating Glass Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-20 right-20 w-4 h-4 liquid-glass rounded-full"
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-32 left-16 w-6 h-6 liquid-glass rounded-full"
            animate={{
              y: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
          <motion.div
            className="absolute top-1/2 right-8 w-3 h-3 liquid-glass rounded-full"
            animate={{
              y: [0, -10, 0],
              x: [0, 5, 0],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          />
        </div>
      </div>
    );
  }
);

GlassHero.displayName = 'GlassHero';

export { GlassHero };
