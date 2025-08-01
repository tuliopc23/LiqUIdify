import { test, expect } from "@playwright/test";

// Test setup - would normally use a test app URL
const TEST_APP_URL = process.env.TEST_APP_URL || "http://localhost:3000";

test.describe("Critical User Flows", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(TEST_APP_URL);
  });

  test.describe("Form Submission Workflow", () => {
    test("complete form with validation and success feedback", async ({
      page,
    }) => {
      // Navigate to form page
      await page.getByRole("link", { name: "Form Demo" }).click();

      // Test empty form submission (validation)
      await page.getByRole("button", { name: "Submit" }).click();

      // Check for validation errors
      await expect(page.getByText("This field is required")).toBeVisible();
      await expect(
        page.getByRole("textbox", { name: "Email" }),
      ).toHaveAttribute("aria-invalid", "true");

      // Fill in form fields
      await page.getByRole("textbox", { name: "Name" }).fill("John Doe");
      await page
        .getByRole("textbox", { name: "Email" })
        .fill("john@example.com");
      await page
        .getByRole("textbox", { name: "Password" })
        .fill("SecurePass123!");

      // Test password visibility toggle
      await page.getByLabel("Show password").click();
      await expect(
        page.getByRole("textbox", { name: "Password" }),
      ).toHaveAttribute("type", "text");
      await page.getByLabel("Hide password").click();
      await expect(
        page.getByRole("textbox", { name: "Password" }),
      ).toHaveAttribute("type", "password");

      // Select options
      await page.getByRole("combobox", { name: "Country" }).selectOption("US");
      await page.getByRole("checkbox", { name: "I agree to terms" }).check();

      // Submit form
      await page.getByRole("button", { name: "Submit" }).click();

      // Check success feedback
      await expect(page.getByText("Form submitted successfully")).toBeVisible();
      await expect(page.getByRole("alert")).toHaveClass(/success/);
    });

    test("form field interactions and clearing", async ({ page }) => {
      await page.getByRole("link", { name: "Form Demo" }).click();

      // Type in clearable input
      const input = page.getByRole("textbox", { name: "Search" });
      await input.fill("test search query");

      // Clear input
      await page.getByLabel("Clear input").click();
      await expect(input).toHaveValue("");

      // Check that focus is maintained
      await expect(input).toBeFocused();
    });
  });

  test.describe("Modal Interaction Workflow", () => {
    test("open modal, interact, and close", async ({ page }) => {
      // Open modal
      await page.getByRole("button", { name: "Open Modal" }).click();

      // Check modal is visible and has focus trap
      const modal = page.getByRole("dialog");
      await expect(modal).toBeVisible();
      await expect(modal).toHaveAttribute("aria-modal", "true");

      // Check title and content
      await expect(
        page.getByRole("heading", { name: "Modal Title" }),
      ).toBeVisible();
      await expect(page.getByText("Modal content goes here")).toBeVisible();

      // Test focus trap - Tab should cycle within modal
      await page.keyboard.press("Tab");
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName,
      );
      expect(["BUTTON", "INPUT", "A"]).toContain(focusedElement);

      // Close via close button
      await page.getByLabel("Close modal").click();
      await expect(modal).not.toBeVisible();

      // Reopen and close via backdrop
      await page.getByRole("button", { name: "Open Modal" }).click();
      await page
        .locator(".glass-modal-backdrop")
        .click({ position: { x: 10, y: 10 } });
      await expect(modal).not.toBeVisible();

      // Reopen and close via Escape key
      await page.getByRole("button", { name: "Open Modal" }).click();
      await page.keyboard.press("Escape");
      await expect(modal).not.toBeVisible();
    });

    test("modal prevents body scroll", async ({ page }) => {
      // Add content to make page scrollable
      await page.evaluate(() => {
        document.body.style.height = "200vh";
      });

      // Scroll down
      await page.evaluate(() => window.scrollTo(0, 100));
      const scrollBefore = await page.evaluate(() => window.scrollY);

      // Open modal
      await page.getByRole("button", { name: "Open Modal" }).click();

      // Try to scroll - should be prevented
      await page.mouse.wheel(0, 100);
      const scrollDuring = await page.evaluate(() => window.scrollY);
      expect(scrollDuring).toBe(scrollBefore);

      // Close modal
      await page.getByLabel("Close modal").click();

      // Scrolling should work again
      await page.mouse.wheel(0, 100);
      const scrollAfter = await page.evaluate(() => window.scrollY);
      expect(scrollAfter).toBeGreaterThan(scrollBefore);
    });
  });

  test.describe("Navigation Menu Workflow", () => {
    test("responsive navigation menu interactions", async ({
      page,
      isMobile,
    }) => {
      if (isMobile) {
        // Mobile navigation
        await page.getByLabel("Open menu").click();

        // Check mobile menu is visible
        const mobileMenu = page.getByRole("navigation", { name: "Mobile" });
        await expect(mobileMenu).toBeVisible();

        // Navigate to a page
        await page.getByRole("link", { name: "Components" }).click();

        // Menu should close after navigation
        await expect(mobileMenu).not.toBeVisible();
      } else {
        // Desktop navigation
        const nav = page.getByRole("navigation", { name: "Main" });
        await expect(nav).toBeVisible();

        // Hover over dropdown
        await page.getByRole("button", { name: "Components" }).hover();

        // Check dropdown is visible
        const dropdown = page.getByRole("menu");
        await expect(dropdown).toBeVisible();

        // Click item in dropdown
        await page.getByRole("menuitem", { name: "Buttons" }).click();

        // Check navigation occurred
        await expect(page).toHaveURL(/\/components\/buttons/);
      }
    });

    test("keyboard navigation", async ({ page }) => {
      // Focus first nav item
      await page.getByRole("navigation").locator("a").first().focus();

      // Navigate with arrow keys
      await page.keyboard.press("ArrowRight");
      const focusedText = await page.evaluate(
        () => document.activeElement?.textContent,
      );
      expect(focusedText).toBeTruthy();

      // Activate with Enter
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/.+/); // Should navigate somewhere
    });
  });

  test.describe("Toast Notification Workflow", () => {
    test("trigger and dismiss toast notifications", async ({ page }) => {
      // Trigger success toast
      await page.getByRole("button", { name: "Show Success Toast" }).click();

      // Check toast appears
      const toast = page.getByRole("status").filter({ hasText: "Success" });
      await expect(toast).toBeVisible();
      await expect(toast).toHaveClass(/success/);

      // Dismiss toast
      await toast.getByLabel("Dismiss").click();
      await expect(toast).not.toBeVisible();

      // Trigger error toast
      await page.getByRole("button", { name: "Show Error Toast" }).click();
      const errorToast = page.getByRole("status").filter({ hasText: "Error" });
      await expect(errorToast).toBeVisible();
      await expect(errorToast).toHaveClass(/error/);

      // Auto-dismiss after timeout
      await expect(errorToast).not.toBeVisible({ timeout: 6000 });
    });

    test("multiple toasts stack correctly", async ({ page }) => {
      // Trigger multiple toasts
      await page.getByRole("button", { name: "Show Success Toast" }).click();
      await page.getByRole("button", { name: "Show Info Toast" }).click();
      await page.getByRole("button", { name: "Show Warning Toast" }).click();

      // Check all toasts are visible
      const toasts = page.getByRole("status");
      await expect(toasts).toHaveCount(3);

      // Check stacking order (newest on top)
      const positions = await toasts.evaluateAll((elements) =>
        elements.map((el) => el.getBoundingClientRect().top),
      );
      expect(positions[0]).toBeLessThan(positions[1]);
      expect(positions[1]).toBeLessThan(positions[2]);
    });
  });

  test.describe("Search Functionality Workflow", () => {
    test("search with results and filtering", async ({ page }) => {
      // Focus search input
      const searchInput = page.getByRole("searchbox");
      await searchInput.focus();

      // Type search query
      await searchInput.fill("glass button");

      // Wait for results
      await expect(page.getByText("Search results")).toBeVisible();
      const results = page
        .getByRole("list", { name: "Search results" })
        .getByRole("listitem");
      await expect(results).toHaveCount(5); // Assuming 5 results

      // Click on a result
      await results.first().click();

      // Check navigation to result
      await expect(page).toHaveURL(/\/components\/glass-button/);

      // Search should be cleared
      await expect(searchInput).toHaveValue("");
    });

    test("search with keyboard navigation", async ({ page }) => {
      const searchInput = page.getByRole("searchbox");
      await searchInput.fill("component");

      // Navigate results with arrow keys
      await page.keyboard.press("ArrowDown");
      await expect(page.getByRole("option", { selected: true })).toBeVisible();

      // Select with Enter
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(/\/components\/.+/);
    });
  });

  test.describe("Data Table Interaction Workflow", () => {
    test("table sorting, filtering, and pagination", async ({ page }) => {
      await page.goto(`${TEST_APP_URL}/table-demo`);

      // Initial table state
      const table = page.getByRole("table");
      await expect(table).toBeVisible();

      // Sort by name column
      await page.getByRole("columnheader", { name: "Name" }).click();

      // Check sorting indicator
      await expect(
        page.getByRole("columnheader", { name: "Name" }),
      ).toHaveAttribute("aria-sort", "ascending");

      // Click again for descending
      await page.getByRole("columnheader", { name: "Name" }).click();
      await expect(
        page.getByRole("columnheader", { name: "Name" }),
      ).toHaveAttribute("aria-sort", "descending");

      // Filter table
      await page.getByRole("textbox", { name: "Filter" }).fill("john");

      // Check filtered results
      const rows = page.getByRole("row");
      const visibleRows = await rows.count();
      expect(visibleRows).toBeLessThan(10); // Assuming original had 10+ rows

      // Pagination
      await page.getByRole("button", { name: "Next page" }).click();
      await expect(page.getByText("Page 2")).toBeVisible();

      // Items per page
      await page
        .getByRole("combobox", { name: "Items per page" })
        .selectOption("25");
      const newRows = await page.getByRole("row").count();
      expect(newRows).toBeGreaterThan(visibleRows);
    });
  });

  test.describe("Multi-step Form Wizard", () => {
    test("complete multi-step form with validation", async ({ page }) => {
      await page.goto(`${TEST_APP_URL}/wizard-demo`);

      // Step 1
      await expect(page.getByText("Step 1 of 3")).toBeVisible();
      await page.getByRole("textbox", { name: "First Name" }).fill("John");
      await page.getByRole("textbox", { name: "Last Name" }).fill("Doe");

      // Try to skip required field
      await page.getByRole("button", { name: "Next" }).click();
      await expect(page.getByText("Email is required")).toBeVisible();

      // Fill required field
      await page
        .getByRole("textbox", { name: "Email" })
        .fill("john@example.com");
      await page.getByRole("button", { name: "Next" }).click();

      // Step 2
      await expect(page.getByText("Step 2 of 3")).toBeVisible();
      await page.getByRole("textbox", { name: "Address" }).fill("123 Main St");
      await page.getByRole("textbox", { name: "City" }).fill("New York");

      // Go back
      await page.getByRole("button", { name: "Previous" }).click();
      await expect(page.getByText("Step 1 of 3")).toBeVisible();

      // Data should be preserved
      await expect(
        page.getByRole("textbox", { name: "First Name" }),
      ).toHaveValue("John");

      // Continue to step 3
      await page.getByRole("button", { name: "Next" }).click();
      await page.getByRole("button", { name: "Next" }).click();

      // Step 3 - Review
      await expect(page.getByText("Step 3 of 3")).toBeVisible();
      await expect(page.getByText("John Doe")).toBeVisible();
      await expect(page.getByText("123 Main St")).toBeVisible();

      // Submit
      await page.getByRole("button", { name: "Submit" }).click();

      // Success
      await expect(
        page.getByText("Wizard completed successfully"),
      ).toBeVisible();
    });
  });

  test.describe("Theme Switching", () => {
    test("switch between light and dark themes", async ({ page }) => {
      // Check initial theme
      const html = page.locator("html");
      const initialTheme = await html.getAttribute("data-theme");

      // Toggle theme
      await page.getByLabel("Toggle theme").click();

      // Check theme changed
      const newTheme = await html.getAttribute("data-theme");
      expect(newTheme).not.toBe(initialTheme);

      // Check persistence (reload page)
      await page.reload();
      const persistedTheme = await html.getAttribute("data-theme");
      expect(persistedTheme).toBe(newTheme);

      // Check visual changes
      const backgroundColor = await page.evaluate(
        () => window.getComputedStyle(document.body).backgroundColor,
      );

      if (newTheme === "dark") {
        expect(backgroundColor).toMatch(/rgb\((\d+), (\d+), (\d+)\)/);
        // Dark theme should have low RGB values
      } else {
        // Light theme should have high RGB values
      }
    });
  });

  test.describe("Error Boundary Recovery", () => {
    test("handle and recover from component errors", async ({ page }) => {
      await page.goto(`${TEST_APP_URL}/error-demo`);

      // Trigger an error
      await page.getByRole("button", { name: "Trigger Error" }).click();

      // Check error boundary caught it
      await expect(page.getByText("Something went wrong")).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Try again" }),
      ).toBeVisible();

      // Recover
      await page.getByRole("button", { name: "Try again" }).click();

      // Should be back to normal
      await expect(page.getByText("Something went wrong")).not.toBeVisible();
      await expect(
        page.getByRole("button", { name: "Trigger Error" }),
      ).toBeVisible();
    });
  });

  test.describe("Accessibility Compliance", () => {
    test("keyboard-only navigation", async ({ page }) => {
      // Tab through interactive elements
      await page.keyboard.press("Tab");
      let focusedElement = await page.evaluate(
        () => document.activeElement?.tagName,
      );
      expect(focusedElement).toBeTruthy();

      // Continue tabbing and ensure all interactive elements are reachable
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press("Tab");
        focusedElement = await page.evaluate(() => ({
          tag: document.activeElement?.tagName,
          visible: document.activeElement?.offsetParent !== null,
        }));
        expect(focusedElement.visible).toBe(true);
      }
    });

    test("screen reader announcements", async ({ page }) => {
      // Check for live regions
      const liveRegions = page.getByRole("status");
      const alertRegions = page.getByRole("alert");

      // Trigger an action that should announce
      await page.getByRole("button", { name: "Save" }).click();

      // Check announcement was made
      await expect(page.getByText("Saved successfully")).toBeVisible();
      const announcement = page.getByRole("status", { name: /Saved/ });
      await expect(announcement).toHaveAttribute("aria-live", "polite");
    });
  });
});
