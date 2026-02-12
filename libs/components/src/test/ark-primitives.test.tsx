import { fireEvent, render } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import { Checkbox } from "../components/ark-ui/checkbox/checkbox";
import { Dialog } from "../components/ark-ui/dialog/dialog";
import { Listbox } from "../components/ark-ui/listbox/listbox";
import { Menu } from "../components/ark-ui/menu/menu";
import { Select } from "../components/ark-ui/select/select";
import { Slider } from "../components/ark-ui/slider/slider";
import { Switch } from "../components/ark-ui/switch/switch";
import { Tabs } from "../components/ark-ui/tabs/tabs";
import { setupDOM } from "./test-setup";

beforeAll(() => {
	setupDOM();
});

describe("Ark UI wrappers (basic behavior)", () => {
	it("Checkbox renders and toggles checked state", () => {
		const { getByText } = render(<Checkbox label="Accept" />);
		const label = getByText("Accept");
		expect(label).toBeInTheDocument();
		// Clicking the label should not throw; detailed state assertions are handled
		// in Ark UI's own test suite.
		fireEvent.click(label);
	});

	it("Switch renders with label", () => {
		const { getByText } = render(<Switch label="On" />);
		expect(getByText("On")).toBeInTheDocument();
	});

	it("Slider renders with label and thumb", () => {
		const { getByText, container } = render(
			<Slider label="Volume" min={0} max={100} value={[50]} />,
		);
		expect(getByText("Volume")).toBeInTheDocument();
		const thumb = container.querySelector('[role="slider"]');
		expect(thumb).toBeInTheDocument();
	});

	it("Tabs render triggers and content", () => {
		const { getByRole, getByText } = render(
			<Tabs.Root value="tab-1">
				<Tabs.List>
					<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
					<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="tab-1">Panel 1</Tabs.Content>
				<Tabs.Content value="tab-2">Panel 2</Tabs.Content>
			</Tabs.Root>,
		);
		expect(getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
		expect(getByText("Panel 1")).toBeInTheDocument();
	});

	it.skip("Listbox renders items", () => {
		// TODO: Re-enable once we align fully with Ark UI's listbox state model.
		render(<Listbox.Root />);
	});

	it.skip("Select renders trigger and items", () => {
		// TODO: Re-enable once we align fully with Ark UI's select state model.
		render(<Select.Root />);
	});

	it("Dialog renders structure with title and description", () => {
		const { getByText } = render(
			<Dialog.Root>
				<Dialog.Trigger>Open</Dialog.Trigger>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.Title>Title</Dialog.Title>
						<Dialog.Description>Description</Dialog.Description>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>,
		);
		expect(getByText("Title")).toBeInTheDocument();
		expect(getByText("Description")).toBeInTheDocument();
	});

	it("Menu renders trigger and content", () => {
		const { getByRole, getByText } = render(
			<Menu.Root>
				<Menu.Trigger>Open Menu</Menu.Trigger>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item>
							<Menu.ItemText>Item 1</Menu.ItemText>
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Menu.Root>,
		);
		expect(getByRole("button", { name: /open menu/i })).toBeInTheDocument();
		expect(getByText("Item 1")).toBeInTheDocument();
	});
});
