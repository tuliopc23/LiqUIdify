import { type RenderOptions, render } from "@testing-library/react";
import type { ReactElement } from "react";

// Custom render function for components
const customRender = (ui: ReactElement, options: RenderOptions = {}) => {
	return render(ui, options);
};

// Re-export everything from testing-library
export * from "@testing-library/react";
export { customRender as render };
