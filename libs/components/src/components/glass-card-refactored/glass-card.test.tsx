import { describe, expect, it } from "bun:test";
import { fireEvent, render, screen } from "@testing-library/react";
import "../../test/setup";
import { GlassCard, Card } from "./glass-card";

describe("GlassCard", () => {
  it("renders with children", () => {
    render(<GlassCard>Card Content</GlassCard>);
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  it("applies variant classes", () => {
    const { rerender } = render(
      <GlassCard variant="primary">Primary Card</GlassCard>,
    );
    const card = screen.getByTestId("glass-card");
    expect(card).toHaveClass("bg-white/90");

    rerender(<GlassCard variant="secondary">Secondary Card</GlassCard>);
    const cardSecondary = screen.getByTestId("glass-card");
    expect(cardSecondary).toHaveClass("bg-gray-50/90");

    rerender(<GlassCard variant="ghost">Ghost Card</GlassCard>);
    const cardGhost = screen.getByTestId("glass-card");
    expect(cardGhost).toHaveClass("bg-transparent");
    expect(cardGhost).toHaveClass("border-transparent");

    rerender(<GlassCard variant="destructive">Destructive Card</GlassCard>);
    const cardDestructive = screen.getByTestId("glass-card");
    expect(cardDestructive).toHaveClass("bg-red-50/90");
  });

  it("handles interactive state", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(
      <GlassCard interactive onCardClick={handleClick}>
        Interactive Card
      </GlassCard>,
    );

    const card = screen.getByRole("button");
    expect(card).toHaveClass("cursor-pointer");
    expect(card).toHaveAttribute("tabIndex", "0");

    fireEvent.click(card);
    expect(clicked).toBe(true);
  });

  it("handles selectable state", () => {
    let selected = false;
    const handleSelect = (isSelected: boolean) => {
      selected = isSelected;
    };

    render(
      <GlassCard selectable onCardSelect={handleSelect}>
        Selectable Card
      </GlassCard>,
    );

    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(card);
    expect(selected).toBe(true);
  });

  it("handles keyboard interaction", () => {
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    render(
      <GlassCard interactive onCardClick={handleClick}>
        Keyboard Card
      </GlassCard>,
    );

    const card = screen.getByRole("button");

    // Enter key
    fireEvent.keyDown(card, { key: "Enter" });
    expect(clicked).toBe(true);

    clicked = false;

    // Space key
    fireEvent.keyDown(card, { key: " " });
    expect(clicked).toBe(true);
  });

  it("applies elevation classes", () => {
    const { rerender } = render(
      <GlassCard elevation="none">No Shadow</GlassCard>,
    );
    const card = screen.getByTestId("glass-card");
    expect(card).not.toHaveClass("shadow");

    rerender(<GlassCard elevation="sm">Small Shadow</GlassCard>);
    const cardSm = screen.getByTestId("glass-card");
    expect(cardSm).toHaveClass("shadow-sm");

    rerender(<GlassCard elevation="xl">Extra Large Shadow</GlassCard>);
    const cardXl = screen.getByTestId("glass-card");
    expect(cardXl).toHaveClass("shadow-xl");
  });

  it("applies padding classes", () => {
    const { rerender } = render(
      <GlassCard padding="none">No Padding</GlassCard>,
    );
    const card = screen.getByTestId("glass-card");
    expect(card).not.toHaveClass("p-");

    rerender(<GlassCard padding="sm">Small Padding</GlassCard>);
    const cardSm = screen.getByTestId("glass-card");
    expect(cardSm).toHaveClass("p-3");

    rerender(<GlassCard padding="xl">Extra Large Padding</GlassCard>);
    const cardXl = screen.getByTestId("glass-card");
    expect(cardXl).toHaveClass("p-8");
  });

  it("handles orientation", () => {
    const { rerender } = render(
      <GlassCard orientation="vertical">Vertical Card</GlassCard>,
    );
    const card = screen.getByTestId("glass-card");
    expect(card).toHaveClass("flex-col");

    rerender(<GlassCard orientation="horizontal">Horizontal Card</GlassCard>);
    const cardHorizontal = screen.getByTestId("glass-card");
    expect(cardHorizontal).toHaveClass("flex");
  });

  it("applies border when bordered is true", () => {
    render(<GlassCard bordered>Bordered Card</GlassCard>);
    const card = screen.getByTestId("glass-card");
    expect(card).toHaveClass("border");
  });

  it("forwards ref correctly", () => {
    let cardRef: HTMLDivElement | null = null;
    render(
      <GlassCard
        ref={(ref) => {
          cardRef = ref;
        }}
      >
        Card with Ref
      </GlassCard>,
    );

    expect(cardRef).toBeInstanceOf(HTMLDivElement);
  });

  it("applies custom className", () => {
    render(<GlassCard className="custom-card-class">Custom Card</GlassCard>);

    const card = screen.getByTestId("glass-card");
    expect(card).toHaveClass("custom-card-class");
    expect(card).toHaveClass("relative"); // Also has default classes
  });

  it("handles hover effects", () => {
    render(<GlassCard hover>Hoverable Card</GlassCard>);
    const card = screen.getByTestId("glass-card");

    fireEvent.mouseEnter(card);
    // Hover effects would be applied through state

    fireEvent.mouseLeave(card);
    // Hover effects would be removed
  });

  it("disables animations when specified", () => {
    render(
      <GlassCard disableAnimations interactive>
        No Animations
      </GlassCard>,
    );

    const card = screen.getByTestId("glass-card");
    expect(card).not.toHaveClass("hover:shadow-lg");
    expect(card).not.toHaveClass("active:scale-[0.98]");
  });

  // Compound component tests
  it("renders compound components correctly", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Card Title</Card.Title>
          <Card.Description>Card Description</Card.Description>
        </Card.Header>
        <Card.Content>Card body content</Card.Content>
        <Card.Footer>Footer content</Card.Footer>
      </Card>,
    );

    expect(screen.getByText("Card Title")).toBeInTheDocument();
    expect(screen.getByText("Card Description")).toBeInTheDocument();
    expect(screen.getByText("Card body content")).toBeInTheDocument();
    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("Card.Title renders as h3", () => {
    render(
      <Card>
        <Card.Title>Heading Title</Card.Title>
      </Card>,
    );

    const title = screen.getByText("Heading Title");
    expect(title.tagName).toBe("H3");
    expect(title).toHaveClass("font-semibold");
    expect(title).toHaveClass("text-lg");
  });

  it("Card.Description renders as paragraph", () => {
    render(
      <Card>
        <Card.Description>Description text</Card.Description>
      </Card>,
    );

    const description = screen.getByText("Description text");
    expect(description.tagName).toBe("P");
    expect(description).toHaveClass("text-sm");
  });

  it("Card.Actions renders with proper spacing", () => {
    render(
      <Card>
        <Card.Actions>
          <button>Action 1</button>
          <button>Action 2</button>
        </Card.Actions>
      </Card>,
    );

    const actions = screen.getByTestId("glass-card-actions");
    expect(actions).toHaveClass("flex");
    expect(actions).toHaveClass("items-center");
    expect(actions).toHaveClass("gap-2");
  });

  it("handles complex card with all features", () => {
    let cardClicked = false;
    let cardSelected = false;

    render(
      <Card
        variant="apple"
        interactive
        selectable
        hover
        bordered
        elevation="lg"
        onCardClick={() => {
          cardClicked = true;
        }}
        onCardSelect={(selected) => {
          cardSelected = selected;
        }}
        className="test-card"
      >
        <Card.Header>
          <Card.Title>Complex Card</Card.Title>
          <Card.Description>With all features</Card.Description>
        </Card.Header>
        <Card.Content>Main content area</Card.Content>
        <Card.Footer>
          <Card.Actions>
            <button>Save</button>
            <button>Cancel</button>
          </Card.Actions>
        </Card.Footer>
      </Card>,
    );

    const card = screen.getByRole("button");
    expect(card).toHaveClass("test-card");
    expect(card).toHaveClass("cursor-pointer");
    expect(card).toHaveClass("border");
    expect(card).toHaveClass("shadow-lg");

    // Click to test interaction
    fireEvent.click(card);
    expect(cardClicked).toBe(true);
    expect(cardSelected).toBe(true);
  });

  it("applies apple variant styling", () => {
    render(
      <Card variant="apple">
        <Card.Title>Apple Style</Card.Title>
      </Card>,
    );

    const card = screen.getByTestId("glass-card");
    expect(card).toHaveClass("bg-white/80");
    expect(card).toHaveClass("border-gray-200/30");
  });

  it("spreads additional props", () => {
    render(
      <GlassCard
        data-testid="custom-card"
        id="card-1"
        aria-label="Custom label"
      >
        Props Card
      </GlassCard>,
    );

    const card = screen.getByTestId("custom-card");
    expect(card).toHaveAttribute("data-testid", "custom-card");
    expect(card).toHaveAttribute("id", "card-1");
    expect(card).toHaveAttribute("aria-label", "Custom label");
  });
});
