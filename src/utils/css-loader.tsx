/**
 * CSS Loader Utilities
 *
 * Provides utilities for loading and managing CSS in a React application:
 * - Dynamic CSS loading
 * - CSS chunk management
 * - Critical CSS inlining
 */

import React, { useEffect, useState } from "react";

// Types
interface CSSLoaderOptions {
	disabled?: boolean;
	onLoad?: () => void;
	onError?: (error: Error) => void;
	media?: string;
	id?: string;
}

interface CSSChunkOptions {
	critical?: boolean;
	preload?: boolean;
	disabled?: boolean;
}

// CSS loading state tracking
const loadedCSS = new Set<string>();
const loadingCSS = new Map<string, Promise<void>>();
const cssChunks: Record<string, string> = {};

/**
 * Load CSS from a URL
 */
export function loadCSS(
	url: string,
	options: CSSLoaderOptions = {},
): Promise<void> {
	const { disabled = false, onLoad, onError, media = "all", id } = options;

	// Skip if disabled
	if (disabled) {
		return Promise.resolve();
	}

	// Return existing promise if already loading
	if (loadingCSS.has(url)) {
		return loadingCSS.get(url)!;
	}

	// Skip if already loaded
	if (loadedCSS.has(url)) {
		onLoad?.();
		return Promise.resolve();
	}

	// Create loading promise
	const promise = new Promise<void>((resolve, reject) => {
		// Skip if no document (SSR)
		if ("undefined" === typeof document) {
			resolve();
			return;
		}

		// Create link element
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = url;
		link.media = media;

		if (id) {
			link.id = id;
		}

		// Handle load event
		link.onload = () => {
			loadedCSS.add(url);
			loadingCSS.delete(url);
			onLoad?.();
			resolve();
		};

		// Handle error event
		link.onerror = (error) => {
			loadingCSS.delete(url);
			const errorObj = new Error(`Failed to load CSS: ${url}`);
			onError?.(errorObj);
			reject(errorObj);
			// Error already handled via onError callback
		};

		// Add to document
		document.head.appendChild(link);
	});

	// Store promise
	loadingCSS.set(url, promise);

	return promise;
}

/**
 * React hook for loading CSS
 */
export function useCSS(url: string, options: CSSLoaderOptions = {}): boolean {
	const [loaded, setLoaded] = useState(loadedCSS.has(url));

	useEffect(() => {
		if (!url || options.disabled) {
			return;
		}

		const currentOptions = { ...options };

		loadCSS(url, {
			...currentOptions,
			onLoad: () => {
				setLoaded(true);
				currentOptions.onLoad?.();
			},
		}).catch(() => {
			// Error already handled in loadCSS
		});
	}, [url, options.disabled, options]);

	return loaded;
}

/**
 * Register a CSS chunk
 */
export function registerCSSChunk(name: string, url: string): void {
	cssChunks[name] = url;
}

/**
 * Register multiple CSS chunks
 */
export function registerCSSChunks(chunks: Record<string, string>): void {
	Object.entries(chunks).forEach(([name, url]) => {
		registerCSSChunk(name, url);
	});
}

/**
 * Load a CSS chunk
 */
export function loadCSSChunk(
	name: string,
	options: CSSChunkOptions = {},
): Promise<void> {
	const url = cssChunks[name];

	if (!url) {
		// Logging disabled
		return Promise.resolve();
	}

	return loadCSS(url, options);
}

/**
 * React hook for loading a CSS chunk
 */
export function useCSSChunk(
	name: string,
	options: CSSChunkOptions = {},
): boolean {
	const url = cssChunks[name];
	return useCSS(url || "", options);
}

/**
 * Higher-order component for loading a CSS chunk
 */
export function withCSSChunk<P extends {}>(
	Component: React.ComponentType<P>,
	chunkName: string,
): React.ComponentType<P> {
	return (props: P) => {
		useCSSChunk(chunkName);
		return React.createElement(Component, props as any);
	};
}

/**
 * Utility to inline critical CSS
 */
export function getCriticalCSS(): string {
	// This would be replaced at build time with actual critical CSS
	return process.env.GLASS_UI_CRITICAL_CSS || "";
}

// Export all functions
export const cssLoader = {
	loadCSS,
	useCSS,
	registerCSSChunk,
	registerCSSChunks,
	loadCSSChunk,
	useCSSChunk,
	withCSSChunk,
	getCriticalCSS,
};
