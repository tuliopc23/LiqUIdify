# theming Specification Delta

## ADDED Requirements

### Requirement: WWDC 2025 Liquid Glass Lensing Effects
The design system SHALL provide lensing effect tokens that implement Apple's WWDC 2025 Liquid Glass optical properties for light refraction and edge highlights.

- Tokens MUST include colors.glass.lensing.edgeHighlight (P3 + sRGB fallback)
- Tokens MUST include colors.glass.lensing.refraction (gradient for optical distortion)
- Tokens MUST include colors.glass.lensing.opticalDepth (multi-layer depth gradients)
- All lensing tokens MUST include _p3 variants using color(display-p3 ...) syntax
- Edge highlights MUST use inset box-shadow positioned at top edge (0 1px)
- Refraction gradients MUST use backdrop-filter with hue-rotate for color shifting

#### Scenario: Apply lensing to glass surface
- **WHEN** a component uses colors.glass.lensing.edgeHighlight
- **THEN** a subtle top-edge glow appears with P3 enhanced vibrancy on capable displays

#### Scenario: Multi-layer optical depth
- **WHEN** colors.glass.lensing.opticalDepth is applied with ::before and ::after
- **THEN** the surface exhibits layered depth with light refraction similar to physical glass

### Requirement: Frostiness Material Properties
The design system SHALL provide frostiness tokens distinct from blur that implement opacity gradients and texture for frosted glass appearance per WWDC 2025 specifications.

- Tokens MUST include colors.glass.frost.light (opacity: 0.03-0.06)
- Tokens MUST include colors.glass.frost.medium (opacity: 0.08-0.12)
- Tokens MUST include colors.glass.frost.heavy (opacity: 0.15-0.22)
- Frost tokens MUST use radial or linear gradients for non-uniform opacity
- Frost effects MUST layer with blur tokens to create authentic frosted glass
- Frost overlays MUST use ::after pseudo-element to avoid interfering with lensing

#### Scenario: Apply frosted glass effect
- **WHEN** colors.glass.frost.medium is combined with blurs.glass.md
- **THEN** the surface exhibits non-uniform frosted appearance distinct from uniform blur

#### Scenario: Heavy frost on modal backdrop
- **WHEN** modal backdrop uses colors.glass.frost.heavy
- **THEN** background content is obscured with authentic frosted glass texture

### Requirement: Motion-Responsive Glass Properties
The design system SHALL provide motion-responsive tokens that enable dynamic highlights and reflections based on device motion per WWDC 2025 interactive glass specifications.

- Tokens MUST include colors.glass.motion.tiltHighlight (CSS custom property driven)
- Tokens MUST include colors.glass.motion.reflectionAngle (transform-based)
- Tokens MUST include colors.glass.motion.dynamicGlow (animation keyframe)
- Motion effects MUST respect prefers-reduced-motion: reduce
- Motion properties MUST use CSS custom properties for runtime JS updates
- Fallback static highlights MUST be provided for reduced-motion preference

#### Scenario: Device tilt creates highlight
- **WHEN** device orientation changes and motion is not reduced
- **THEN** glass surface highlights dynamically shift using CSS custom properties

#### Scenario: Reduced motion fallback
- **WHEN** user has prefers-reduced-motion: reduce enabled
- **THEN** static highlight tokens are used instead of motion-responsive properties

### Requirement: Adaptive Contrast and Context-Aware Vibrancy
The design system SHALL provide adaptive contrast tokens that automatically adjust tint and opacity based on background context per WWDC 2025 legibility specifications.

- Tokens MUST include colors.glass.adaptive.contextTint (color-mix with background)
- Tokens MUST include colors.glass.adaptive.legibilityBoost (contrast enhancement)
- Adaptive tokens MUST use color-mix() to derive from background colors
- Contrast boost MUST provide 1.5x minimum enhancement for low-contrast scenarios
- Vibrancy levels MUST auto-adjust when background luminance changes

#### Scenario: Light background increases vibrancy
- **WHEN** glass element is placed over light background (luminance > 0.8)
- **THEN** contextTint darkens and vibrancy increases for legibility

#### Scenario: Dark background reduces opacity
- **WHEN** glass element is placed over dark background (luminance < 0.2)
- **THEN** contextTint lightens and base opacity reduces for visual balance

### Requirement: GPU-Optimized Performance Tokens
The design system SHALL provide performance optimization tokens for GPU-accelerated rendering of glass effects per WWDC 2025 performance guidelines.

- Tokens MUST include performance.willChange.glass preset
- Tokens MUST include performance.transform.gpuAccel (translate3d(0,0,0))
- Tokens MUST include performance.isolation.layer (isolation: isolate)
- GPU optimization MUST be applied to all glass components by default
- Isolation layers MUST be used for multi-layer glass effects (::before, ::after)
- will-change MUST be limited to transform, opacity, backdrop-filter only

#### Scenario: Glass component renders with GPU acceleration
- **WHEN** liquid-glass recipe is applied to an element
- **THEN** will-change and transform3d properties ensure GPU layer promotion

#### Scenario: Multi-layer isolation prevents repaint
- **WHEN** glass effect uses ::before and ::after pseudo-elements
- **THEN** isolation: isolate prevents unnecessary parent repaints

## MODIFIED Requirements

### Requirement: Material Tiers with P3 Vibrancy Support
Materials SHALL provide enhanced P3 color space support for all vibrancy tiers per WWDC 2025 specifications.

- All existing material tokens (ultraThin, thin, regular, thick) MUST include _p3 variants
- P3 variants MUST use color(display-p3 ...) syntax with wider gamut
- P3 vibrancy MUST be 20-30% more saturated than sRGB fallbacks
- Material vibrancy overlays (overlayLight, overlayDark) MUST use P3 gradients
- Documentation MUST explain P3 vs sRGB vibrancy differences

#### Scenario: P3 display shows enhanced vibrancy
- **WHEN** user views on P3-capable display
- **THEN** materials render with wider color gamut and enhanced saturation per P3 tokens

#### Scenario: sRGB fallback on standard displays
- **WHEN** user views on sRGB-only display
- **THEN** materials render with standard tokens without visual degradation
