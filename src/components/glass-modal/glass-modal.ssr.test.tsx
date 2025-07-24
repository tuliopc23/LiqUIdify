import { renderToString } from "react-dom/server";
import { GlassModal } from "./index";

describe("GlassModal SSR Safety", () => {
	it("renders safely on server without throwing when closed", () => {
		expect(() => {
			renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassModal isOpen={false} onClose={() => {}}>
					Modal Content
				</GlassModal>,
			);
		}).not.toThrow();
	});

	it("renders safely on server without throwing when open", () => {
		expect(() => {
			renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassModal isOpen={true} onClose={() => {}}>
					Modal Content
				</GlassModal>,
			);
		}).not.toThrow();
	});

	it("renders with title safely on server", () => {
		expect(() => {
			renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassModal isOpen={true} onClose={() => {}} title="Test Modal">
					Modal with Title
				</GlassModal>,
			);
		}).not.toThrow();
	});

	it("renders with custom className safely on server", () => {
		expect(() => {
			renderToString(
// @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
				<GlassModal
					isOpen={true}
					onClose={() => {}}
					className="custom-modal"
					titleClassName="custom-title"
					contentClassName="custom-content"
				>
					Modal with Custom Classes
				</GlassModal>,
			);
		}).not.toThrow();
	});
});
