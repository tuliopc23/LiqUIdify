import React from "react";
import { afterEach } from "vitest";
import { configureAxe } from "@axe-core/react";

// Minimal axe helper for smoke tests
// Usage: const axe = getAxe(container); await axe();

let cachedAxe: ((container?: HTMLElement) => Promise<void>) | null = null;

export function getAxe(container?: HTMLElement) {
  if (!cachedAxe) {
    const ReactDOM = require("react-dom") as typeof import("react-dom");
    cachedAxe = configureAxe(React, ReactDOM, { rules: [] });
  }
  const run = async (target?: HTMLElement) => {
    // If a target is given, run against it; otherwise against document
    await cachedAxe?.(target || (globalThis.document?.body as HTMLElement));
  };
  return run;
}

// Clear any side-effects between tests
afterEach(() => {
  // no-op currently; placeholder to extend rules if needed
});
