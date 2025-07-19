import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/glass-utils';
import { type VariantProps, cva } from 'class-variance-authority';

const accordionVariants = cva(
  [
    'w-full space-y-2',
    'backdrop-blur-md rounded-lg',
    'bg-white/5 border border-white/10',
    'p-2',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm p-1',
        md: 'text-base p-2',
        lg: 'text-lg p-3',
      },
      variant: {
        default: 'bg-white/5',
        solid: 'bg-white/10',
        ghost: 'bg-transparent border-transparent p-0',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

const accordionItemVariants = cva(
  [
    'backdrop-blur-sm rounded-lg',
    'border border-white/10',
    'bg-white/5',
    'overflow-hidden',
    'transition-all duration-200',
    'hover:bg-white/10',
  ],
  {
    variants: {
      size: {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const accordionTriggerVariants = cva(
  [
    'flex flex-1 items-center justify-between w-full',
    'p-4 font-medium text-left',
    'transition-all duration-200',
    'hover:bg-white/5 focus:bg-white/10 focus:outline-none',
    'group text-white',
    'data-[state=open]:bg-white/5',
  ],
  {
    variants: {
      size: {
        sm: 'p-2 text-sm',
        md: 'p-4 text-base',
        lg: 'p-6 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const accordionContentVariants = cva(
  ['overflow-hidden text-white/80', 'border-t border-white/10', 'bg-white/5'],
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

// Single accordion props
export interface GlassAccordionSingleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
      'type'
    >,
    VariantProps<typeof accordionVariants> {
  children: React.ReactNode;
  type: 'single';
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

// Multiple accordion props
export interface GlassAccordionMultipleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
      'type'
    >,
    VariantProps<typeof accordionVariants> {
  children: React.ReactNode;
  type: 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
}

// Union type for all accordion props
export type GlassAccordionProps =
  | GlassAccordionSingleProps
  | GlassAccordionMultipleProps;

export interface GlassAccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {
  children: React.ReactNode;
  value: string;
}

export interface GlassAccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  children: React.ReactNode;
  showIcon?: boolean;
}

export interface GlassAccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {
  children: React.ReactNode;
}

const GlassAccordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  GlassAccordionProps
>(({ className, size, variant, ...props }, ref) => {
  return (
    <AccordionPrimitive.Root
      ref={ref}
      className={cn(accordionVariants({ size, variant }), className)}
      {...props}
    />
  );
});

const GlassAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  GlassAccordionItemProps
>(({ className, size, ...props }, ref) => {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ size }), className)}
      {...props}
    />
  );
});

const GlassAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  GlassAccordionTriggerProps
>(({ className, children, size, showIcon = true, ...props }, ref) => {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(accordionTriggerVariants({ size }), className)}
        {...props}
      >
        <span className="flex-1 text-left">{children}</span>
        {showIcon && (
          <motion.div
            className="text-white/60 group-hover:text-white transition-colors"
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </motion.div>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

const GlassAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  GlassAccordionContentProps
>(({ className, children, size, ...props }, ref) => {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(accordionContentVariants({ size }), className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="p-4"
      >
        {children}
      </motion.div>
    </AccordionPrimitive.Content>
  );
});

GlassAccordion.displayName = 'GlassAccordion';
GlassAccordionItem.displayName = 'GlassAccordionItem';
GlassAccordionTrigger.displayName = 'GlassAccordionTrigger';
GlassAccordionContent.displayName = 'GlassAccordionContent';

// Compound component pattern
const Accordion = Object.assign(GlassAccordion, {
  Item: GlassAccordionItem,
  Trigger: GlassAccordionTrigger,
  Content: GlassAccordionContent,
});

export {
  Accordion,
  GlassAccordion,
  GlassAccordionItem,
  GlassAccordionTrigger,
  GlassAccordionContent,
};
