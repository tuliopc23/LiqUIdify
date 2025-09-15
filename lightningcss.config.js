/**
 * Lightning CSS Configuration
 * Optimizes CSS for the LiqUIdify component library
 */

export default {
	// Modern browser targets for optimal component library support
	targets: {
		chrome: 95,
		firefox: 91,
		safari: 15,
		edge: 95,
		ios_saf: 15,
	},

	// CSS Features configuration
	include: {
		// Modern CSS features for component styling
		nesting: true, // CSS nesting for cleaner code
		customMedia: true, // @custom-media queries
		logicalProperties: true, // Logical properties for RTL support
		colorFunction: true, // color() function
		cascadeLayers: true, // @layer for better specificity control
		containerQueries: false, // Not needed for current design
	},

	// Optimization settings
	minify: true, // Minify output CSS
	sourceMap: true, // Generate source maps
	analyzeDependencies: true, // Analyze @import dependencies

	// Preserve important patterns for component styling
	preserve: {
		customProperties: true, // Keep CSS variables
		importantComments: true, // Keep license comments
	},

	// CSS Modules (disabled for this library)
	cssModules: false,

	// Drafts and experimental features
	drafts: {
		customMedia: true, // @custom-media support
		nesting: true, // Native CSS nesting
	},

	// Pseudo-class configuration for interactive states
	pseudoClasses: {
		hover: "hover",
		focus: "focus",
		focusVisible: "focus-visible",
		focusWithin: "focus-within",
		active: "active",
		disabled: "disabled",
		any: true,
		dir: true,
		lang: true,
	},

	// Vendor prefixing
	autoprefixer: {
		flexbox: true,
		grid: true,
	},

	// Error recovery
	errorRecovery: true,

	// Custom warnings to ignore
	ignoreWarnings: ["css-input-source-map-warning"],
};
