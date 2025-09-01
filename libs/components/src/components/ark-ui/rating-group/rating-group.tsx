"use client";

import { RatingGroup as ArkRatingGroup } from "@ark-ui/react";
import { forwardRef } from "react";
import {
  ratingGroup,
  type RatingGroupVariantProps,
} from "../../../../../../styled-system/recipes/rating-group";
import type { ComponentProps } from "react";

export interface RatingGroupProps
  extends ComponentProps<typeof ArkRatingGroup.Root>,
    RatingGroupVariantProps {
  label?: string;
  count?: number;
}

export const RatingGroup = forwardRef<HTMLDivElement, RatingGroupProps>(
  ({ label, count = 5, size, children, className, ...props }, ref) => {
    const [variantProps, restProps] = ratingGroup.splitVariantProps({ size });

    return (
      <ArkRatingGroup.Root
        ref={ref}
        className={[ratingGroup(variantProps), className].filter(Boolean).join(" ")}
        count={count}
        {...restProps}
        {...props}
      >
        {label && <ArkRatingGroup.Label>{label}</ArkRatingGroup.Label>}
        <ArkRatingGroup.Control>
          <ArkRatingGroup.Context>
            {({ items }) =>
              items.map((item) => (
                <ArkRatingGroup.Item key={item} index={item}>
                  <ArkRatingGroup.ItemContext>
                    {({ highlighted }) => <span>{highlighted ? "★" : "☆"}</span>}
                  </ArkRatingGroup.ItemContext>
                </ArkRatingGroup.Item>
              ))
            }
          </ArkRatingGroup.Context>
        </ArkRatingGroup.Control>
        {children}
      </ArkRatingGroup.Root>
    );
  }
);

RatingGroup.displayName = "RatingGroup";
