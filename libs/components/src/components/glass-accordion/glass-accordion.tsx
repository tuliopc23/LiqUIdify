import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "@/core/utils/classname";
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from "../../lib/variant-system";

const accordionVariants = cva({
  base: "w-full space-y-2 rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur-md",
  variants: {
    size: {
      sm: "p-1 text-sm",
      md: "p-2 text-base",
      lg: "p-3 text-lg",
    },
    variant: {
      default: "bg-white/5",
      solid: "bg-white/10",
      ghost: "border-transparent bg-transparent p-0",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const accordionItemVariants = cva({
  base: "overflow-hidden rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-white/10",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const accordionTriggerVariants = cva({
  base: "group flex w-full flex-1 items-center justify-between p-4 text-left font-medium text-white transition-all duration-200 hover:bg-white/5 focus:bg-white/10 focus:outline-none data-[state=open]:bg-white/5",
  variants: {
    size: {
      sm: "p-2 text-sm",
      md: "p-4 text-base",
      lg: "p-6 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const accordionContentVariants = cva({
  base: "overflow-hidden border-white/10 border-t bg-white/5 text-white/80",
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Single accordion props
interface GlassAccordionSingleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
      "type"
    >,
    VariantProps<typeof accordionVariants> {
  children: React.ReactNode;
  type: "single";
  collapsible?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

// Multiple accordion props
interface GlassAccordionMultipleProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>,
      "type"
    >,
    VariantProps<typeof accordionVariants> {
  children: React.ReactNode;
  type: "multiple";
  value?: Array<string>;
  defaultValue?: Array<string>;
  onValueChange?: (value: Array<string>) => void;
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
            className="text-white/60 transition-colors group-hover:text-white"
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

GlassAccordion.displayName = "GlassAccordion";
GlassAccordionItem.displayName = "GlassAccordionItem";
GlassAccordionTrigger.displayName = "GlassAccordionTrigger";
GlassAccordionContent.displayName = "GlassAccordionContent";

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
