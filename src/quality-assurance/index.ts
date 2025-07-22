/**
 * Quality Assurance System - Main Entry Point
 * Exports all quality assurance modules for production deployment
 */

export type {
	BuildMetrics,
	DeploymentReport,
	ProductionConfig,
} from "./production-deployment";
// Production Deployment Optimizer
export {
	createOptimizedBuild,
	generateDeploymentReport,
	ProductionDeploymentOptimizer,
	productionDeploymentOptimizer,
	validateDeploymentReadiness,
} from "./production-deployment";
export type { QualityGateConfig, QualityGateResult } from "./quality-gates";
// Quality Gates System
export { QualityGateSystem, qualityGateSystem } from "./quality-gates";
export type {
	ValidationChecklist,
	ValidationResult,
} from "./s-tier-validation";
// S-tier Validation
export {
	createDeploymentChecklist,
	createSignOffDocument,
	generateValidationReport,
	runValidation,
	STierValidator,
	sTierValidator,
} from "./s-tier-validation";

// Convenience exports for easy access
export const runFullQualityAssurance = async () => {
	console.log("🚀 Running full quality assurance pipeline...");

	// Run quality gates
	const gates = await import("./quality-gates");
	const gatesResult = await gates.qualityGateSystem.runQualityGates();

	// Validate deployment readiness
	const deployment = await import("./production-deployment");
	const deploymentReady = await deployment.validateDeploymentReadiness();

	// Run S-tier validation
	const validation = await import("./s-tier-validation");
	const validationResults = await validation.runValidation();
	const validationReport = await validation.generateValidationReport();

	return {
		qualityGates: gatesResult,
		deploymentReady,
		validationResults,
		validationReport,
	};
};

// Default export for easy import
export default {
	runFullQualityAssurance,
};
