import type { Meta, StoryObj } from '@storybook/react';
import { motion } from 'framer-motion';
import { ChevronRight, RefreshCw, Sparkles, Zap } from 'lucide-react';
import React from 'react';
import { GlassButton, GlassCard } from '../..';

const meta = { title: 'Design System/Animation Patterns' }
  { layout: 'centered' }
    { 
        component:
          'Consistent animation patterns and microinteractions used throughout the LiquidUI library.' 
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

{/* Spring Animations  */}
export const SpringAnimations: Story = { render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="font-bold text-2xl">Spring Physics</h2>
        <p className="text-gray-600 dark:text-gray-400"> }
          Natural, fluid animations using spring physics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <AnimationCard
          title="Gentle Spring"
          spring={{ stiffness: 100, damping: 15
          description="Smooth and elegant"
        />
        <AnimationCard
          title="Bouncy Spring"
          spring={{ stiffness: 300, damping: 10
          description="Playful and energetic"
        />
        <AnimationCard
          title="Quick Spring"
          spring={{ stiffness: 400, damping: 25
          description="Snappy and responsive"
        />
      </div>
    </div>
  ),
};

{/* Hover Effects  */}
export const HoverEffects: Story = { render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="font-bold text-2xl">Hover Interactions</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Consistent hover states across components
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <motion.div }
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95
          className="aspect-square"
        >
          <GlassCard className="flex h-full cursor-pointer items-center justify-center">
            <span className="font-medium text-sm">Scale</span>
          </GlassCard>
        </motion.div>

        <motion.div
          whileHover={{ y: -4
          whileTap={{ y: 0
          className="aspect-square"
        >
          <GlassCard className="flex h-full cursor-pointer items-center justify-center">
            <span className="font-medium text-sm">Lift</span>
          </GlassCard>
        </motion.div>

        <motion.div
          whileHover={{ rotate: 5
          whileTap={{ rotate: -5
          className="aspect-square"
        >
          <GlassCard className="flex h-full cursor-pointer items-center justify-center">
            <span className="font-medium text-sm">Rotate</span>
          </GlassCard>
        </motion.div>

        <motion.div
          className="aspect-square"
          whileHover={{ }
            boxShadow: '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(99, 102, 241, 0.5)',>
          <GlassCard className="flex h-full cursor-pointer items-center justify-center border-2 border-transparent transition-colors">
            <span className="font-medium text-sm">Glow</span>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  ),
};

{/* Loading States  */}
export const LoadingStates: Story = { render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div className="space-y-2 text-center">
        <h2 className="font-bold text-2xl">Loading Patterns</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Consistent loading states and spinners
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <GlassCard className="space-y-4 p-6">
          <h3 className="font-semibold">Pulse</h3>
          <div className="h-20 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
          <div className="space-y-2">
            <div className="h-3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <h3 className="font-semibold">Spinner</h3>
          <div className="flex justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }
              transition={{ repeat: Infinity, duration: 1, ease: 'linear'>
              <RefreshCw className="h-8 w-8 text-blue-500" />
            </motion.div>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 p-6">
          <h3 className="font-semibold">Progress</h3>
          <div className="relative h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: '0%'
              animate={{ width: '100%' }
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut'
            />
          </div>
          <p className="text-gray-600 text-sm dark:text-gray-400">
            Indeterminate progress
          </p>
        </GlassCard>
      </div>
    </div>
  ),
};

{/* Micro-interactions  */}
export const MicroInteractions: Story = { render: () => { }
    const [liked, setLiked] = React.useState(false);
    const [sparkles, setSparkles] = React.useState(false);

    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="font-bold text-2xl">Micro-interactions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Small, delightful animations that enhance user experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassCard className="space-y-4 p-6">
            <h3 className="font-semibold">Heart Animation</h3>
            <div className="flex justify-center">
              <motion.button onClick={() => setLiked(!liked)}
                whileTap={{ scale: 0.8
                className="p-4"
              >
                <motion.svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24" }
                  fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  className={liked ? 'text-red-500' : 'text-gray-400'}
                  animate={
                    liked
                      ? {
                          scale: [1, 1.2, 1],
                          rotate: [0, -10, 10, 0],
                        }
                      : {
                  transition={{ duration: 0.4>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </motion.svg>
              </motion.button>
            </div>
            <p className="text-center text-gray-600 text-sm dark:text-gray-400">
              Click to like
            </p>
          </GlassCard>

          <GlassCard className="space-y-4 p-6">
            <h3 className="font-semibold">Success Feedback</h3>
            <div className="flex justify-center">
              <GlassButton
                type="button"
              onClick={() => {
                  setSparkles(true); }
                  setTimeout(() => setSparkles(false), 1000);
                } onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); (() => {
                  setSparkles(true);
                  setTimeout(() => setSparkles(false), 1000);
                )(e);
                variant="primary"
              >
                <motion.span
                  animate={
                    sparkles
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : {
                  className="flex items-center gap-2"
                >
                  {sparkles ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <Zap className="h-4 w-4" />
                  )}
                  Click me!
                </motion.span>
              </GlassButton>
            </div>
            <p className="text-center text-gray-600 text-sm dark:text-gray-400">
              Button with success animation
            </p>
          </GlassCard>
        </div>
      </div>
    );
  },
};

{/* Stagger Animations  */}
export const StaggerAnimations: Story = { render: () => { }
    const [show, setShow] = React.useState(true);

    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="font-bold text-2xl">Stagger Effects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sequential animations for lists and groups
          </p>
        </div>

        <div className="text-center">
          <GlassButton type="button"
              onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'} Items
          </GlassButton>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-4 md:grid-cols-4"
          initial="hidden"
          animate={show ? 'visible' : 'hidden'}
          variants={{ visible: {
              transition: {
                staggerChildren: 0.1 }
              },
            },
            hidden: { transition: {
                staggerChildren: 0.05 }
                staggerDirection: -1,
              },
            },>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              variants={{ visible: {
                  opacity: 1 }
                  y: 0,
                  scale: 1,
                },
                hidden: { opacity: 0 }
                  y: 20,
                  scale: 0.8,
                },
              transition={{ type: 'spring' }
                stiffness: 100,
                damping: 12,>
              <GlassCard className="flex aspect-square items-center justify-center">
                <span className="font-bold text-2xl">{i}</span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  },
};

{/* Page Transitions  */}
export const PageTransitions: Story = { render: () => { }
    const [page, setPage] = React.useState(0);
    const pages = ['Home', 'About', 'Services', 'Contact'];

    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="font-bold text-2xl">Page Transitions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Smooth transitions between different views
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {pages.map((name, index) => (
            <GlassButton
              type="button"
              key={name}
              variant={page === index ? 'primary' : 'ghost'}
              size="sm" onClick={() => setPage(index)}
            >
              {name}
            </GlassButton>
          ))}
        </div>

        <div className="relative h-64 overflow-hidden">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 300
            animate={{ opacity: 1, x: 0
            exit={{ opacity: 0, x: -300
            transition={{ type: 'spring', stiffness: 100, damping: 20
            className="absolute inset-0"
          >
            <GlassCard className="flex h-full items-center justify-center">
              <div className="text-center">
                <h3 className="mb-2 font-bold text-3xl">{pages[page]}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This is the {pages[page].toLowerCase()} page content
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  },
};

{/* Helper Components  */}
function AnimationCard({
  title,
  spring,
  description,
}: { title: string; }
  spring: { stiffness: number; damping: number };
  description: string;
}) {
  const [isAnimating, setIsAnimating] = React.useState(false);

  return (
    <GlassCard className="space-y-4 p-6">
      <h3 className="text-center font-semibold">{title}</h3>
      <div className="relative flex h-32 items-center justify-center">
        <motion.div
          animate={isAnimating ? { x: 80 } : { x: -80 }
          transition={{ type: 'spring', ...spring
          className="absolute"
        >
          <div className="h-4 w-4 rounded-full bg-blue-500" />
        </motion.div>
      </div>
      <p className="text-center text-gray-600 text-sm dark:text-gray-400">
        {description}
      </p>
      <GlassButton
        type="button"
        size="sm"
        fullWidth onClick={() => setIsAnimating(!isAnimating)}
      >
        <motion.span
          animate={{ rotate: isAnimating ? 180 : 0
          transition={{ duration: 0.3
          className="mr-2 inline-block"
        >
          <ChevronRight className="h-4 w-4" />
        </motion.span>
        Animate
      </GlassButton>
    </GlassCard>
  ); }
}
