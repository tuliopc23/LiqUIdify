"use client";

import { Slider as ArkSlider } from "@ark-ui/react";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";
import { forwardRef } from "react";
import {
        type SliderVariantProps,
        slider,
} from "../../../../../../styled-system/recipes/slider";
import { useInteractiveGlass } from "../../../hooks/useInteractiveGlass";

export interface SliderProps
        extends ComponentProps<typeof ArkSlider.Root>,
                SliderVariantProps {
        label?: string;
        /**
         * Enable spring physics for thumb interactions
         * @default true
         */
        springPhysics?: boolean;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
        ({ label, size, children, className, springPhysics = true, ...props }, ref) => {
                const [variantProps, restProps] = slider.splitVariantProps({ size });
                const spring = useInteractiveGlass({ intensity: "subtle", enableHover: false });
                const classes = [slider(variantProps), className].filter(Boolean).join(" ");
                
                return (
                        <ArkSlider.Root
                                ref={ref}
                                className={classes}
                                {...restProps}
                                {...props}
                        >
                                {(label || children) && (
                                        <ArkSlider.Label>{label || children}</ArkSlider.Label>
                                )}
                                <ArkSlider.Control>
                                        <ArkSlider.Track>
                                                <ArkSlider.Range />
                                        </ArkSlider.Track>
                                        {springPhysics && !spring.reducedMotion ? (
                                                <ArkSlider.Thumb index={0} asChild>
                                                        <motion.div
                                                                style={{ scale: spring.scale, y: spring.y }}
                                                                {...spring.interactions}
                                                        />
                                                </ArkSlider.Thumb>
                                        ) : (
                                                <ArkSlider.Thumb index={0} />
                                        )}
                                </ArkSlider.Control>
                        </ArkSlider.Root>
                );
        },
);

Slider.displayName = "Slider";
