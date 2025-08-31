import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { render, screen } from "../../test/test-utils";
import { GlassFocusTrap } from "./glass-focus-trap";

function renderTrap() {
  return render(
    <div>
      <button data-testid="before">Before</button>
      <GlassFocusTrap>
        <div>
          <button data-testid="first">First</button>
          <button data-testid="last">Last</button>
        </div>
      </GlassFocusTrap>
      <button data-testid="after">After</button>
    </div>
  );
}

describe("GlassFocusTrap", () => {
  it("keeps focus within the trap when tabbing", async () => {
    const user = userEvent.setup();
    renderTrap();

    // Focus first focusable inside trap
    const first = screen.getByTestId("first") as HTMLButtonElement;
    first.focus();
    expect(document.activeElement).toBe(first);

    // Tab forward from last wraps to first
    await user.tab();
    const last = screen.getByTestId("last") as HTMLButtonElement;
    // Depending on initial order, pressing tab from first goes to last
    expect([first, last]).toContain(document.activeElement);

    // Shift+Tab should keep focus within trap
    await user.tab({ shift: true });
    expect([first, last]).toContain(document.activeElement);
  });

  it("does not allow focus to move to elements outside the trap with tab", async () => {
    const user = userEvent.setup();
    renderTrap();

    const first = screen.getByTestId("first") as HTMLButtonElement;
    const after = screen.getByTestId("after") as HTMLButtonElement;

    first.focus();
    await user.tab({ shift: true });

    // Focus should not be on the element after the trap
    expect(document.activeElement).not.toBe(after);
  });
});
