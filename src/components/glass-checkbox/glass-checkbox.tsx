import { forwardRef } from 'react';
import { cn } from '@/core/utils/classname';

export interface GlassCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const GlassCheckbox = forwardRef<HTMLInputElement, GlassCheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <label
        className="flex items-center space-x-3 cursor-pointer"
        htmlFor={checkboxId}
      >
        <input
          type="checkbox"
          id={checkboxId}
          className={cn(
            'w-5 h-5 rounded glass-effect border-2 border-glass focus:ring-2 focus:ring-primary transition-colors',
            'checked:bg-primary checked:border-primary',
            className
          )}
          ref={ref}
          {...props}
        />
        {label && <span className="text-primary">{label}</span>}
      </label>
    );
  }
);

GlassCheckbox.displayName = 'GlassCheckbox';

export { GlassCheckbox };
