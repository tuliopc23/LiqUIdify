# Documentation Specification Deltas

## ADDED Requirements

### Requirement: Apple HIG Compliance Messaging
The README SHALL prominently communicate 100% Apple Human Interface Guidelines compliance as the primary value proposition.

- Hero section MUST include "100% Apple HIG Compliant" in headline or first sentence
- Badge section MUST include Apple HIG compliance badge
- Features section MUST lead with HIG compliance before other features
- Technical specifications MUST reference iOS 17/macOS 14 design standards
- All design token values MUST be verifiable against panda.config.ts

#### Scenario: Developer searches for Apple-compliant React library
- **WHEN** a developer lands on the GitHub repository
- **THEN** they immediately see "100% Apple HIG Compliant" messaging in hero
- **AND** understand this differentiates from Material UI/Chakra UI
- **AND** can verify claims through linked design system documentation

#### Scenario: Enterprise team evaluates production readiness
- **WHEN** an engineering manager reviews the README
- **THEN** they see clear evidence of Apple HIG compliance
- **AND** find specific calibration details (iOS 17 shadows, 44px touch targets)
- **AND** gain confidence in production suitability

### Requirement: Production-Ready Positioning
The README SHALL communicate enterprise-grade quality and battle-tested reliability.

- Hero description MUST include "production-ready" or equivalent messaging
- Features section MUST include dedicated "Production-Ready" item
- README MUST provide bundle size metrics from actual builds
- README MUST reference accessibility compliance (WCAG 2.1 AA)
- README SHOULD include performance benchmarks if available

#### Scenario: CTO evaluates library for product redesign
- **WHEN** a technical decision-maker reviews the README
- **THEN** they find clear production-ready indicators
- **AND** see bundle size impact (tree-shaking metrics)
- **AND** understand accessibility guarantees
- **AND** feel confident recommending to engineering team

### Requirement: Visual Hierarchy & Scannability
The README SHALL be optimized for quick comprehension through visual structure.

- Sections MUST use emoji markers sparingly and consistently
- Code examples MUST include syntax highlighting
- Tables MUST be used for comparison data (vs competitors, component lists)
- Links MUST be clearly differentiated (docs vs repo vs npm)
- Long sections MUST include table of contents
- Critical information MUST appear above the fold (before scroll)

#### Scenario: Developer quickly evaluates library fit
- **WHEN** a developer speed-reads the README
- **THEN** they can identify key features in < 30 seconds
- **AND** locate installation instructions immediately
- **AND** understand primary use cases
- **AND** find links to docs without scrolling

### Requirement: Accurate Technical Specifications
The README SHALL contain only verifiable technical claims matching actual implementation.

- Border radius values MUST match panda.config.ts roles tokens exactly
- Animation durations MUST match updated duration tokens (0.15s, 0.3s, 0.5s, 0.6s)
- Shadow elevation levels MUST reference 6-level system (0dp through 24dp)
- Touch target minimums MUST state 44px (Apple HIG requirement)
- Component count MUST be accurate (48 total)
- Bundle size metrics MUST be measured from dist/ output

#### Scenario: Technical reviewer verifies README accuracy
- **WHEN** a senior engineer cross-checks README against source code
- **THEN** all technical values match implementation
- **AND** no exaggerated or unverifiable claims exist
- **AND** code examples run without modification

#### Scenario: Documented border radius matches implementation
- **WHEN** README lists border radius role values
- **THEN** card radius shows 16px (not outdated 20px)
- **AND** control radius shows 10px (not outdated 14px)
- **AND** field radius shows 12px (not outdated 14px)
- **AND** values match panda.config.ts:1431-1441 exactly

### Requirement: Competitive Differentiation
The README SHALL clearly articulate advantages over established alternatives.

- README MUST include "Why LiqUIdify?" comparison section
- Comparison MUST cover Material UI, Chakra UI, and Radix UI
- Tone MUST remain respectful while highlighting unique strengths
- Differentiators MUST include: Apple HIG compliance, iOS 17 calibration, animation system, elevation system
- README SHOULD include decision guide ("Choose LiqUIdify if...")

#### Scenario: Developer choosing between component libraries
- **WHEN** a developer compares LiqUIdify to Material UI
- **THEN** they clearly understand LiqUIdify is Apple HIG-focused
- **AND** see specific advantages (calibrated animations, shadows, touch targets)
- **AND** understand trade-offs (Apple aesthetic vs Material Design)
- **AND** can make informed decision

### Requirement: Prominent Documentation Links
The README SHALL feature website and documentation prominently for discoverability.

