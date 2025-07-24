import type { ComponentType } from "react";
import React, { Suspense, lazy } from "react";
import type { ComponentShowcaseProps } from "../component-showcase";

// Import types for lazy components' props
import type {
	BarChartProps,
	DonutChartProps,
	LineChartProps,
} from "../glass-chart";
import type { GlassComboboxProps } from "../glass-combobox";
import type { CommandPaletteProps } from "../glass-command";
import type { GlassDatePickerProps } from "../glass-date-picker";
import type { GlassFileUploadProps } from "../glass-file-upload";
import { GlassSpinner } from "../glass-spinner";

// Export these types so they can be named by TypeScript
export type {
	LineChartProps,
	BarChartProps,
	DonutChartProps,
	CommandPaletteProps,
	ComponentShowcaseProps,
	GlassDatePickerProps,
	GlassFileUploadProps,
	GlassComboboxProps,
};

// Default loading component
const DefaultLoadingComponent = () => (

	<div className="glass-lazy-loading flex items-center justify-center p-8">

		<GlassSpinner size="md" />
	</div>
);

// Lazy load wrapper with built-in suspense
export function createLazyComponent<T extends ComponentType<any>>(
	importFunction: () => Promise<{ default: T }>,
	LoadingComponent: ComponentType = DefaultLoadingComponent,
) {
	const LazyComponent = lazy(importFunction);

	return (props: React.ComponentProps<T>) => (

		<Suspense fallback={<LoadingComponent />}>

			<LazyComponent {...props} />
		</Suspense>
	);
}

// Pre-configured lazy components for heavy components
// Note: GlassChart exports multiple chart components, not a single GlassChart
export const LazyLineChart = createLazyComponent(() =>
	import("../glass-chart").then((m) => ({ default: m.LineChart })),
);

export const LazyBarChart = createLazyComponent(() =>
	import("../glass-chart").then((m) => ({ default: m.BarChart })),
);

export const LazyDonutChart = createLazyComponent(() =>
	import("../glass-chart").then((m) => ({ default: m.DonutChart })),
);

export const LazyGlassDatePicker = createLazyComponent(() =>
	import("../glass-date-picker").then((m) => ({ default: m.GlassDatePicker })),
);

export const LazyGlassFileUpload = createLazyComponent(() =>
	import("../glass-file-upload").then((m) => ({ default: m.GlassFileUpload })),
);

export const LazyCommandPalette = createLazyComponent(() =>
	import("../glass-command").then((m) => ({ default: m.CommandPalette })),
);

export const LazyGlassCombobox = createLazyComponent(() =>
	import("../glass-combobox").then((m) => ({ default: m.GlassCombobox })),
);

export const LazyComponentShowcase = createLazyComponent(() =>
	import("../component-showcase").then((m) => ({
		default: m.ComponentShowcase,
	})),
);

// Lazy load with preload capability
export function createPreloadableComponent<T extends ComponentType<any>>(
	importFunction: () => Promise<{ default: T }>,
) {
	let preloadPromise: Promise<{ default: T }> | null;

	const preload = () => {
		if (!preloadPromise) {
			preloadPromise = importFunction();
		}
		return preloadPromise;
	};

	const LazyComponent = lazy(() => preload());

	const Component = (props: React.ComponentProps<T>) => (

		<Suspense fallback={<DefaultLoadingComponent />}>

			<LazyComponent {...props} />
		</Suspense>
	);

	Component.preload = preload;

	return Component;
}

// Intersection Observer based lazy loading
export function useLazyLoad(
	ref: React.RefObject<HTMLElement>,
	onIntersect: () => void,
	options?: IntersectionObserverInit,
) {
	React.useEffect(() => {
		if (!ref.current) {
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						onIntersect();
						observer.disconnect();
					}
				}
			},
			{
				rootMargin: "50px",
				...options,
			},
		);

		observer.observe(ref.current);

		return () => observer.disconnect();
	}, [ref, onIntersect, options]);
}
