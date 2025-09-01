"use client";

import { Avatar as ArkAvatar } from "@ark-ui/react";
import { forwardRef } from "react";
import { avatar, type AvatarVariantProps } from "../../../../../../styled-system/recipes/avatar";
import type { ComponentProps } from "react";

export interface AvatarProps extends ComponentProps<typeof ArkAvatar.Root>, AvatarVariantProps {
  name?: string;
  src?: string;
  fallback?: string;
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ name, src, fallback, size, children, className, ...props }, ref) => {
    const [variantProps, restProps] = avatar.splitVariantProps({ size });

    return (
      <ArkAvatar.Root
        ref={ref}
        className={[avatar(variantProps), className].filter(Boolean).join(" ")}
        {...restProps}
        {...props}
      >
        <ArkAvatar.Fallback>{fallback || name?.charAt(0)?.toUpperCase() || "U"}</ArkAvatar.Fallback>
        {src && <ArkAvatar.Image src={src} alt={name || "Avatar"} />}
        {children}
      </ArkAvatar.Root>
    );
  }
);

Avatar.displayName = "Avatar";
