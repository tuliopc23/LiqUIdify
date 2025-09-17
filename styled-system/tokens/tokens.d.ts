/* eslint-disable */
export type Token = `colors.${ColorToken}` | `radii.${RadiusToken}` | `blurs.${BlurToken}` | `shadows.${ShadowToken}` | `durations.${DurationToken}` | `easings.${EasingToken}` | `sizes.${SizeToken}` | `spacing.${SpacingToken}` | `fonts.${FontToken}` | `fontSizes.${FontSizeToken}` | `lineHeights.${LineHeightToken}` | `fontWeights.${FontWeightToken}` | `letterSpacings.${LetterSpacingToken}`

export type ColorPalette = "glass" | "glass.subtle" | "glass.medium" | "glass.strong" | "glass.accent" | "glass.gradients" | "button" | "button.primary" | "button.secondary" | "button.ghost" | "button.danger" | "button.success" | "button.warning" | "accent" | "text" | "text.glass" | "gray" | "blue" | "indigo" | "teal" | "green" | "orange" | "pink" | "bg" | "border"

export type ColorToken = "glass.bg" | "glass.border" | "glass.ripple" | "glass.subtle.bg" | "glass.subtle.border" | "glass.medium.bg" | "glass.medium.border" | "glass.strong.bg" | "glass.strong.border" | "glass.accent.bg" | "glass.accent.border" | "glass.gradients.before" | "glass.gradients.after" | "button.primary.bg" | "button.primary.border" | "button.secondary.bg" | "button.secondary.border" | "button.ghost.bg" | "button.ghost.border" | "button.danger.bg" | "button.danger.border" | "button.success.bg" | "button.success.border" | "button.warning.bg" | "button.warning.border" | "accent.primary" | "accent.secondary" | "accent.success" | "accent.warning" | "accent.danger" | "accent.indigo" | "accent.teal" | "accent.cyan" | "accent.mint" | "accent.pink" | "accent.yellow" | "text.glass.primary" | "text.glass.secondary" | "text.glass.muted" | "text.glass.disabled" | "gray.50" | "gray.100" | "gray.200" | "gray.300" | "gray.400" | "gray.500" | "gray.600" | "gray.700" | "gray.800" | "gray.900" | "blue.100" | "blue.500" | "blue.600" | "indigo.100" | "indigo.500" | "indigo.600" | "teal.100" | "teal.500" | "teal.600" | "green.100" | "green.500" | "green.600" | "orange.100" | "orange.500" | "orange.600" | "pink.100" | "pink.500" | "pink.600" | "bg.canvas" | "bg.surface" | "bg.subtle" | "border.default" | "border.hairline" | "colorPalette.bg" | "colorPalette.border" | "colorPalette.ripple" | "colorPalette.subtle.bg" | "colorPalette.subtle.border" | "colorPalette.medium.bg" | "colorPalette.medium.border" | "colorPalette.strong.bg" | "colorPalette.strong.border" | "colorPalette.accent.bg" | "colorPalette.accent.border" | "colorPalette.gradients.before" | "colorPalette.before" | "colorPalette.gradients.after" | "colorPalette.after" | "colorPalette.primary.bg" | "colorPalette.primary.border" | "colorPalette.secondary.bg" | "colorPalette.secondary.border" | "colorPalette.ghost.bg" | "colorPalette.ghost.border" | "colorPalette.danger.bg" | "colorPalette.danger.border" | "colorPalette.success.bg" | "colorPalette.success.border" | "colorPalette.warning.bg" | "colorPalette.warning.border" | "colorPalette.primary" | "colorPalette.secondary" | "colorPalette.success" | "colorPalette.warning" | "colorPalette.danger" | "colorPalette.indigo" | "colorPalette.teal" | "colorPalette.cyan" | "colorPalette.mint" | "colorPalette.pink" | "colorPalette.yellow" | "colorPalette.glass.primary" | "colorPalette.glass.secondary" | "colorPalette.glass.muted" | "colorPalette.muted" | "colorPalette.glass.disabled" | "colorPalette.disabled" | "colorPalette.50" | "colorPalette.100" | "colorPalette.200" | "colorPalette.300" | "colorPalette.400" | "colorPalette.500" | "colorPalette.600" | "colorPalette.700" | "colorPalette.800" | "colorPalette.900" | "colorPalette.canvas" | "colorPalette.surface" | "colorPalette.subtle" | "colorPalette.default" | "colorPalette.hairline"

export type RadiusToken = "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | "roles.button" | "roles.buttonCompact" | "roles.buttonLarge" | "roles.control" | "roles.field" | "roles.fieldLarge" | "roles.card" | "roles.cardLarge" | "roles.sheet" | "roles.modal" | "roles.pill" | "roles.badge" | "glass.xs" | "glass.sm" | "glass.md" | "glass.lg" | "glass.xl" | "glass.2xl" | "glass.3xl" | "glass.full"

export type BlurToken = "glass.sm" | "glass.md" | "glass.lg" | "glass.xl"

export type ShadowToken = "glass.base" | "glass.sm" | "glass.md" | "glass.lg" | "glass.hover"

export type DurationToken = "glass.flow" | "glass.bounce" | "glass.quick" | "glass.instant"

export type EasingToken = "glass.flow" | "glass.bounce" | "glass.spring"

export type SizeToken = "glass.xs" | "glass.sm" | "glass.md" | "glass.lg" | "glass.xl"

export type SpacingToken = "glass.xs" | "glass.sm" | "glass.md" | "glass.lg" | "glass.xl" | "glass.2xl" | "glass.3xl" | "-glass.xs" | "-glass.sm" | "-glass.md" | "-glass.lg" | "-glass.xl" | "-glass.2xl" | "-glass.3xl"

export type FontToken = "sans" | "display" | "mono"

export type FontSizeToken = "caption2" | "caption1" | "footnote" | "subheadline" | "callout" | "body" | "headline" | "title3" | "title2" | "title1" | "largeTitle" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"

export type LineHeightToken = "tight" | "snug" | "normal" | "relaxed" | "loose" | "none"

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