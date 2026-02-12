import { renderHook } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { useGlassMicro } from "../hooks/useGlassMicro";
import { useMagneticHover } from "../hooks/useMagneticHover";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { css } from "../lib/css";
import {
	ACCENT_PRESETS,
	getAccent,
	getAccentPreset,
	setAccent,
	setAccentPreset,
} from "../lib/theme";
import { setupDOM } from "./test-setup";

beforeAll(() => {
	setupDOM();
});

describe("useReducedMotion", () => {
	it("returns false by default with mocked matchMedia", () => {
		const { result } = renderHook(() => useReducedMotion());
		expect(result.current).toBe(false);
	});

	it("respects prefers-reduced-motion=true when matchMedia matches", () => {
		const original = window.matchMedia;
		(window as any).matchMedia = vi.fn().mockImplementation((query: string) => ({
			matches: query.includes("prefers-reduced-motion"),
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));

		const { result } = renderHook(() => useReducedMotion());
		expect(result.current).toBe(true);

		window.matchMedia = original;
	});
});

describe("useGlassMicro and useMagneticHover", () => {
	it("do not throw and expose motion properties", () => {
		const { result: glass } = renderHook(() => useGlassMicro());
		expect(glass.current.scale).toBeDefined();
		expect(glass.current.y).toBeDefined();

		const { result: magnetic } = renderHook(() =>
			useMagneticHover({ strength: 0.2 }),
		);
		expect(magnetic.current.ref).toBeDefined();
		expect(magnetic.current.style).toHaveProperty("x");
		expect(magnetic.current.style).toHaveProperty("y");
		expect(magnetic.current.style).toHaveProperty("scale");
	});
});

describe("css utility", () => {
	it("joins classes and ignores falsy values", () => {
		expect(css("a", undefined, "b", false && "c")).toBe("a b");
	});
});

describe("theme accent helpers", () => {
	it("can get and set accent based on presets", () => {
		const blue = getAccentPreset("blue");
		expect(blue).toBe(ACCENT_PRESETS.blue);

		const accent = setAccentPreset("blue", { persist: false });
		expect(accent).toBe(ACCENT_PRESETS.blue);

		// getAccent falls back to default when no DOM is configured
		const current = getAccent({ persist: false });
		expect(typeof current).toBe("string");

		const next = setAccent("#34C759", { persist: false });
		expect(next).toBe("#34C759");
	});
});

