import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import axeCore from "axe-core";

import { GlassTabs } from "@/components/glass-tabs";
import { GlassSelect } from "@/components/glass-select/glass-select";
import { GlassDatePicker } from "@/components/glass-date-picker/glass-date-picker";
import { Drawer } from "@/components/glass-drawer/glass-drawer";

/**
* Render a representative UI with major interactive components and run axe.
* This is a lightweight smoke test to catch high-severity a11y issues.
*/
function RepresentativePage() {
  return (
    <div>
      <GlassTabs
        tabs={[
          { id: "overview", label: "Overview", content: <div>Overview</div> },
          { id: "details", label: "Details", content: <div>Details</div> },
        ]}
      />

      <div style={{ marginTop: 24 }}>
        <GlassSelect
          options={[
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
            { label: "Cherry", value: "cherry" },
          ]}
          placeholder="Select fruit"
          multiple
        />
      </div>

      <div style={{ marginTop: 24 }}>
        <GlassDatePicker placeholder="Select date" />
      </div>

      <div style={{ marginTop: 24 }}>
        <Drawer>
          <Drawer.Trigger asChild>
            <button type="button">Open Drawer</button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
              <Drawer.Close asChild>
                <button aria-label="Close">Close</button>
              </Drawer.Close>
            </Drawer.Header>
            <Drawer.Body>
              <p>Drawer body</p>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer>
      </div>
    </div>
  );
}

// Axe runner helper
async function runAxe(node: HTMLElement) {
  // Configure axe for jsdom-like environment
  const results = await axeCore.run(node, {
    rules: {
      // jsdom limitations can cause noisy color-contrast failures
      "color-contrast": { enabled: false },
    },
  });
  return results;
}

describe("Accessibility smoke (axe)", () => {
  it("renders representative page without critical violations", async () => {
    const { container } = render(<RepresentativePage />);
    // Basic sanity: key landmarks exist
    expect(container).toBeInTheDocument();

    const results = await runAxe(container);
    // Log any violations for debugging; fail on serious ones
    if (results.violations.length > 0) {
      // Allow only moderate/minor severities to pass
      const high = results.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact || "")
      );
      // eslint-disable-next-line no-console
      console.log(
        "axe violations:\n",
        JSON.stringify(results.violations, null, 2),
      );
      expect(high, "No serious/critical a11y violations").toHaveLength(0);
    }
  });
});
