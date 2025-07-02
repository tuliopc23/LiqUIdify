import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/glass-utils';
import { cva, type VariantProps } from 'class-variance-authority';

const drawerVariants = cva(
  [
    'fixed z-50 gap-4 bg-black/80 backdrop-blur-sm',
    'border border-white/10 shadow-lg',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
  ],
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
      size: {
        sm: '',
        md: '',
        lg: '',
        xl: '',
        full: '',
      },
    },
    compoundVariants: [
      {
        side: ['left', 'right'],
        size: 'sm',
        class: 'max-w-xs',
      },
      {
        side: ['left', 'right'],
        size: 'md',
        class: 'max-w-sm',
      },
      {
        side: ['left', 'right'],
        size: 'lg',
        class: 'max-w-md',
      },
      {
        side: ['left', 'right'],
        size: 'xl',
        class: 'max-w-lg',
      },
      {
        side: ['left', 'right'],
        size: 'full',
        class: 'max-w-full',
      },
      {
        side: ['top', 'bottom'],
        size: 'sm',
        class: 'max-h-32',
      },
      {
        side: ['top', 'bottom'],
        size: 'md',
        class: 'max-h-48',
      },
      {
        side: ['top', 'bottom'],
        size: 'lg',
        class: 'max-h-64',
      },
      {
        side: ['top', 'bottom'],
        size: 'xl',
        class: 'max-h-80',
      },
      {
        side: ['top', 'bottom'],
        size: 'full',
        class: 'max-h-full',
      },
    ],
    defaultVariants: {
      side: 'right',
      size: 'md',
    },
  }
);

const drawerHeaderVariants = cva(
  [
    'flex items-center justify-between',
    'p-4 border-b border-white/10',
    'bg-white/5',
  ]
);

const drawerContentVariants = cva(
  [
    'flex-1 p-4 overflow-y-auto',
    'text-white',
  ]
);

const drawerFooterVariants = cva(
  [
    'flex items-center justify-end gap-2',
    'p-4 border-t border-white/10',
    'bg-white/5',
  ]
);

export interface GlassDrawerProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  children: React.ReactNode;
}

export interface GlassDrawerContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof drawerVariants> {
  children: React.ReactNode;
  showCloseButton?: boolean;
  closeButtonPosition?: 'header' | 'overlay';
}

export interface GlassDrawerHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface GlassDrawerTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  children: React.ReactNode;
}

export interface GlassDrawerDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description> {
  children: React.ReactNode;
}

export interface GlassDrawerBodyProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface GlassDrawerFooterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const GlassDrawer: React.FC<GlassDrawerProps> = ({ children, ...props }) => {
  return (
    <DialogPrimitive.Root {...props}>
      {children}
    </DialogPrimitive.Root>
  );
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
      'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
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
      side = 'right',
      size = 'md',
      className,
      children,
      showCloseButton = true,
      closeButtonPosition = 'header',
      ...props
    },
    ref
  ) => (
    <GlassDrawerPortal>
      <GlassDrawerOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(drawerVariants({ side, size }), className)}
        {...props}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-full flex-col"
        >
          {children}
          {showCloseButton && closeButtonPosition === 'overlay' && (
            <GlassDrawerClose className="absolute right-4 top-4 rounded-md opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-white/10">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </GlassDrawerClose>
          )}
        </motion.div>
      </DialogPrimitive.Content>
    </GlassDrawerPortal>
  )
);

const GlassDrawerHeader = React.forwardRef<HTMLDivElement, GlassDrawerHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(drawerHeaderVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
);

const GlassDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  GlassDrawerTitleProps
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-white', className)}
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
    className={cn('text-sm text-white/70', className)}
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
  )
);

const GlassDrawerFooter = React.forwardRef<HTMLDivElement, GlassDrawerFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(drawerFooterVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
);

GlassDrawer.displayName = 'GlassDrawer';
GlassDrawerOverlay.displayName = 'GlassDrawerOverlay';
GlassDrawerContent.displayName = 'GlassDrawerContent';
GlassDrawerHeader.displayName = 'GlassDrawerHeader';
GlassDrawerTitle.displayName = 'GlassDrawerTitle';
GlassDrawerDescription.displayName = 'GlassDrawerDescription';
GlassDrawerBody.displayName = 'GlassDrawerBody';
GlassDrawerFooter.displayName = 'GlassDrawerFooter';

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

export {
  Drawer,
  GlassDrawer,
  GlassDrawerTrigger,
  GlassDrawerClose,
  GlassDrawerPortal,
  GlassDrawerOverlay,
  GlassDrawerContent,
  GlassDrawerHeader,
  GlassDrawerTitle,
  GlassDrawerDescription,
  GlassDrawerBody,
  GlassDrawerFooter,
};

export type {
  GlassDrawerProps,
  GlassDrawerContentProps,
  GlassDrawerHeaderProps,
  GlassDrawerTitleProps,
  GlassDrawerDescriptionProps,
  GlassDrawerBodyProps,
  GlassDrawerFooterProps,
};
