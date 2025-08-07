import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const radioGroupVariants = cva({
  base: "grid gap-2",
  variants: {
    orientation: {
      horizontal: "grid-flow-col",
      vertical: "grid-flow-row",
    },
    size: {
      sm: "gap-1",
      md: "gap-2",
      lg: "gap-3",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
      false: "",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    size: "md",
    disabled: "false",
  },
});

const radioItemVariants = cva({
  base: "group flex cursor-pointer items-center gap-2 rounded-lg p-2 transition-all duration-200 hover:bg-white/5 focus:bg-white/10 focus:outline-none data-[state=checked]:bg-white/10 data-[state=checked]:shadow-lg border border-white/10 backdrop-blur-md",
  variants: {
    size: {
      sm: "gap-1.5 p-1.5 text-sm",
      md: "gap-2 p-2 text-base",
      lg: "gap-3 p-3 text-lg",
    },
    variant: {
      default: "bg-white/5 hover:bg-white/10",
      solid: "bg-white/10 hover:bg-white/15",
      ghost: "bg-transparent hover:bg-white/5",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

const radioIndicatorVariants = cva({
  base: "relative h-5 w-5 rounded-full border-2 border-white/20 group-data-[state=checked]:border-blue-400 group-data-[state=checked]:bg-gradient-to-br group-data-[state=checked]:from-blue-400/20 group-data-[state=checked]:to-purple-400/20 backdrop-blur-sm transition-all duration-200 group-hover:border-white/40 group-focus:border-blue-400",
  variants: {},
});

interface GlassRadioGroupProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    "orientation"
  > {
  children: React.ReactNode;
  orientation?: "horizontal" | "vertical";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

interface GlassRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "solid" | "ghost";
  children: React.ReactNode;
  value: string;
  id?: string;
}

const GlassRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  GlassRadioGroupProps
>(({ className, orientation, size, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn(radioGroupVariants({ ...{ orientation, size } } as any), className)}
      {...props}
      ref={ref}
    />
  );
});

const GlassRadioItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  GlassRadioItemProps
>(({ className, children, size, variant, ...props }, ref) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(radioItemVariants({ ...{ size, variant } } as any), className)}
        {...props}
      >
        <div className={cn(radioIndicatorVariants())}>
          <RadioGroupPrimitive.Indicator asChild>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 600, damping: 30 }}
              className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 shadow-lg"
            />
          </RadioGroupPrimitive.Indicator>
        </div>

        <div className="liquid-glass flex-1">{children}</div>
      </RadioGroupPrimitive.Item>
    </motion.div>
  );
});

GlassRadioGroup.displayName = "GlassRadioGroup";
GlassRadioItem.displayName = "GlassRadioItem";

// Compound component pattern
const RadioGroup = Object.assign(GlassRadioGroup, {
  Item: GlassRadioItem,
});

export { RadioGroup, GlassRadioGroup };