- Hero section MUST include website link (https://useliquidify.dev)
- Hero section MUST include docs link (https://docs.useliquidify.dev)
- Links MUST appear before "Features" section (above the fold)
- Quick start MUST reference docs for advanced usage
- Every major section SHOULD link to relevant docs pages
- Footer resources section MUST feature website/docs first

#### Scenario: New user seeks comprehensive examples
- **WHEN** a user wants to see all components
- **THEN** they find website link within first 3 sections
- **AND** can navigate to docs without scrolling to footer
- **AND** understand docs contain complete API reference

### Requirement: SEO-Optimized Metadata
The package.json SHALL include keywords that maximize npm and GitHub discoverability.

- Keywords MUST include: "apple-hig", "apple-design-system", "ios-components", "macos-ui"
- Keywords MUST include: "human-interface-guidelines", "ios-17", "macos-14"
- Keywords MUST include: "design-tokens", "elevation-system", "reduced-motion"
- Keywords MUST include: "wcag-aa-compliant", "accessibility-first"
- Description MUST mention "100% Apple HIG Compliant" and "iOS 17/macOS 14 Calibrated"
- Homepage URL MUST be https://useliquidify.dev (not www subdomain)

#### Scenario: Developer searches npm for Apple components
- **WHEN** someone searches "apple components react"
- **THEN** liquidify-react appears in top results
- **AND** description immediately conveys Apple HIG focus

#### Scenario: Developer searches GitHub for iOS design system
- **WHEN** someone searches "ios design system react"
- **THEN** repository appears in results via topics/keywords
- **AND** description attracts click-through

## MODIFIED Requirements

### Requirement: Installation Instructions Simplicity
The README SHALL provide frictionless copy-paste installation with minimal steps.

**PREVIOUS**: Installation section showed Bun and npm separately with peer dependencies listed

**UPDATED**:
- Quick start MUST show single-command installation
- Peer dependencies MUST be included in install command (one-liner)
- Bun command should be featured first (recommended)
- npm/yarn/pnpm alternatives should be collapsible or secondary
- CSS import requirement MUST be explained with visual callout
- Zero-config messaging MUST emphasize immediate usability

#### Scenario: Developer wants to try library quickly
- **WHEN** a developer reaches "Quick Start"
- **THEN** they copy one command and have everything installed
- **AND** copy one CSS import and have styles working
- **AND** copy one component example and see results
- **AND** go from zero to working demo in < 2 minutes

### Requirement: Component List Organization
The README SHALL present all 48 components with improved categorization and utility.

**PREVIOUS**: Components listed in table by category without links or popularity indicators

**UPDATED**:
- Table MUST show component count per category
- Component names MUST link to docs pages
- Popular components MAY be marked with ⭐ or badge
- Categories MUST be: Forms & Inputs, Navigation & Layout, Feedback & Display, Advanced
- Each category MUST have accurate count (verify against implementation)
- Table MUST include "View all components →" CTA linking to docs

#### Scenario: Developer searches for specific component type
- **WHEN** a developer looks for form components
- **THEN** they quickly scan "Forms & Inputs" category (14 components)
- **AND** click component name to see docs
- **AND** understand at a glance what's available

### Requirement: Architecture Section Technical Depth
The README SHALL explain design system architecture with specific implementation details.

**PREVIOUS**: Architecture section was high-level without design token specifics

**UPDATED**:
- Architecture MUST include "Design Tokens" subsection
- Architecture MUST include "Animation System" subsection with timing values
- Architecture MUST include "Elevation System" subsection with 6 levels
- Architecture MUST include "Touch Targets" subsection with 44px minimum
- Architecture MUST include "Motion Accessibility" subsection
- Border radius values MUST reflect iOS 17 updates (card: 16px, control: 10px, field: 12px)
- All values MUST be verifiable in panda.config.ts

#### Scenario: Engineer evaluates design system quality
- **WHEN** a senior engineer reviews architecture
- **THEN** they see detailed token system explanation
- **AND** understand animation timing is iOS 17 calibrated
- **AND** verify 44px touch targets meet Apple HIG
- **AND** confirm elevation system matches iOS shadow standards
- **AND** gain confidence in design system rigor

## REMOVED Requirements

None - This is additive documentation work with no deletions of existing functional content.

## Implementation Constraints

### Voice & Tone Standards
- Technical accuracy over marketing fluff
- Confident without arrogance
- Developer-first language (avoid buzzwords)
- Respectful of competing libraries
- Apple-quality polish in writing style

### Formatting Standards
- Emoji usage: 1 per major section maximum
- Code blocks: Always specify language for syntax highlighting
- Links: Use descriptive text, not bare URLs
- Tables: Aligned columns with header row
- Headings: Logical hierarchy (h2 for sections, h3 for subsections)
- Line length: Aim for < 100 characters for readability

### Accuracy Validation
- All technical values cross-checked against source code
- Bundle sizes measured from actual dist/ output
- Component count verified against exports
- Animation timings confirmed in panda.config.ts
- Border radius values confirmed in panda.config.ts roles tokens

### Link Hygiene
- All URLs tested for accessibility
- Prefer https:// over http://
- Use canonical URLs (https://useliquidify.dev not www)
- Update any stale URLs from development
- Ensure GitHub links point to correct repo/branch
