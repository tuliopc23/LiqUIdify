import * as DialogPrimitive from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import React from "react";
import { cn } from "../../core/utils/classname";
import { createVariants as cva } from "../../lib/variant-system";

const drawerVariants = cva({
  base: [
    "fixed z-50 gap-4",
    // liquid-glass styling for the content surface
    "liquid-glass-container",
    "border border-liquid-highlight/40 shadow-liquid-main backdrop-blur-liquid-main",
    "data-[state=closed]:animate-out data-[state=open]:animate-in",
    "data-[state=closed]:duration-300 data-[state=open]:duration-500",
  ].join(" "),
  variants: {
    side: {
      top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
      bottom:
        "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
      left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right:
        "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      xl: "",
      full: "",
    },
  },
  compoundVariants: [
    {
      side: "left" as const,
      size: "sm" as const,
      class: "max-w-xs",
    },
    {
      side: "right" as const,
      size: "sm" as const,
      class: "max-w-xs",
    },
    {
      side: "left" as const,
      size: "md" as const,
      class: "max-w-sm",
    },
    {
      side: "right" as const,
      size: "md" as const,
      class: "max-w-sm",
    },
    {
      side: "left" as const,
      size: "lg" as const,
      class: "max-w-md",
    },
    {
      side: "right" as const,
      size: "lg" as const,
      class: "max-w-md",
    },
    {
      side: "left" as const,
      size: "xl" as const,
      class: "max-w-lg",
    },
    {
      side: "right" as const,
      size: "xl" as const,
      class: "max-w-lg",
    },
    {
      side: "left" as const,
      size: "full" as const,
      class: "max-w-full",
    },
    {
      side: "right" as const,
      size: "full" as const,
      class: "max-w-full",
    },
    {
      side: "top" as const,
      size: "sm" as const,
      class: "max-h-32",
    },
    {
      side: "bottom" as const,
      size: "sm" as const,
      class: "max-h-32",
    },
    {
      side: "top" as const,
      size: "md" as const,
      class: "max-h-48",
    },
    {
      side: "bottom" as const,
      size: "md" as const,
      class: "max-h-48",
    },
    {
      side: "top" as const,
      size: "lg" as const,
      class: "max-h-64",
    },
    {
      side: "bottom" as const,
      size: "lg" as const,
      class: "max-h-64",
    },
    {
      side: "top" as const,
      size: "xl" as const,
      class: "max-h-80",
    },
    {
      side: "bottom" as const,
      size: "xl" as const,
      class: "max-h-80",
    },
    {
      side: "top" as const,
      size: "full" as const,
      class: "max-h-full",
    },
    {
      side: "bottom" as const,
      size: "full" as const,
      class: "max-h-full",
    },
  ],
  defaultVariants: {
    side: "right" as const,
    size: "md" as const,
  },
});

const drawerHeaderVariants = cva({
  base: "flex items-center justify-between border-b border-liquid-highlight/30 bg-transparent p-4",
  variants: {},
});

const drawerContentVariants = cva({
  base: "flex-1 overflow-y-auto p-4",
  variants: {},
});

const drawerFooterVariants = cva({
  base: "flex items-center justify-end gap-2 border-t border-liquid-glass-hl/30 bg-transparent p-4",
  variants: {},
});

interface GlassDrawerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  children: React.ReactNode;
}

interface GlassDrawerContentProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    "children"
  > {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  closeButtonPosition?: "header" | "overlay";
  side?: "top" | "bottom" | "left" | "right";
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

interface GlassDrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface GlassDrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  children: React.ReactNode;
}

interface GlassDrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  children: React.ReactNode;
}

interface GlassDrawerBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

interface GlassDrawerFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassDrawer: React.FC<GlassDrawerProps> = ({ children, ...props }) => {
  return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root>;
};

const GlassDrawerTrigger = DialogPrimitive.Trigger;

const GlassDrawerClose = DialogPrimitive.Close;

const GlassDrawerPortal = DialogPrimitive.Portal;

const GlassDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-liquid-bg/30 backdrop-blur-liquid-main",
      "data-[state=closed]:animate-out data-[state=open]:animate-in",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className,
    )}
    {...props}
  />
));

const GlassDrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  GlassDrawerContentProps
>(
  (
    {
      side = "right",
      size = "md",
      className,
      children,
      showCloseButton = true,
      closeButtonPosition = "header",
      ...props
    },
    ref,
  ) => (
    <GlassDrawerPortal>
      <GlassDrawerOverlay />

      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerVariants({ ...{ side, size } } as any), className)}
        {...props}
      >
        {/* glass layers */}
        <div className="liquid-glass-filter" />
        <div className="liquid-glass-overlay" />
        <div className="liquid-glass-specular" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="liquid-glass-content p-0 flex h-full flex-col"
        >
          {children}
          {showCloseButton && closeButtonPosition === "overlay" && (
            <GlassDrawerClose className="absolute top-4 right-4 rounded-md opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-liquid-accent/40">
              <X className="h-4 w-4" />

              <span className="sr-only">Close</span>
            </GlassDrawerClose>
          )}
        </motion.div>
      </DialogPrimitive.Content>
    </GlassDrawerPortal>
  ),
);

const GlassDrawerHeader = React.forwardRef<
  HTMLDivElement,
  GlassDrawerHeaderProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(drawerHeaderVariants(), className)} {...props}>
    {children}
  </div>
));

const GlassDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  GlassDrawerTitleProps
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-semibold text-lg text-liquid-text", className)}
    {...props}
  >
    {children}
  </DialogPrimitive.Title>
));

const GlassDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  GlassDrawerDescriptionProps
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-liquid-text/70", className)}
    {...props}
  >
    {children}
  </DialogPrimitive.Description>
));

const GlassDrawerBody = React.forwardRef<HTMLDivElement, GlassDrawerBodyProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(drawerContentVariants(), className)}
      {...props}
    >
      {children}
    </div>
  ),
);

const GlassDrawerFooter = React.forwardRef<
  HTMLDivElement,
  GlassDrawerFooterProps
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn(drawerFooterVariants(), className)} {...props}>
    {children}
  </div>
));

GlassDrawer.displayName = "GlassDrawer";
GlassDrawerOverlay.displayName = "GlassDrawerOverlay";
GlassDrawerContent.displayName = "GlassDrawerContent";
GlassDrawerHeader.displayName = "GlassDrawerHeader";
GlassDrawerTitle.displayName = "GlassDrawerTitle";
GlassDrawerDescription.displayName = "GlassDrawerDescription";
GlassDrawerBody.displayName = "GlassDrawerBody";
GlassDrawerFooter.displayName = "GlassDrawerFooter";

// Compound component pattern
const Drawer = Object.assign(GlassDrawer, {
  Trigger: GlassDrawerTrigger,
  Close: GlassDrawerClose,
  Portal: GlassDrawerPortal,
  Overlay: GlassDrawerOverlay,
  Content: GlassDrawerContent,
  Header: GlassDrawerHeader,
  Title: GlassDrawerTitle,
  Description: GlassDrawerDescription,
  Body: GlassDrawerBody,
  Footer: GlassDrawerFooter,
});

export { Drawer };
