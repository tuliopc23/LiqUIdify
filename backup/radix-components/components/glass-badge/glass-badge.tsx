import { forwardRef } from "react";
import { cn } from "../../core/utils/classname";

interface GlassBadgeProps
 extends Omit<
 React.HTMLAttributes<HTMLSpanElement>,
 keyof React.AriaAttributes
 > {
 variant?: "default" | "success" | "warning" | "error";
}

const GlassBadge = forwardRef<HTMLSpanElement, GlassBadgeProps>(
 ({ className, variant = "default", ...props }, ref) => {
 const variantClasses = {
 default: " text-blue-900",
 success:
 " /20 text-blue-600 border-blue-500/30",
 warning:
 " /20 text-blue-600 border-blue-500/30",
 error:
 " /20 text-blue-600 border-blue-500/30",
 };

 return (
 <span
 ref={ref}
 className={cn(
 "relative inline-flex items-center justify-center",
 " px-3 py-1 font-medium text-xs",
 "transition-all duration-200 will-change-transform",
 "motion-safe:hover:scale-105",
 variantClasses[variant],
 className,
 )}
 {...props}
 >
 {/* Glass effect layers for non-default variants */}
 {variant !== "default" && (
 <>
 <div />
 <div />
 <div />
 </>
 )}

 {/* Badge content */}
 <span className="relative z-10">{props.children}</span>
 </span>
 );
 },
);

GlassBadge.displayName = "GlassBadge";

export { GlassBadge };
export default GlassBadge;
