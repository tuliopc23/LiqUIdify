import { forwardRef, useState } from "react";

import { cn } from "../../core/utils/classname";

interface GlassSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  onChange?: (checked: boolean) => void;
}

const GlassSwitch = forwardRef<HTMLInputElement, GlassSwitchProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const [isChecked, setIsChecked] = useState(checked || false);
    const switchId = id || `switch-${Math.random().toString(36).slice(2, 11)}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    return (
      <label className="flex cursor-pointer items-center space-x-3" htmlFor={switchId}>
        <div className="relative">
          <input
            type="checkbox"
            id={switchId}
            className="sr-only"
            checked={isChecked}
            onChange={handleChange}
            ref={ref}
            {...props}
          />

          <div
            className={cn(
              "h-6 w-11 rounded-full shadow-inner transition-colors duration-200",
              isChecked ? "bg-primary" : "",
              className
            )}
          />

          <div
            className={cn(
              "absolute inset-y-0 h-5 w-5 translate-y-0.5 transform rounded-full shadow transition-transform duration-200",
              isChecked ? "translate-x-6" : "translate-x-0.5"
            )}
          />
        </div>

        {label && <span className="text-primary">{label}</span>}
      </label>
    );
  }
);

GlassSwitch.displayName = "GlassSwitch";

export { GlassSwitch };
export default GlassSwitch;
