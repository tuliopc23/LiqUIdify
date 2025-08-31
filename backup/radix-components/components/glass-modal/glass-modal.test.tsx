import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "../../test/test-utils";
import { GlassModal } from "./glass-modal";

function setupModal(props?: Partial<Parameters<typeof GlassModal>[0]>) {
  const onClose = vi.fn();
  const result = render(
    <div>
      <button data-testid="opener">Open</button>
      <GlassModal isOpen={true} onClose={onClose} title="Test Modal" {...props}>
        <button data-testid="inside-button">Inside</button>
      </GlassModal>
    </div>
  );
  return { onClose, ...result };
}

describe("GlassModal", () => {
  it("renders when open and has dialog semantics", () => {
    setupModal();
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
  });

  it("closes on close button click", () => {
    const { onClose } = setupModal();
    const closeBtn = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  it("closes on backdrop click when enabled", () => {
    const { onClose } = setupModal({ closeOnBackdropClick: true });
    const backdrop = screen.getByLabelText("Modal backdrop");
    fireEvent.mouseDown(backdrop); // simulate click on backdrop
    fireEvent.mouseUp(backdrop);
    fireEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close on backdrop click when disabled", () => {
    const { onClose } = setupModal({ closeOnBackdropClick: false });
    const backdrop = screen.getByLabelText("Modal backdrop");
    fireEvent.click(backdrop);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("closes on Escape when enabled", () => {
    const { onClose } = setupModal({ closeOnEscape: true });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close on Escape when disabled", () => {
    const { onClose } = setupModal({ closeOnEscape: false });
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });

  it("traps click events inside dialog (does not close when clicking inside)", () => {
    const { onClose } = setupModal();
    const insideButton = screen.getByTestId("inside-button");
    fireEvent.click(insideButton);
    expect(onClose).not.toHaveBeenCalled();
  });

  it("passes a11y smoke checks", async () => {
    const { container } = setupModal();
    const { getAxe } = await import("../../test/axe");
    const axe = getAxe(container as unknown as HTMLElement);
    await axe();
  });
});
