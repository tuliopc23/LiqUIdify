/**
 * Visual Regression Testing Configuration
 * Integrates Percy/Chromatic for automated visual diff testing
 */

const { percySnapshot } = require("@percy/playwright");
const { test, expect } = require("@playwright/test");

// Visual test suite configuration
const visualTestConfig = {
	// Percy configuration
	percy: {
		project: "liquidify-ui",
		token: process.env.PERCY_TOKEN,
		branch: process.env.GITHUB_REF_NAME || "main",
		commit: process.env.GITHUB_SHA,
		build: process.env.GITHUB_RUN_ID,
	},

	// Chromatic configuration
	chromatic: {
		projectToken: process.env.CHROMATIC_PROJECT_TOKEN,
		branchName: process.env.GITHUB_REF_NAME || "main",
		commit: process.env.GITHUB_SHA,
		buildNumber: process.env.GITHUB_RUN_NUMBER,
	},

	// Test thresholds
	thresholds: {
		pixel: 0.1, // 0.1% pixel difference threshold
		diff: 0.2, // 0.2% overall difference threshold
	},

	// Viewport configurations for responsive testing
	viewports: [
		{ width: 375, height: 667, name: "mobile" },
		{ width: 768, height: 1024, name: "tablet" },
		{ width: 1440, height: 900, name: "desktop" },
		{ width: 1920, height: 1080, name: "desktop-hd" },
	],

	// Component states to test
	states: ["default", "hover", "focus", "active", "disabled", "loading"],
};

module.exports = visualTestConfig;
