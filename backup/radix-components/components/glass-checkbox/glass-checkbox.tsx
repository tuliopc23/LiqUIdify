import { forwardRef } from "react";
import { cn } from "../../core/utils/classname";

interface GlassCheckboxProps
 extends React.InputHTMLAttributes<HTMLInputElement> {
 label?: string;
}

const GlassCheckbox = forwardRef<HTMLInputElement, GlassCheckboxProps>(
 ({ className, label, id, ...props }, ref) => {
 const checkboxId =
 id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

 return (
 <label
 className="flex cursor-pointer items-center space-x-3 group"
 htmlFor={checkboxId}
 >
 <div className="relative">
 {/* Glass effect layers */}
 <div className="absolute inset-0 pointer-events-none" />
 <div className="absolute inset-0 pointer-events-none" />
 <div className="absolute inset-0 pointer-events-none" />

 <input
 type="checkbox"
 id={checkboxId}
 className={cn(
 "relative z-10 h-5 w-5 border-2 rounded-full",
 "border-/50 bg-transparent",
 "transition-all duration-200 will-change-transform",
 "motion-safe:hover:scale-110 motion-safe:active:scale-95",
 ":focus-visible",
 "checked:border-text-blue-600 checked:bg-text-blue-600",
 "checked:motion-safe:hover:bg-text-blue-600/80",
 "disabled:cursor-not-allowed disabled:opacity-50",
 "appearance-none",
 // Custom checkmark
 "checked:after:content-['✓'] checked:after:absolute checked:after:inset-0",
 "checked:after:flex checked:after:items-center checked:after:justify-center",
 "checked:after:text-blue-900 checked:after:text-xs checked:after:font-bold",
 className,
 )}
 ref={ref}
 {...props}
 />
 </div>

 {label && (
 <span
 className={cn(
 "text-blue-900 transition-colors duration-200",
 "group-hover:text-",
 props.disabled && "opacity-50",
 )}
 >
 {label}
 </span>
 )}
 </label>
 );
 },
);

GlassCheckbox.displayName = "GlassCheckbox";

export { GlassCheckbox };
export default GlassCheckbox;
