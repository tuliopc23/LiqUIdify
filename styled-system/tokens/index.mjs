const tokens = {
	"colors.glass.bg": {
		value: "rgba(255, 255, 255, 0.1)",
		variable: "var(--colors-glass-bg)",
	},
	"colors.glass.border": {
		value: "rgba(255, 255, 255, 0.2)",
		variable: "var(--colors-glass-border)",
	},
	"colors.glass.ripple": {
		value: "rgba(255, 255, 255, 0.3)",
		variable: "var(--colors-glass-ripple)",
	},
	"colors.glass.subtle.bg": {
		value: "rgba(255, 255, 255, 0.05)",
		variable: "var(--colors-glass-subtle-bg)",
	},
	"colors.glass.subtle.border": {
		value: "rgba(255, 255, 255, 0.1)",
		variable: "var(--colors-glass-subtle-border)",
	},
	"colors.glass.medium.bg": {
		value: "rgba(255, 255, 255, 0.1)",
		variable: "var(--colors-glass-medium-bg)",
	},
	"colors.glass.medium.border": {
		value: "rgba(255, 255, 255, 0.2)",
		variable: "var(--colors-glass-medium-border)",
	},
	"colors.glass.strong.bg": {
		value: "rgba(255, 255, 255, 0.2)",
		variable: "var(--colors-glass-strong-bg)",
	},
	"colors.glass.strong.border": {
		value: "rgba(255, 255, 255, 0.3)",
		variable: "var(--colors-glass-strong-border)",
	},
	"colors.glass.gradients.before": {
		value:
			"linear-gradient(145deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0) 100%)",
		variable: "var(--colors-glass-gradients-before)",
	},
	"colors.glass.gradients.after": {
		value:
			"linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0.05) 100%)",
		variable: "var(--colors-glass-gradients-after)",
	},
	"colors.button.primary.bg": {
		value:
			"linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)",
		variable: "var(--colors-button-primary-bg)",
	},
	"colors.button.primary.border": {
		value: "rgba(96, 165, 250, 0.4)",
		variable: "var(--colors-button-primary-border)",
	},
	"colors.button.secondary.bg": {
		value: "rgba(255, 255, 255, 0.1)",
		variable: "var(--colors-button-secondary-bg)",
	},
	"colors.button.secondary.border": {
		value: "rgba(255, 255, 255, 0.2)",
		variable: "var(--colors-button-secondary-border)",
	},
	"colors.button.ghost.bg": {
		value: "transparent",
		variable: "var(--colors-button-ghost-bg)",
	},
	"colors.button.ghost.border": {
		value: "rgba(255, 255, 255, 0.1)",
		variable: "var(--colors-button-ghost-border)",
	},
	"colors.button.danger.bg": {
		value:
			"linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(220, 38, 38, 0.3) 100%)",
		variable: "var(--colors-button-danger-bg)",
	},
	"colors.button.danger.border": {
		value: "rgba(248, 113, 113, 0.4)",
		variable: "var(--colors-button-danger-border)",
	},
	"colors.button.success.bg": {
		value:
			"linear-gradient(135deg, rgba(34, 197, 94, 0.3) 0%, rgba(22, 163, 74, 0.3) 100%)",
		variable: "var(--colors-button-success-bg)",
	},
	"colors.button.success.border": {
		value: "rgba(74, 222, 128, 0.4)",
		variable: "var(--colors-button-success-border)",
	},
	"colors.button.warning.bg": {
		value:
			"linear-gradient(135deg, rgba(251, 191, 36, 0.3) 0%, rgba(245, 158, 11, 0.3) 100%)",
		variable: "var(--colors-button-warning-bg)",
	},
	"colors.button.warning.border": {
		value: "rgba(253, 224, 71, 0.4)",
		variable: "var(--colors-button-warning-border)",
	},
	"colors.accent.primary": {
		value: "rgba(59, 130, 246, 0.8)",
		variable: "var(--colors-accent-primary)",
	},
	"colors.accent.secondary": {
		value: "rgba(168, 85, 247, 0.8)",
		variable: "var(--colors-accent-secondary)",
	},
	"colors.accent.success": {
		value: "rgba(34, 197, 94, 0.8)",
		variable: "var(--colors-accent-success)",
	},
	"colors.accent.warning": {
		value: "rgba(251, 191, 36, 0.8)",
		variable: "var(--colors-accent-warning)",
	},
	"colors.accent.danger": {
		value: "rgba(239, 68, 68, 0.8)",
		variable: "var(--colors-accent-danger)",
	},
	"colors.text.glass.primary": {
		value: "rgba(255, 255, 255, 1)",
		variable: "var(--colors-text-glass-primary)",
	},
	"colors.text.glass.secondary": {
		value: "rgba(255, 255, 255, 0.9)",
		variable: "var(--colors-text-glass-secondary)",
	},
	"colors.text.glass.muted": {
		value: "rgba(255, 255, 255, 0.7)",
		variable: "var(--colors-text-glass-muted)",
	},
	"colors.text.glass.disabled": {
		value: "rgba(255, 255, 255, 0.5)",
		variable: "var(--colors-text-glass-disabled)",
	},
	"radii.none": {
		value: "0px",
		variable: "var(--radii-none)",
	},
	"radii.xs": {
		value: "4px",
		variable: "var(--radii-xs)",
	},
	"radii.sm": {
		value: "8px",
		variable: "var(--radii-sm)",
	},
	"radii.md": {
		value: "16px",
		variable: "var(--radii-md)",
	},
	"radii.lg": {
		value: "20px",
		variable: "var(--radii-lg)",
	},
	"radii.xl": {
		value: "24px",
		variable: "var(--radii-xl)",
	},
	"radii.2xl": {
		value: "32px",
		variable: "var(--radii-2xl)",
	},
	"radii.full": {
		value: "9999px",
		variable: "var(--radii-full)",
	},
	"radii.glass.xs": {
		value: "var(--radii-xs)",
		variable: "var(--radii-glass-xs)",
	},
	"radii.glass.sm": {
		value: "var(--radii-sm)",
		variable: "var(--radii-glass-sm)",
	},
	"radii.glass.md": {
		value: "var(--radii-md)",
		variable: "var(--radii-glass-md)",
	},
	"radii.glass.lg": {
		value: "var(--radii-lg)",
		variable: "var(--radii-glass-lg)",
	},
	"radii.glass.xl": {
		value: "var(--radii-xl)",
		variable: "var(--radii-glass-xl)",
	},
	"radii.glass.2xl": {
		value: "var(--radii-2xl)",
		variable: "var(--radii-glass-2xl)",
	},
	"radii.glass.full": {
		value: "var(--radii-full)",
		variable: "var(--radii-glass-full)",
	},
	"blurs.glass.sm": {
		value: "5px",
		variable: "var(--blurs-glass-sm)",
	},
	"blurs.glass.md": {
		value: "10px",
		variable: "var(--blurs-glass-md)",
	},
	"blurs.glass.lg": {
		value: "20px",
		variable: "var(--blurs-glass-lg)",
	},
	"blurs.glass.xl": {
		value: "30px",
		variable: "var(--blurs-glass-xl)",
	},
	"shadows.glass.base": {
		value:
			"0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)",
		variable: "var(--shadows-glass-base)",
	},
	"shadows.glass.sm": {
		value:
			"0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
		variable: "var(--shadows-glass-sm)",
	},
	"shadows.glass.md": {
		value:
			"0 12px 40px rgba(0, 0, 0, 0.15), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 20px rgba(255, 255, 255, 0.1)",
		variable: "var(--shadows-glass-md)",
	},
	"shadows.glass.lg": {
		value:
			"0 16px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.15)",
		variable: "var(--shadows-glass-lg)",
	},
	"shadows.glass.hover": {
		value:
			"0 16px 50px rgba(0, 0, 0, 0.2), inset 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 255, 255, 0.15)",
		variable: "var(--shadows-glass-hover)",
	},
	"durations.glass.flow": {
		value: "0.8s",
		variable: "var(--durations-glass-flow)",
	},
	"durations.glass.bounce": {
		value: "0.6s",
		variable: "var(--durations-glass-bounce)",
	},
	"durations.glass.quick": {
		value: "0.2s",
		variable: "var(--durations-glass-quick)",
	},
	"durations.glass.instant": {
		value: "0.1s",
		variable: "var(--durations-glass-instant)",
	},
	"easings.glass.flow": {
		value: "cubic-bezier(0.23, 1, 0.32, 1)",
		variable: "var(--easings-glass-flow)",
	},
	"easings.glass.bounce": {
		value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
		variable: "var(--easings-glass-bounce)",
	},
	"easings.glass.spring": {
		value: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
		variable: "var(--easings-glass-spring)",
	},
	"sizes.glass.xs": {
		value: "8px",
		variable: "var(--sizes-glass-xs)",
	},
	"sizes.glass.sm": {
		value: "12px",
		variable: "var(--sizes-glass-sm)",
	},
	"sizes.glass.md": {
		value: "16px",
		variable: "var(--sizes-glass-md)",
	},
	"sizes.glass.lg": {
		value: "20px",
		variable: "var(--sizes-glass-lg)",
	},
	"sizes.glass.xl": {
		value: "24px",
		variable: "var(--sizes-glass-xl)",
	},
	"spacing.glass.xs": {
		value: "4px",
		variable: "var(--spacing-glass-xs)",
	},
	"spacing.glass.sm": {
		value: "8px",
		variable: "var(--spacing-glass-sm)",
	},
	"spacing.glass.md": {
		value: "12px",
		variable: "var(--spacing-glass-md)",
	},
	"spacing.glass.lg": {
		value: "16px",
		variable: "var(--spacing-glass-lg)",
	},
	"spacing.glass.xl": {
		value: "20px",
		variable: "var(--spacing-glass-xl)",
	},
	"spacing.glass.2xl": {
		value: "24px",
		variable: "var(--spacing-glass-2xl)",
	},
	"spacing.glass.3xl": {
		value: "32px",
		variable: "var(--spacing-glass-3xl)",
	},
	"spacing.glass.-xs": {
		value: "calc(var(--spacing-glass-xs) * -1)",
		variable: "var(--spacing-glass-xs)",
	},
	"spacing.glass.-sm": {
		value: "calc(var(--spacing-glass-sm) * -1)",
		variable: "var(--spacing-glass-sm)",
	},
	"spacing.glass.-md": {
		value: "calc(var(--spacing-glass-md) * -1)",
		variable: "var(--spacing-glass-md)",
	},
	"spacing.glass.-lg": {
		value: "calc(var(--spacing-glass-lg) * -1)",
		variable: "var(--spacing-glass-lg)",
	},
	"spacing.glass.-xl": {
		value: "calc(var(--spacing-glass-xl) * -1)",
		variable: "var(--spacing-glass-xl)",
	},
	"spacing.glass.-2xl": {
		value: "calc(var(--spacing-glass-2xl) * -1)",
		variable: "var(--spacing-glass-2xl)",
	},
	"spacing.glass.-3xl": {
		value: "calc(var(--spacing-glass-3xl) * -1)",
		variable: "var(--spacing-glass-3xl)",
	},
	"colors.colorPalette.bg": {
		value: "var(--colors-color-palette-bg)",
		variable: "var(--colors-color-palette-bg)",
	},
	"colors.colorPalette.border": {
		value: "var(--colors-color-palette-border)",
		variable: "var(--colors-color-palette-border)",
	},
	"colors.colorPalette.ripple": {
		value: "var(--colors-color-palette-ripple)",
		variable: "var(--colors-color-palette-ripple)",
	},
	"colors.colorPalette.subtle.bg": {
		value: "var(--colors-color-palette-subtle-bg)",
		variable: "var(--colors-color-palette-subtle-bg)",
	},
	"colors.colorPalette.subtle.border": {
		value: "var(--colors-color-palette-subtle-border)",
		variable: "var(--colors-color-palette-subtle-border)",
	},
	"colors.colorPalette.medium.bg": {
		value: "var(--colors-color-palette-medium-bg)",
		variable: "var(--colors-color-palette-medium-bg)",
	},
	"colors.colorPalette.medium.border": {
		value: "var(--colors-color-palette-medium-border)",
		variable: "var(--colors-color-palette-medium-border)",
	},
	"colors.colorPalette.strong.bg": {
		value: "var(--colors-color-palette-strong-bg)",
		variable: "var(--colors-color-palette-strong-bg)",
	},
	"colors.colorPalette.strong.border": {
		value: "var(--colors-color-palette-strong-border)",
		variable: "var(--colors-color-palette-strong-border)",
	},
	"colors.colorPalette.gradients.before": {
		value: "var(--colors-color-palette-gradients-before)",
		variable: "var(--colors-color-palette-gradients-before)",
	},
	"colors.colorPalette.before": {
		value: "var(--colors-color-palette-before)",
		variable: "var(--colors-color-palette-before)",
	},
	"colors.colorPalette.gradients.after": {
		value: "var(--colors-color-palette-gradients-after)",
		variable: "var(--colors-color-palette-gradients-after)",
	},
	"colors.colorPalette.after": {
		value: "var(--colors-color-palette-after)",
		variable: "var(--colors-color-palette-after)",
	},
	"colors.colorPalette.primary.bg": {
		value: "var(--colors-color-palette-primary-bg)",
		variable: "var(--colors-color-palette-primary-bg)",
	},
	"colors.colorPalette.primary.border": {
		value: "var(--colors-color-palette-primary-border)",
		variable: "var(--colors-color-palette-primary-border)",
	},
	"colors.colorPalette.secondary.bg": {
		value: "var(--colors-color-palette-secondary-bg)",
		variable: "var(--colors-color-palette-secondary-bg)",
	},
	"colors.colorPalette.secondary.border": {
		value: "var(--colors-color-palette-secondary-border)",
		variable: "var(--colors-color-palette-secondary-border)",
	},
	"colors.colorPalette.ghost.bg": {
		value: "var(--colors-color-palette-ghost-bg)",
		variable: "var(--colors-color-palette-ghost-bg)",
	},
	"colors.colorPalette.ghost.border": {
		value: "var(--colors-color-palette-ghost-border)",
		variable: "var(--colors-color-palette-ghost-border)",
	},
	"colors.colorPalette.danger.bg": {
		value: "var(--colors-color-palette-danger-bg)",
		variable: "var(--colors-color-palette-danger-bg)",
	},
	"colors.colorPalette.danger.border": {
		value: "var(--colors-color-palette-danger-border)",
		variable: "var(--colors-color-palette-danger-border)",
	},
	"colors.colorPalette.success.bg": {
		value: "var(--colors-color-palette-success-bg)",
		variable: "var(--colors-color-palette-success-bg)",
	},
	"colors.colorPalette.success.border": {
		value: "var(--colors-color-palette-success-border)",
		variable: "var(--colors-color-palette-success-border)",
	},
	"colors.colorPalette.warning.bg": {
		value: "var(--colors-color-palette-warning-bg)",
		variable: "var(--colors-color-palette-warning-bg)",
	},
	"colors.colorPalette.warning.border": {
		value: "var(--colors-color-palette-warning-border)",
		variable: "var(--colors-color-palette-warning-border)",
	},
	"colors.colorPalette.primary": {
		value: "var(--colors-color-palette-primary)",
		variable: "var(--colors-color-palette-primary)",
	},
	"colors.colorPalette.secondary": {
		value: "var(--colors-color-palette-secondary)",
		variable: "var(--colors-color-palette-secondary)",
	},
	"colors.colorPalette.success": {
		value: "var(--colors-color-palette-success)",
		variable: "var(--colors-color-palette-success)",
	},
	"colors.colorPalette.warning": {
		value: "var(--colors-color-palette-warning)",
		variable: "var(--colors-color-palette-warning)",
	},
	"colors.colorPalette.danger": {
		value: "var(--colors-color-palette-danger)",
		variable: "var(--colors-color-palette-danger)",
	},
	"colors.colorPalette.glass.primary": {
		value: "var(--colors-color-palette-glass-primary)",
		variable: "var(--colors-color-palette-glass-primary)",
	},
	"colors.colorPalette.glass.secondary": {
		value: "var(--colors-color-palette-glass-secondary)",
		variable: "var(--colors-color-palette-glass-secondary)",
	},
	"colors.colorPalette.glass.muted": {
		value: "var(--colors-color-palette-glass-muted)",
		variable: "var(--colors-color-palette-glass-muted)",
	},
	"colors.colorPalette.muted": {
		value: "var(--colors-color-palette-muted)",
		variable: "var(--colors-color-palette-muted)",
	},
	"colors.colorPalette.glass.disabled": {
		value: "var(--colors-color-palette-glass-disabled)",
		variable: "var(--colors-color-palette-glass-disabled)",
	},
	"colors.colorPalette.disabled": {
		value: "var(--colors-color-palette-disabled)",
		variable: "var(--colors-color-palette-disabled)",
	},
};

export function token(path, fallback) {
	return tokens[path]?.value || fallback;
}

function tokenVar(path, fallback) {
	return tokens[path]?.variable || fallback;
}

token.var = tokenVar;
