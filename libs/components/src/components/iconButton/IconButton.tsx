import { forwardRef } from "react";
import { css, cx } from "../../../../../styled-system/css";
import { Button, type ButtonProps } from "../button";
import { Icon, type IconName, type IconProps } from "../icons";

export interface IconButtonProps extends Omit<ButtonProps, "children"> {
  icon: IconName;
  iconProps?: Omit<IconProps, "name">;
  children?: never; // IconButton doesn't accept children, only icon
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, iconProps, className, ...props }, ref) => {
    const { size = "md", ...otherIconProps } = iconProps || {};

    return (
      <Button ref={ref} className={cx(iconButtonStyles, className)} {...props}>
        <Icon name={icon} size={size} {...otherIconProps} />
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";

// Styles for IconButton
const iconButtonStyles = css({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  p: "token(spacing.glass.sm)",
  minW: "auto",
  aspectRatio: "1",
});
