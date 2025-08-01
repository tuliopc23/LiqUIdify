import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "../../test/setup";
import {
  GlassAccordion,
  GlassAccordionItem,
  GlassAccordionTrigger,
  GlassAccordionContent,
} from "./glass-accordion";

describe("GlassAccordion", () => {
  it("renders with children", () => {
    render(
      <GlassAccordion type="single">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Section 1</GlassAccordionTrigger>
          <GlassAccordionContent>Content 1</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    expect(screen.getByText("Section 1")).toBeInTheDocument();
  });

  it("toggles accordion item on click", () => {
    render(
      <GlassAccordion type="single" collapsible>
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Toggle Me</GlassAccordionTrigger>
          <GlassAccordionContent>Hidden Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger = screen.getByText("Toggle Me");
    const content = screen.getByText("Hidden Content");

    // Initially closed
    expect(content.parentElement).toHaveAttribute("data-state", "closed");

    // Click to open
    fireEvent.click(trigger);
    expect(content.parentElement).toHaveAttribute("data-state", "open");

    // Click to close (when collapsible is true)
    fireEvent.click(trigger);
    expect(content.parentElement).toHaveAttribute("data-state", "closed");
  });

  it("handles keyboard navigation", () => {
    render(
      <GlassAccordion type="single">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Item 1</GlassAccordionTrigger>
          <GlassAccordionContent>Content 1</GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger>Item 2</GlassAccordionTrigger>
          <GlassAccordionContent>Content 2</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger1 = screen.getByText("Item 1");
    const trigger2 = screen.getByText("Item 2");

    // Focus first trigger
    trigger1.focus();
    expect(document.activeElement).toBe(trigger1);

    // Arrow down to next trigger
    fireEvent.keyDown(trigger1, { key: "ArrowDown" });
    expect(document.activeElement).toBe(trigger2);

    // Arrow up to previous trigger
    fireEvent.keyDown(trigger2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(trigger1);

    // Enter/Space to toggle
    fireEvent.keyDown(trigger1, { key: "Enter" });
    const content1 = screen.getByText("Content 1");
    expect(content1.parentElement).toHaveAttribute("data-state", "open");
  });

  it("has proper ARIA attributes", () => {
    render(
      <GlassAccordion type="single" defaultValue="item-1">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Accessible Section</GlassAccordionTrigger>
          <GlassAccordionContent>Accessible Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger = screen.getByText("Accessible Section");
    const content = screen.getByText("Accessible Content").parentElement;

    // Check ARIA attributes
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAttribute("aria-controls");
    expect(content).toHaveAttribute("role", "region");
    expect(content).toHaveAttribute("aria-labelledby");

    // Check IDs match
    const triggerId = trigger.getAttribute("aria-controls");
    const contentId = content.getAttribute("id");
    expect(triggerId).toBe(contentId);
  });

  it("supports multiple expansion mode", () => {
    render(
      <GlassAccordion type="multiple" defaultValue={["item-1"]}>
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Multi 1</GlassAccordionTrigger>
          <GlassAccordionContent>Content 1</GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger>Multi 2</GlassAccordionTrigger>
          <GlassAccordionContent>Content 2</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger1 = screen.getByText("Multi 1");
    const trigger2 = screen.getByText("Multi 2");
    const content1 = screen.getByText("Content 1");
    const content2 = screen.getByText("Content 2");

    // First item is open by default
    expect(content1.parentElement).toHaveAttribute("data-state", "open");
    expect(content2.parentElement).toHaveAttribute("data-state", "closed");

    // Click second item - both should be open in multiple mode
    fireEvent.click(trigger2);
    expect(content1.parentElement).toHaveAttribute("data-state", "open");
    expect(content2.parentElement).toHaveAttribute("data-state", "open");
  });

  it("supports single expansion mode", () => {
    render(
      <GlassAccordion type="single">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Single 1</GlassAccordionTrigger>
          <GlassAccordionContent>Content 1</GlassAccordionContent>
        </GlassAccordionItem>
        <GlassAccordionItem value="item-2">
          <GlassAccordionTrigger>Single 2</GlassAccordionTrigger>
          <GlassAccordionContent>Content 2</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger1 = screen.getByText("Single 1");
    const trigger2 = screen.getByText("Single 2");
    const content1 = screen.getByText("Content 1");
    const content2 = screen.getByText("Content 2");

    // Open first item
    fireEvent.click(trigger1);
    expect(content1.parentElement).toHaveAttribute("data-state", "open");
    expect(content2.parentElement).toHaveAttribute("data-state", "closed");

    // Click second item - first should close in single mode
    fireEvent.click(trigger2);
    expect(content1.parentElement).toHaveAttribute("data-state", "closed");
    expect(content2.parentElement).toHaveAttribute("data-state", "open");
  });

  it("handles disabled state", () => {
    render(
      <GlassAccordion type="single">
        <GlassAccordionItem value="item-1" disabled>
          <GlassAccordionTrigger>Disabled Item</GlassAccordionTrigger>
          <GlassAccordionContent>Should not open</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger = screen.getByText("Disabled Item");
    const content = screen.getByText("Should not open");

    expect(trigger).toHaveAttribute("disabled");
    expect(trigger).toHaveAttribute("data-disabled");

    // Click should not open disabled item
    fireEvent.click(trigger);
    expect(content.parentElement).toHaveAttribute("data-state", "closed");
  });

  it("applies custom className", () => {
    render(
      <GlassAccordion type="single" className="custom-accordion">
        <GlassAccordionItem value="item-1" className="custom-item">
          <GlassAccordionTrigger className="custom-trigger">
            Custom Classes
          </GlassAccordionTrigger>
          <GlassAccordionContent className="custom-content">
            Custom Content
          </GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const accordion = screen
      .getByText("Custom Classes")
      .closest("[data-orientation]");
    const item = screen.getByText("Custom Classes").closest("[data-state]");
    const trigger = screen.getByText("Custom Classes");
    const content = screen.getByText("Custom Content").parentElement;

    expect(accordion).toHaveClass("custom-accordion");
    expect(item).toHaveClass("custom-item");
    expect(trigger).toHaveClass("custom-trigger");
    expect(content).toHaveClass("custom-content");
  });

  it("forwards refs correctly", () => {
    let accordionRef: HTMLDivElement | null = null;
    let itemRef: HTMLDivElement | null = null;
    let triggerRef: HTMLButtonElement | null = null;
    let contentRef: HTMLDivElement | null = null;

    render(
      <GlassAccordion
        type="single"
        ref={(ref) => {
          accordionRef = ref;
        }}
      >
        <GlassAccordionItem
          value="item-1"
          ref={(ref) => {
            itemRef = ref;
          }}
        >
          <GlassAccordionTrigger
            ref={(ref) => {
              triggerRef = ref;
            }}
          >
            Ref Test
          </GlassAccordionTrigger>
          <GlassAccordionContent
            ref={(ref) => {
              contentRef = ref;
            }}
          >
            Ref Content
          </GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    expect(accordionRef).toBeInstanceOf(HTMLDivElement);
    expect(itemRef).toBeInstanceOf(HTMLDivElement);
    expect(triggerRef).toBeInstanceOf(HTMLButtonElement);
    expect(contentRef).toBeInstanceOf(HTMLDivElement);
  });

  it("shows/hides chevron icon based on showIcon prop", () => {
    const { rerender } = render(
      <GlassAccordion type="single">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger showIcon={true}>
            With Icon
          </GlassAccordionTrigger>
          <GlassAccordionContent>Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    // Icon should be visible
    expect(
      screen.getByText("With Icon").parentElement?.querySelector("svg"),
    ).toBeInTheDocument();

    rerender(
      <GlassAccordion type="single">
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger showIcon={false}>
            Without Icon
          </GlassAccordionTrigger>
          <GlassAccordionContent>Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    // Icon should not be visible
    expect(
      screen.getByText("Without Icon").parentElement?.querySelector("svg"),
    ).toBe(null);
  });

  it("calls onValueChange callback", () => {
    let value: string | undefined;
    const handleValueChange = (newValue: string) => {
      value = newValue;
    };

    render(
      <GlassAccordion type="single" onValueChange={handleValueChange}>
        <GlassAccordionItem value="item-1">
          <GlassAccordionTrigger>Click Me</GlassAccordionTrigger>
          <GlassAccordionContent>Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    const trigger = screen.getByText("Click Me");
    fireEvent.click(trigger);

    expect(value).toBe("item-1");
  });

  it("applies size variants correctly", () => {
    const { rerender } = render(
      <GlassAccordion type="single" size="sm">
        <GlassAccordionItem size="sm" value="item-1">
          <GlassAccordionTrigger size="sm">Small</GlassAccordionTrigger>
          <GlassAccordionContent size="sm">Small Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    let accordion = screen.getByText("Small").closest("[data-orientation]");
    expect(accordion).toHaveClass("text-sm");

    rerender(
      <GlassAccordion type="single" size="lg">
        <GlassAccordionItem size="lg" value="item-1">
          <GlassAccordionTrigger size="lg">Large</GlassAccordionTrigger>
          <GlassAccordionContent size="lg">Large Content</GlassAccordionContent>
        </GlassAccordionItem>
      </GlassAccordion>,
    );

    accordion = screen.getByText("Large").closest("[data-orientation]");
    expect(accordion).toHaveClass("text-lg");
  });
});
