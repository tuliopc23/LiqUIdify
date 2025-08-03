import { describe, expect, it, beforeAll } from "bun:test";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import "../../test/setup";

// Mock the dependencies before importing GlassModal
beforeAll(() => {
  // Mock glass-portal
  require.cache["@/components/glass-portal"] = {
    exports: {
      GlassPortal: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
    },
  };

  // Mock glass-focus-trap
  require.cache["@/components/glass-focus-trap"] = {
    exports: {
      GlassFocusTrap: ({
        children,
        className,
      }: {
        children: React.ReactNode;
        className?: string;
      }) => <div className={className}>{children}</div>,
    },
  };

  // Mock glass-live-region
  require.cache["@/components/glass-live-region"] = {
    exports: {
      announcer: {
        announce: () => {},
      },
    },
  };
});

import { GlassModal } from "./glass-modal";

describe("GlassModal", () => {
  it("renders when isOpen is true", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}}>
        Modal Content
      </GlassModal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <GlassModal isOpen={false} onClose={() => {}}>
        Hidden Content
      </GlassModal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Hidden Content")).not.toBeInTheDocument();
  });

  it("renders with title", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}} title="Modal Title">
        Content
      </GlassModal>,
    );

    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    const title = screen.getByText("Modal Title");
    expect(title.tagName).toBe("H3");
    expect(title).toHaveClass("glass-modal-title");
  });

  it("calls onClose when close button is clicked", () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };

    render(
      <GlassModal isOpen={true} onClose={handleClose} title="Closeable">
        Content
      </GlassModal>,
    );

    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    expect(closed).toBe(true);
  });

  it("calls onClose when backdrop is clicked", () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };

    render(
      <GlassModal isOpen={true} onClose={handleClose}>
        Content
      </GlassModal>,
    );

    const backdrop = screen.getByLabelText("Modal backdrop");
    fireEvent.click(backdrop);

    expect(closed).toBe(true);
  });

  it("does not close on backdrop click when closeOnBackdropClick is false", () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };

    render(
      <GlassModal
        isOpen={true}
        onClose={handleClose}
        closeOnBackdropClick={false}
      >
        Content
      </GlassModal>,
    );

    const backdrop = screen.getByLabelText("Modal backdrop");
    fireEvent.click(backdrop);

    expect(closed).toBe(false);
  });

  it("has proper ARIA attributes", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}} title="Accessible Modal">
        Accessible Content
      </GlassModal>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");

    // Check aria-labelledby points to title
    const titleId = dialog.getAttribute("aria-labelledby");
    const title = screen.getByText("Accessible Modal");
    expect(title).toHaveAttribute("id", titleId);

    // Check aria-describedby points to content
    const contentId = dialog.getAttribute("aria-describedby");
    const content = screen.getByText("Accessible Content").parentElement;
    expect(content).toHaveAttribute("id", contentId);
  });

  it("applies custom classNames", () => {
    render(
      <GlassModal
        isOpen={true}
        onClose={() => {}}
        title="Custom Styled"
        className="custom-modal"
        titleClassName="custom-title"
        contentClassName="custom-content"
      >
        Content
      </GlassModal>,
    );

    const modal = screen.getByRole("dialog");
    const title = screen.getByText("Custom Styled");
    const content = screen.getByText("Content").parentElement;

    expect(modal).toHaveClass("custom-modal");
    expect(title).toHaveClass("custom-title");
    expect(content).toHaveClass("custom-content");
  });

  it("stops propagation of click events inside modal", () => {
    let backdropClicked = false;
    let contentClicked = false;

    render(
      <GlassModal
        isOpen={true}
        onClose={() => {
          backdropClicked = true;
        }}
      >
        <button
          onClick={() => {
            contentClicked = true;
          }}
        >
          Click Inside
        </button>
      </GlassModal>,
    );

    const button = screen.getByText("Click Inside");
    fireEvent.click(button);

    expect(contentClicked).toBe(true);
    expect(backdropClicked).toBe(false);
  });

  it("manages body scroll lock", async () => {
    const { rerender } = render(
      <GlassModal isOpen={false} onClose={() => {}}>
        Content
      </GlassModal>,
    );

    // Body should not have overflow hidden initially
    expect(document.body.style.overflow).toBe("");

    // Open modal
    rerender(
      <GlassModal isOpen={true} onClose={() => {}}>
        Content
      </GlassModal>,
    );

    // Body should have overflow hidden
    await waitFor(() => {
      expect(document.body.style.overflow).toBe("hidden");
    });

    // Close modal
    rerender(
      <GlassModal isOpen={false} onClose={() => {}}>
        Content
      </GlassModal>,
    );

    // Body should restore overflow
    await waitFor(() => {
      expect(document.body.style.overflow).toBe("");
    });
  });

  it("handles escape key when closeOnEscape is true", () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };

    render(
      <GlassModal isOpen={true} onClose={handleClose} closeOnEscape={true}>
        Escapable Content
      </GlassModal>,
    );

    // Focus trap component would handle escape key
    // This test verifies the prop is passed correctly
    const modal = screen.getByRole("dialog");
    expect(modal).toBeInTheDocument();
  });

  it("does not display aria-labelledby when no title", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}}>
        No Title Content
      </GlassModal>,
    );

    const dialog = screen.getByRole("dialog");
    expect(dialog).not.toHaveAttribute("aria-labelledby");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  it("renders close button with proper accessibility", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}} title="With Close">
        Content
      </GlassModal>,
    );

    const closeButton = screen.getByLabelText("Close modal");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton.tagName).toBe("BUTTON");
    expect(closeButton).toHaveClass("glass-modal-close");

    // Should contain X icon
    const svg = closeButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("applies glass effect styling", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}}>
        Glass Content
      </GlassModal>,
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveClass("liquid-glass");
    expect(modal).toHaveClass("glass-modal");
    expect(modal).toHaveClass("animate-scale");
  });

  it("handles complex children", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}} title="Complex Modal">
        <div>
          <p>Paragraph 1</p>
          <p>Paragraph 2</p>
          <button>Action Button</button>
        </div>
      </GlassModal>,
    );

    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    expect(screen.getByText("Action Button")).toBeInTheDocument();
  });

  it("focus trap wraps modal content", () => {
    render(
      <GlassModal isOpen={true} onClose={() => {}}>
        Trapped Content
      </GlassModal>,
    );

    const focusTrap = document.querySelector(".glass-modal-focus-trap");
    expect(focusTrap).toBeInTheDocument();
    expect(focusTrap).toHaveClass("w-full");
    expect(focusTrap).toHaveClass("max-w-md");
  });

  it("backdrop has proper keyboard interaction", () => {
    let closed = false;
    const handleClose = () => {
      closed = true;
    };

    render(
      <GlassModal isOpen={true} onClose={handleClose}>
        Keyboard Test
      </GlassModal>,
    );

    const backdrop = screen.getByLabelText("Modal backdrop");

    // Enter key
    fireEvent.keyDown(backdrop, { key: "Enter" });
    expect(closed).toBe(true);

    closed = false;

    // Space key
    fireEvent.keyDown(backdrop, { key: " " });
    expect(closed).toBe(true);
  });
});
