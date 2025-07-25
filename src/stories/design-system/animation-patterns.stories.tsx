import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton, GlassCard } from '@/components';
import { ChevronRight, RefreshCw, Zap, Sparkles } from 'lucide-react';

const meta = {
  title: 'Design System/Animation Patterns',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Consistent animation patterns and microinteractions used throughout the LiquidUI library.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Spring Animations
export const SpringAnimations: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Spring Physics</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Natural, fluid animations using spring physics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimationCard
          title="Gentle Spring"
          spring={{ stiffness: 100, damping: 15 }}
          description="Smooth and elegant"
        />
        <AnimationCard
          title="Bouncy Spring"
          spring={{ stiffness: 300, damping: 10 }}
          description="Playful and energetic"
        />
        <AnimationCard
          title="Quick Spring"
          spring={{ stiffness: 400, damping: 25 }}
          description="Snappy and responsive"
        />
      </div>
    </div>
  ),
};

// Hover Effects
export const HoverEffects: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Hover Interactions</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Consistent hover states across components
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="aspect-square"
        >
          <GlassCard className="h-full flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium">Scale</span>
          </GlassCard>
        </motion.div>

        <motion.div
          whileHover={{ y: -4 }}
          whileTap={{ y: 0 }}
          className="aspect-square"
        >
          <GlassCard className="h-full flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium">Lift</span>
          </GlassCard>
        </motion.div>

        <motion.div
          whileHover={{ rotate: 5 }}
          whileTap={{ rotate: -5 }}
          className="aspect-square"
        >
          <GlassCard className="h-full flex items-center justify-center cursor-pointer">
            <span className="text-sm font-medium">Rotate</span>
          </GlassCard>
        </motion.div>

        <motion.div
          className="aspect-square"
          whileHover={{ 
            boxShadow: "0 20px 40px -15px rgba(0, 0, 0, 0.3)",
            borderColor: "rgba(99, 102, 241, 0.5)"
          }}
        >
          <GlassCard className="h-full flex items-center justify-center cursor-pointer border-2 border-transparent transition-colors">
            <span className="text-sm font-medium">Glow</span>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  ),
};

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Loading Patterns</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Consistent loading states and spinners
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-semibold">Pulse</h3>
          <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4" />
          </div>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h3 className="font-semibold">Spinner</h3>
          <div className="flex justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="h-8 w-8 text-blue-500" />
            </motion.div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h3 className="font-semibold">Progress</h3>
          <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Indeterminate progress</p>
        </GlassCard>
      </div>
    </div>
  ),
};

// Micro-interactions
export const MicroInteractions: Story = {
  render: () => {
    const [liked, setLiked] = React.useState(false);
    const [sparkles, setSparkles] = React.useState(false);

    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Micro-interactions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Small, delightful animations that enhance user experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="font-semibold">Heart Animation</h3>
            <div className="flex justify-center">
              <motion.button
                onClick={() => setLiked(!liked)}
                whileTap={{ scale: 0.8 }}
                className="p-4"
              >
                <motion.svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill={liked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                  className={liked ? "text-red-500" : "text-gray-400"}
                  animate={liked ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, -10, 10, 0],
                  } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </motion.svg>
              </motion.button>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Click to like
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <h3 className="font-semibold">Success Feedback</h3>
            <div className="flex justify-center">
              <GlassButton
                onClick={() => {
                  setSparkles(true);
                  setTimeout(() => setSparkles(false), 1000);
                }}
                variant="primary"
              >
                <motion.span
                  animate={sparkles ? {
                    scale: [1, 1.1, 1],
                  } : {}}
                  className="flex items-center gap-2"
                >
                  {sparkles ? <Sparkles className="h-4 w-4" /> : <Zap className="h-4 w-4" />}
                  Click me!
                </motion.span>
              </GlassButton>
            </div>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Button with success animation
            </p>
          </GlassCard>
        </div>
      </div>
    );
  },
};

// Stagger Animations
export const StaggerAnimations: Story = {
  render: () => {
    const [show, setShow] = React.useState(true);

    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Stagger Effects</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sequential animations for lists and groups
          </p>
        </div>

        <div className="text-center">
          <GlassButton onClick={() => setShow(!show)}>
            {show ? 'Hide' : 'Show'} Items
          </GlassButton>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial="hidden"
          animate={show ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
            hidden: {
              transition: {
                staggerChildren: 0.05,
                staggerDirection: -1,
              },
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <motion.div
              key={i}
              variants={{
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                },
                hidden: {
                  opacity: 0,
                  y: 20,
                  scale: 0.8,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 12,
              }}
            >
              <GlassCard className="aspect-square flex items-center justify-center">
                <span className="text-2xl font-bold">{i}</span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    );
  },
};

// Page Transitions
export const PageTransitions: Story = {
  render: () => {
    const [page, setPage] = React.useState(0);
    const pages = ['Home', 'About', 'Services', 'Contact'];

    return (
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Page Transitions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Smooth transitions between different views
          </p>
        </div>

        <div className="flex justify-center gap-2">
          {pages.map((name, index) => (
            <GlassButton
              key={name}
              variant={page === index ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setPage(index)}
            >
              {name}
            </GlassButton>
          ))}
        </div>

        <div className="relative h-64 overflow-hidden">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="absolute inset-0"
          >
            <GlassCard className="h-full flex items-center justify-center">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">{pages[page]}</h3>
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

// Helper Components
function AnimationCard({ 
  title, 
  spring, 
  description 
}: { 
  title: string; 
  spring: { stiffness: number; damping: number };
  description: string;
}) {
  const [isAnimating, setIsAnimating] = React.useState(false);

  return (
    <GlassCard className="p-6 space-y-4">
      <h3 className="font-semibold text-center">{title}</h3>
      <div className="relative h-32 flex items-center justify-center">
        <motion.div
          animate={isAnimating ? { x: 80 } : { x: -80 }}
          transition={{ type: "spring", ...spring }}
          className="absolute"
        >
          <div className="w-4 h-4 bg-blue-500 rounded-full" />
        </motion.div>
      </div>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
        {description}
      </p>
      <GlassButton
        size="sm"
        fullWidth
        onClick={() => setIsAnimating(!isAnimating)}
      >
        <motion.span
          animate={{ rotate: isAnimating ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block mr-2"
        >
          <ChevronRight className="h-4 w-4" />
        </motion.span>
        Animate
      </GlassButton>
    </GlassCard>
  );
}