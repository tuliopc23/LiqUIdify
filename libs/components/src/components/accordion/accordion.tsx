"use client";

import React from "react";
import { Accordion } from "@ark-ui/react";
import { css, cx } from "../../../../../styled-system/css";
import { LiquidGlass } from "../liquid-glass";

export interface LiquidAccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  className?: string;
}

export const LiquidAccordion: React.FC<LiquidAccordionProps> = ({ items, className }) => {
  return (
    <LiquidGlass
      intensity="medium"
      size="md"
      className={cx(
        css({
          borderRadius: "token(radii.md)", // 16px standard
          overflow: "hidden",
        }),
        className
      )}
    >
      <Accordion.Root>
        {items.map((item, index) => (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className={css({
              borderBottom:
                index !== items.length - 1 ? "1px solid token(colors.glass.border)" : "none",
            })}
          >
            <Accordion.ItemTrigger
              className={css({
                width: "100%",
                padding: "token(spacing.glass.lg) token(spacing.glass.xl)",
                background: "transparent",
                border: "none",
                color: "token(colors.text.glass.primary)",
                fontSize: "16px",
                fontWeight: 500,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all token(durations.glass.quick)",

                _hover: {
                  background: "token(colors.glass.subtle.bg)",
                },
              })}
            >
              {item.title}
              <Accordion.ItemIndicator
                className={css({
                  transition: "transform token(durations.glass.quick)",
                  _open: {
                    transform: "rotate(180deg)",
                  },
                })}
              >
                ↓
              </Accordion.ItemIndicator>
            </Accordion.ItemTrigger>

            <Accordion.ItemContent
              className={css({
                background: "token(colors.glass.subtle.bg)",
                padding: "token(spacing.glass.lg) token(spacing.glass.xl)",
                color: "token(colors.text.glass.secondary)",
                lineHeight: 1.6,
              })}
            >
              {item.content}
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </LiquidGlass>
  );
};
