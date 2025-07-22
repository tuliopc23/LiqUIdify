/// <reference types="vitest/globals" />

import "vitest";
import type { AxeMatchers } from "vitest-axe";

declare module "vitest" {
	interface Assertion extends AxeMatchers {}
	interface AsymmetricMatchersContaining extends AxeMatchers {}
}

declare global {
	const expect: typeof import("vitest").expect;
	const beforeAll: typeof import("vitest").beforeAll;
	const afterAll: typeof import("vitest").afterAll;
}
