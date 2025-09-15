/* eslint-disable */
export type Token = `colors.${ColorToken}` | `radii.${RadiusToken}` | `blurs.${BlurToken}` | `shadows.${ShadowToken}` | `durations.${DurationToken}` | `easings.${EasingToken}` | `sizes.${SizeToken}` | `spacing.${SpacingToken}` | `fonts.${FontToken}` | `fontSizes.${FontSizeToken}` | `lineHeights.${LineHeightToken}` | `fontWeights.${FontWeightToken}` | `letterSpacings.${LetterSpacingToken}`

export type ColorPalette = "glass" | "glass.subtle" | "glass.medium" | "glass.strong" | "glass.gradients" | "button" | "button.primary" | "button.secondary" | "button.ghost" | "button.danger" | "button.success" | "button.warning" | "accent" | "text" | "text.glass" | "gray" | "blue" | "indigo" | "teal" | "green" | "orange" | "pink" | "bg" | "border"

export type ColorToken = "glass.bg" | "glass.border" | "glass.ripple" | "glass.subtle.bg" | "glass.subtle.border" | "glass.medium.bg" | "glass.medium.border" | "glass.strong.bg" | "glass.strong.border" | "glass.gradients.before" | "glass.gradients.after" | "button.primary.bg" | "button.primary.border" | "button.secondary.bg" | "button.secondary.border" | "button.ghost.bg" | "button.ghost.border" | "button.danger.bg" | "button.danger.border" | "button.success.bg" | "button.success.border" | "button.warning.bg" | "button.warning.border" | "accent.primary" | "accent.secondary" | "accent.success" | "accent.warning" | "accent.danger" | "text.glass.primary" | "text.glass.secondary" | "text.glass.muted" | "text.glass.disabled" | "gray.50" | "gray.100" | "gray.200" | "gray.300" | "gray.600" | "gray.700" | "gray.800" | "gray.900" | "blue.500" | "indigo.500" | "teal.500" | "green.500" | "orange.500" | "pink.500" | "bg.canvas" | "bg.surface" | "bg.subtle" | "border.default" | "border.hairline" | "colorPalette.bg" | "colorPalette.border" | "colorPalette.ripple" | "colorPalette.subtle.bg" | "colorPalette.subtle.border" | "colorPalette.medium.bg" | "colorPalette.medium.border" | "colorPalette.strong.bg" | "colorPalette.strong.border" | "colorPalette.gradients.before" | "colorPalette.before" | "colorPalette.gradients.after" | "colorPalette.after" | "colorPalette.primary.bg" | "colorPalette.primary.border" | "colorPalette.secondary.bg" | "colorPalette.secondary.border" | "colorPalette.ghost.bg" | "colorPalette.ghost.border" | "colorPalette.danger.bg" | "colorPalette.danger.border" | "colorPalette.success.bg" | "colorPalette.success.border" | "colorPalette.warning.bg" | "colorPalette.warning.border" | "colorPalette.primary" | "colorPalette.secondary" | "colorPalette.success" | "colorPalette.warning" | "colorPalette.danger" | "colorPalette.glass.primary" | "colorPalette.glass.secondary" | "colorPalette.glass.muted" | "colorPalette.muted" | "colorPalette.glass.disabled" | "colorPalette.disabled" | "colorPalette.50" | "colorPalette.100" | "colorPalette.200" | "colorPalette.300" | "colorPalette.600" | "colorPalette.700" | "colorPalette.800" | "colorPalette.900" | "colorPalette.500" | "colorPalette.canvas" | "colorPalette.surface" | "colorPalette.subtle" | "colorPalette.default" | "colorPalette.hairline"

export type RadiusToken = "none" | "xs" | "sm" | "control" | "field" | "md" | "lg" | "xl" | "2xl" | "full" | "roles.control" | "roles.field" | "roles.card" | "roles.sheet" | "roles.surfaceLg" | "glass.xs" | "glass.sm" | "glass.md" | "glass.lg" | "glass.xl" | "glass.2xl" | "glass.full"

export type BlurToken = "glass.sm" | "glass.md" | "glass.lg" | "glass.xl"

export type ShadowToken = "glass.base" | "glass.sm" | "glass.md" | "glass.lg" | "glass.hover" | "textStyles.display" | "textStyles.title1" | "textStyles.title3" | "textStyles.body" | "textStyles.caption"

export type DurationToken = "glass.flow" | "glass.bounce" | "glass.quick" | "glass.instant"

export type EasingToken = "glass.flow" | "glass.bounce" | "glass.spring"

export type SizeToken = "glass.xs" | "glass.sm" | "glass.md" | "glass.lg" | "glass.xl"

export type SpacingToken = "glass.xs" | "glass.sm" | "glass.md" | "glass.lg" | "glass.xl" | "glass.2xl" | "glass.3xl" | "-glass.xs" | "-glass.sm" | "-glass.md" | "-glass.lg" | "-glass.xl" | "-glass.2xl" | "-glass.3xl"

export type FontToken = "sans" | "display" | "mono"

export type FontSizeToken = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl"

export type LineHeightToken = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose"

export type FontWeightToken = "thin" | "extralight" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black"

export type LetterSpacingToken = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest"

export type Tokens = {
		colors: ColorToken
		radii: RadiusToken
		blurs: BlurToken
		shadows: ShadowToken
		durations: DurationToken
		easings: EasingToken
		sizes: SizeToken
		spacing: SpacingToken
		fonts: FontToken
		fontSizes: FontSizeToken
		lineHeights: LineHeightToken
		fontWeights: FontWeightToken
		letterSpacings: LetterSpacingToken
} & { [token: string]: never }

export type TokenCategory = "aspectRatios" | "zIndex" | "opacity" | "colors" | "fonts" | "fontSizes" | "fontWeights" | "lineHeights" | "letterSpacings" | "sizes" | "cursor" | "shadows" | "spacing" | "radii" | "borders" | "borderWidths" | "durations" | "easings" | "animations" | "blurs" | "gradients" | "breakpoints" | "assets"