import React, { forwardRef } from 'react';
import { cn } from '@/core/utils/classname';

export interface GlassVisuallyHiddenProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

const visuallyHiddenStyles = cn(
  'absolute',
  'w-px h-px',
  'p-0 m-[-1px]',
  'overflow-hidden',
  'whitespace-nowrap',
  'border-0',
  'clip-path-[inset(50%)]'
);

const GlassVisuallyHidden = forwardRef<
  HTMLSpanElement,
  GlassVisuallyHiddenProps
>(({ className, asChild = false, children, ...props }, ref) => {
  const Component = asChild ? React.Fragment : 'span';

  if (asChild) {
    return (
      <>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            const childProps = child.props as any;
            return React.cloneElement(child, {
              className: cn(visuallyHiddenStyles, childProps?.className),
              ...('object' === typeof childProps && null !== childProps 
                ? childProps
                : {}),
            });
          }
          return child;
        })}
      </>
    );
  }

  return (
    <Component
      ref={ref}
      className={cn(visuallyHiddenStyles, className)}
      {...props}
    >
      {children}
    </Component>
  );
});

GlassVisuallyHidden.displayName = 'GlassVisuallyHidden';

export { GlassVisuallyHidden };
