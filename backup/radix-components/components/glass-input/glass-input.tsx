import { forwardRef } from "react";

export interface GlassInputProps
 extends React.InputHTMLAttributes<HTMLInputElement> {
 helperText?: string;
 error?: boolean;
}

const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
 ({ className, helperText, error = false, ...props }, ref) => {
 return (
 <div className="w-full">
 <input
 ref={ref}
 className={[
 "w-full px-4 py-3 rounded-md border bg-white/60 backdrop-blur",
 "focus:outline-none focus:ring-2 focus:ring-blue-500/30",
 error
 ? "border-red-300 focus:border-red-500"
 : "border-blue-300 focus:border-blue-500",
 className,
 ]
 .filter(Boolean)
 .join(" ")}
 aria-invalid={error || undefined}
 {...props}
 />
 {helperText ? (
 <p
 className={[
 "mt-1.5 text-xs",
 error ? "text-red-600" : "text-blue-500",
 ].join(" ")}
 >
 {helperText}
 </p>
 ) : null}
 </div>
 );
 }
);

GlassInput.displayName = "GlassInput";

export { GlassInput };
export default GlassInput;
