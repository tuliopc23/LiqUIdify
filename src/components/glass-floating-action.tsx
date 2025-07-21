import React, { forwardRef, useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/core/utils/classname';
import { useLiquidGlass } from '@/hooks/use-liquid-glass';
import { createGlassRipple, useMagneticHover } from '@/lib/glass-physics';

export interface FloatingAction {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export interface GlassFloatingActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  mainIcon: React.ReactNode;
  actions?: FloatingAction[];
  position?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'center';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'minimal' | 'glow';
  enableMagnetic?: boolean;
  expandDirection?: 'up' | 'down' | 'left' | 'right' | 'radial';
  tooltip?: string;
}

const GlassFloatingAction = forwardRef<
  HTMLDivElement,
  GlassFloatingActionProps
>(
  (
    {
      className,
      mainIcon,
      actions = [],
      position = 'bottom-right',
      size = 'md',
      variant = 'default',
      enableMagnetic = true,
      expandDirection = 'up',
      tooltip,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const { specularHighlights } = useLiquidGlass();
    const { elementRef: magneticRef, transform } = useMagneticHover(0.4, 80);

    // Callback ref to handle both button and magnetic refs
    const setRefs = useCallback(
      (node: HTMLButtonElement | null) => {
        (
          buttonRef as React.MutableRefObject<HTMLButtonElement | null>
        ).current = node;
        if (enableMagnetic && magneticRef) {
          (magneticRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
        }
      },
      [enableMagnetic, magneticRef]
    );

    const positionClasses = {
      'bottom-right': 'fixed bottom-6 right-6 z-50',
      'bottom-left': 'fixed bottom-6 left-6 z-50',
      'top-right': 'fixed top-6 right-6 z-50',
      'top-left': 'fixed top-6 left-6 z-50',
      center:
        'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50',
    };

    const sizeClasses = {
      sm: 'w-12 h-12',
      md: 'w-14 h-14',
      lg: 'w-16 h-16',
    };

    const iconSizes = {
      sm: 'w-5 h-5',
      md: 'w-6 h-6',
      lg: 'w-7 h-7',
    };

    const handleMainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        createGlassRipple(buttonRef.current, x, y, 'rgba(255, 255, 255, 0.4)');
      }

      if (0 < actions.length) {
        setIsExpanded(!isExpanded);
      } else {
        onClick?.(e as any);
      }
    };

    const getActionPosition = (index: number) => {
      const distance = 70;
      const actionCount = actions.length;

      switch (expandDirection) {
        case 'up':
          return { x: 0, y: -(distance * (index + 1)) };
        case 'down':
          return { x: 0, y: distance * (index + 1) };
        case 'left':
          return { x: -(distance * (index + 1)), y: 0 };
        case 'right':
          return { x: distance * (index + 1), y: 0 };
        case 'radial': {
          const angle = (index * 360) / actionCount;
          const radian = (angle * Math.PI) / 180;
          return {
            x: Math.cos(radian) * distance,
            y: Math.sin(radian) * distance,
          };
        }
        default:
          return { x: 0, y: -(distance * (index + 1)) };
      }
    };

    const getColorClasses = (color: FloatingAction['color'] = 'primary') => {
      const colors = {
        primary:
          'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/25',
        secondary: 'liquid-glass text-[var(--text-primary)]',
        success:
          'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-green-500/25',
        warning:
          'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-yellow-500/25',
        error:
          'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-red-500/25',
      };
      return colors[color];
    };

    return (
      <div
        ref={ref}
        className={cn(positionClasses[position], className)}
        {...props}
      >
        {/* Action Items */}
        <AnimatePresence>
          {isExpanded &&
            actions.map((action, index) => {
              const position = getActionPosition(index);
              return (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    x: position.x,
                    y: position.y,
                  }}
                  exit={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: index * 0.05,
                  }}
                >
                  <motion.button
                    className={cn(
                      'relative group flex items-center justify-center rounded-full shadow-lg',
                      'liquid-glass liquid-glass-interactive liquid-glass-ripple',
                      specularHighlights && 'liquid-glass-specular',
                      sizeClasses['lg' === size ? 'md' : 'sm'],
                      getColorClasses(action.color)
                    )}
                    onClick={() => {
                      action.onClick();
                      setIsExpanded(false);
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={iconSizes['lg' === size ? 'md' : 'sm']}>
                      {action.icon}
                    </span>

                    {/* Action Label */}
                    <motion.div
                      className="absolute whitespace-nowrap px-3 py-1 liquid-glass liquid-glass-specular rounded-lg text-xs font-medium text-[var(--text-primary)] pointer-events-none"
                      style={{
                        ['left' === expandDirection ? 'right' : 'left']:
                          'left' === expandDirection ||
                          'right' === expandDirection
                            ? '100%'
                            : '50%',
                        ['up' === expandDirection ? 'bottom' : 'top']:
                          'up' === expandDirection || 'down' === expandDirection
                            ? '100%'
                            : '50%',
                        transform:
                          'radial' === expandDirection
                            ? 'translate(-50%, -50%)'
                            : 'left' === expandDirection ||
                                'right' === expandDirection
                              ? 'translateY(-50%)'
                              : 'translateX(-50%)',
                        marginLeft:
                          'left' === expandDirection
                            ? '-8px'
                            : 'right' === expandDirection
                              ? '8px'
                              : '0',
                        marginTop:
                          'up' === expandDirection
                            ? '-8px'
                            : 'down' === expandDirection
                              ? '8px'
                              : '0',
                      }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {action.label}
                    </motion.div>
                  </motion.button>
                </motion.div>
              );
            })}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          ref={setRefs}
          className={cn(
            'relative group flex items-center justify-center rounded-full shadow-xl',
            'liquid-glass liquid-glass-interactive liquid-glass-ripple',
            'glow' === variant && 'liquid-glass-glow',
            specularHighlights && 'liquid-glass-specular liquid-glass-shimmer',
            enableMagnetic && 'liquid-glass-magnetic',
            sizeClasses[size],
            'default' === variant &&
              'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-blue-500/25',
            'minimal' === variant && 'liquid-glass text-[var(--text-primary)]',
            'glow' === variant &&
              'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-purple-500/25'
          )}
          style={{
            transform: enableMagnetic ? transform : undefined,
          }}
          onClick={handleMainClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <motion.span
            className={iconSizes[size]}
            animate={isExpanded ? { rotate: 45 } : { rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {mainIcon}
          </motion.span>

          {/* Pulse Effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-current"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.button>

        {/* Tooltip */}
        <AnimatePresence>
          {tooltip && showTooltip && !isExpanded && (
            <motion.div
              className="absolute whitespace-nowrap px-3 py-2 liquid-glass liquid-glass-specular rounded-lg text-sm font-medium text-[var(--text-primary)] pointer-events-none"
              style={{
                [position.includes('right') ? 'right' : 'left']: '100%',
                [position.includes('bottom') ? 'bottom' : 'top']: '50%',
                transform: 'translateY(-50%)',
                marginRight: position.includes('right') ? '12px' : '0',
                marginLeft: position.includes('left') ? '12px' : '0',
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
                x: position.includes('right') ? 10 : -10,
              }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                x: position.includes('right') ? 10 : -10,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {tooltip}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Background Blur Overlay */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />
          )}
        </AnimatePresence>
      </div>
    );
  }
);

GlassFloatingAction.displayName = 'GlassFloatingAction';

export { GlassFloatingAction };
