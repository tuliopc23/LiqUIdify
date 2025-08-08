import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import React from "react";
import { cn } from "../../core/utils/classname";
import {
  createVariants as cva,
  type InferVariantProps as VariantProps,
} from "../../lib/variant-system";

const accordionVariants = cva({
  base: "w-full space-y-2",
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
    variant: {
      default: "",
      enhanced: "",
      ghost: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const accordionItemVariants = cva({
  base: "overflow-hidden liquid-glass-container liquid-glass-md liquid-glass-interactive transition-all duration-200 mb-2",
  variants: {
    size: {
      sm: "liquid-glass-sm",
      md: "liquid-glass-md",
      lg: "liquid-glass-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const accordionTriggerVariants = cva({
  base: "group flex w-full flex-1 items-center justify-between text-left font-medium text-liquid-primary transition-all duration-200 focus:outline-none relative z-10",
  variants: {
    size: {
      sm: "p-3 text-sm",
      md: "p-4 text-base",
      lg: "p-6 text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const accordionContentVariants = cva({
  base: "overflow-hidden text-liquid-secondary relative z-10",
  variants: {
    size: {
      sm: "text-xs px-3 pb-3",
      md: "text-sm px-4 pb-4",
      lg: "text-base px-6 pb-6",
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
  variant?: "default" | "enhanced" | "ghost";
  size?: "sm" | "md" | "lg";
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
  variant?: "default" | "enhanced" | "ghost";
  size?: "sm" | "md" | "lg";
}

// Union type for all accordion props
type GlassAccordionProps =
  | GlassAccordionSingleProps
  | GlassAccordionMultipleProps;

interface GlassAccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>,
    VariantProps<typeof accordionItemVariants> {
  children: React.ReactNode;
  value: string;
  size?: "sm" | "md" | "lg";
}

interface GlassAccordionTriggerProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>,
    VariantProps<typeof accordionTriggerVariants> {
  children: React.ReactNode;
  showIcon?: boolean;
  size?: "sm" | "md" | "lg";
}

interface GlassAccordionContentProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>,
    VariantProps<typeof accordionContentVariants> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

const GlassAccordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  GlassAccordionProps
>(({ className, variant, size, ...props }, ref) => (
  <AccordionPrimitive.Root
    ref={ref}
    className={cn(
      accordionVariants({ ...{ variant, size } } as any),
      className,
    )}
    {...props}
  />
));

const GlassAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  GlassAccordionItemProps
>(({ className, size, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className="relative"
    value={`item-${Math.random()}`}
  >
    <div
      className={cn(accordionItemVariants({ ...{ size } } as any), className)}
    >
      <div className="liquid-glass-filter" />
      <div className="liquid-glass-overlay" />
      <div className="liquid-glass-specular" />
      <div className="liquid-glass-content p-0">{props.children}</div>
    </div>
  </AccordionPrimitive.Item>
));

const GlassAccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  GlassAccordionTriggerProps
>(({ className, children, size, showIcon = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        accordionTriggerVariants({ ...{ size } } as any),
        className,
      )}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
      {showIcon && (
        <motion.div
          className="text-liquid-secondary transition-colors group-hover:text-liquid-accent"
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </motion.div>
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));

const GlassAccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  GlassAccordionContentProps
>(({ className, children, size, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ ...{ size } } as any), className)}
    {...props}
  >
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="border-t border-liquid/20"
    >
      {children}
    </motion.div>
  </AccordionPrimitive.Content>
));

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
