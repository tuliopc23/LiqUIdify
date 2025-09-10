import { forwardRef } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { button } from "../../../../../styled-system/recipes";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cx(
          button({ variant, size }),
          css({
            borderRadius: "md",
            backdropFilter: "blur(10px)",
            background: "colors.glass.bg",
            border: "1px solid",
            borderColor: "colors.glass.border",
            boxShadow: "shadows.glass.base",
            transition: "all 0.2s ease",
            _hover: {
              transform: "translateY(-1px)",
              boxShadow: "shadows.glass.hover",
            },
            _active: {
              transform: "translateY(0px)",
            },
          }),
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
