# Build System Specification Delta

## ADDED Requirements

### Requirement: CSS Validation Script
The build system SHALL provide a CSS validation script that verifies the integrity of generated CSS before publishing.

#### Scenario: CSS validation script execution
- **WHEN** `bun run check:css-layers` is executed
- **THEN** the script SHALL validate that `libs/components/dist/liquidify.css` exists
- **AND** the CSS SHALL contain `@layer reset,base,tokens,recipes,utilities`
- **AND** the CSS SHALL contain `--made-with-panda` token
- **AND** the script SHALL exit with code 0 on success or code 1 on failure

#### Scenario: Publish workflow validation
- **WHEN** `prepublishOnly` script is executed
- **THEN** CSS validation SHALL be included in the workflow
- **AND** publish SHALL fail if CSS validation fails
- **AND** all validation steps SHALL complete successfully before publish
