/**
 * Hydration Detector Component
 * Detects and handles hydration mismatches with automatic recovery
 */

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import type { HydrationMismatch } from "../../utils/hydration-utils";

import { HydrationManager } from "../../utils/hydration-utils";
import { isBrowser } from "../../utils/ssr-utils";

export interface HydrationDetectorProps {
	children: ReactNode;
	fallback?: ReactNode;
	onMismatch?: (mismatch: HydrationMismatch) => void;
	onRecovery?: () => void;
	maxRetries?: number;
	retryDelay?: number;
	debug?: boolean;
}

/**
 * Hydration Detector Component
 * Monitors for hydration mismatches and provides recovery mechanisms
 */
export function HydrationDetector({
	children,

	fallback = <div>Loading...</div>,
	onMismatch,
	onRecovery,
	maxRetries = 3,
	retryDelay = 1000,
	debug = false,
}: HydrationDetectorProps) {
	const [hydrationState, setHydrationState] = useState({
		isHydrating: true,
		hasMismatch: false,
		mismatches: [] as HydrationMismatch[],
		retryCount: 0,
		isReady: false,
	});

	useEffect(() => {
		if (!isBrowser()) {
			setHydrationState((previous) => ({ ...previous, isReady: true }));
			return;
		}

		const manager = HydrationManager.getInstance();

		// Set up error handling
		const handleError = (event: ErrorEvent) => {
			if (event.message.includes("hydration")) {
				const mismatch: HydrationMismatch = {
					type: "content",
					component: "HydrationDetector",
					serverValue: "server-rendered",
					clientValue: "client-rendered",
					path: window.location.pathname,
					timestamp: Date.now(),
				};

				if (debug) {
					// Logging disabled
				}

				manager.addMismatch(mismatch);
				onMismatch?.(mismatch);
			}
		};

		// Set up recovery
		const handleRecovery = () => {
			if (debug) {
        // Recovery triggered - hydration mismatch detected
			}

			setHydrationState((previous) => ({
				...previous,
				hasMismatch: false,
				retryCount: previous.retryCount + 1,
			}));

			onRecovery?.();
		};

		// Subscribe to hydration manager
		const unsubscribe = manager.addListener((context) => {
			setHydrationState({
				isHydrating: context.isHydrating,
				hasMismatch: context.hasMismatch,
				mismatches: context.mismatches,
				retryCount: context.retryCount,
				isReady: true,
			});
		});

		// Add recovery callback
		const removeRecoveryCallback = manager.addRecoveryCallback(handleRecovery);

		// Add global error listener
		window.addEventListener("error", handleError);

		// Mark as ready after initial setup
		setTimeout(() => {
			setHydrationState((previous) => ({ ...previous, isReady: true }));
		}, 0);

		return () => {
			unsubscribe();
			removeRecoveryCallback();
			window.removeEventListener("error", handleError);
		};
	}, [onMismatch, onRecovery, debug]);

	// Server-side rendering
	if (!isBrowser()) {

		return <>{children}</>;
	}

	// Still initializing
	if (!hydrationState.isReady) {

		return <>{fallback}</>;
	}

	// Hydration error with exhausted retries
	if (hydrationState.hasMismatch && hydrationState.retryCount >= maxRetries) {
		return (

			<div
				data-hydration-error="true"
				data-retry-count={hydrationState.retryCount}
			>
				{fallback}
			</div>
		);
	}

	// Normal rendering
	return (

		<div
			data-hydration-state={
				hydrationState.isHydrating ? "hydrating" : "hydrated"
			}
			data-mismatch-count={hydrationState.mismatches.length}
			data-retry-count={hydrationState.retryCount}
		>
			{children}
		</div>
	);
}

/**
 * Hydration Boundary Component
 * Wraps children with hydration detection and recovery
 */
export function HydrationBoundary({
	children,
	...props
}: HydrationDetectorProps) {

	return <HydrationDetector {...props}>{children}</HydrationDetector>;
}

/**
 * Hydration Safe Component
 * Individual component wrapper for hydration safety
 */
export function HydrationSafe({
	children,
	componentName = "Unknown",
	...props
}: HydrationDetectorProps & { componentName?: string }) {
	return (

		<HydrationDetector {...props}>

			<div data-component={componentName} data-hydration-safe="true">
				{children}
			</div>
		</HydrationDetector>
	);
}

/**
 * Hydration Metrics Component
 * Displays hydration performance metrics
 */
export function HydrationMetrics({ debug = false }: { debug?: boolean }) {
	const [metrics, setMetrics] = useState({
		hydrationStart: 0,
		hydrationEnd: 0,
		duration: 0,
		mismatches: 0,
	});

	useEffect(() => {
		if (!isBrowser()) {
			return;
		}

		const start = performance.now();

		const handleHydrationComplete = () => {
			const end = performance.now();
			setMetrics({
				hydrationStart: start,
				hydrationEnd: end,
				duration: end - start,
				mismatches: 0,
			});
		};

		// Simulate hydration completion
		const timeout = setTimeout(handleHydrationComplete, 0);
		return () => clearTimeout(timeout);
	}, []);

	if (!debug) {
		return;
	}

	return (

		<div
			style={{
				position: "fixed",
				top: 0,
				right: 0,
				background: "rgba(0,0,0,0.8)",
				color: "white",
				padding: "10px",
				fontSize: "12px",
				zIndex: 9999,
			}}
		>

			<div>Hydration Duration: {metrics.duration.toFixed(2)}ms</div>

			<div>Mismatches: {metrics.mismatches}</div>
		</div>
	);
}

/**
 * Hydration Recovery Component
 * Provides manual recovery trigger
 */
export function HydrationRecovery({
	onRecover,
	children,
}: {
	onRecover: () => void;
	children: ReactNode;
}) {
	const [showRecovery, setShowRecovery] = useState(false);

	useEffect(() => {
		if (!isBrowser()) {
			return;
		}

		const handleError = () => {
			setShowRecovery(true);
		};

		window.addEventListener("error", handleError);
		return () => window.removeEventListener("error", handleError);
	}, []);

	if (!showRecovery) {

		return <>{children}</>;
	}

	return (

		<div>

			<div
				style={{
					background: "red",
					color: "white",
					padding: "10px",
					margin: "10px",
				}}
			>

				<p>Hydration error detected</p>

				<button onClick={onRecover}>Recover</button>
			</div>
			{children}
		</div>
	);
}
