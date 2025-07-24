#!/usr/bin/env node

/**
 * Community Metrics Tracker for LiquidUI
 * Tracks adoption metrics (npm downloads, GitHub stars) and celebrates milestones
 */

import { promises as fs } from "node:fs";
import https from "node:https";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CommunityMetricsTracker {
	constructor() {
		this.packageName = "@tuliocunha23/liquidui";
		this.githubRepo = "tuliopc23/LiquidiUI";
		this.metricsFile = path.join(__dirname, "../.community-metrics.json");
		this.milestones = {
			npm: {
				downloads: [100, 500, 1000, 5000, 10_000, 25_000, 50_000, 100_000],
				weeklyDownloads: [10, 50, 100, 500, 1000, 2500, 5000, 10_000],
			},
			github: {
				stars: [10, 25, 50, 100, 250, 500, 1000, 2500, 5000],
				forks: [5, 10, 25, 50, 100, 250, 500],
				contributors: [2, 5, 10, 25, 50, 100],
			},
		};
	}

	async fetchJson(url) {
		return new Promise((resolve, reject) => {
			const options = {
				headers: {
					"User-Agent": "LiquidUI-Metrics-Tracker/1.0",
				},
			};

			https
				.get(url, options, (res) => {
					let data = "";
					res.on("data", (chunk) => (data += chunk));
					res.on("end", () => {
						try {
							resolve(JSON.parse(data));
						} catch (error) {
							reject(error);
						}
					});
				})
				.on("error", reject);
		});
	}

	async getNpmMetrics() {
		try {
			// Get package info
			const packageInfo = await this.fetchJson(
				`https://registry.npmjs.org/${this.packageName}`,
			);

			// Get download stats (last 7 days)
			const downloadStats = await this.fetchJson(
				`https://api.npmjs.org/downloads/point/last-week/${this.packageName}`,
			);

			// Get download stats (all time - approximate using last month * estimated months)
			const monthlyStats = await this.fetchJson(
				`https://api.npmjs.org/downloads/point/last-month/${this.packageName}`,
			);

			return {
				version: packageInfo["dist-tags"].latest,
				weeklyDownloads: downloadStats.downloads || 0,
				monthlyDownloads: monthlyStats.downloads || 0,
				// Rough estimate of total downloads
				totalDownloads:
					(monthlyStats.downloads || 0) *
					this.estimateMonthsSincePublish(packageInfo),
				publishDate: packageInfo.time.created,
				lastUpdate: packageInfo.time.modified,
			};
		} catch (error) {
			console.warn("Failed to fetch npm metrics:", error.message);
			return null;
		}
	}

	estimateMonthsSincePublish(packageInfo) {
		const publishDate = new Date(packageInfo.time.created);
		const now = new Date();
		const diffTime = Math.abs(now - publishDate);
		const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
		return Math.max(1, diffMonths);
	}

	async getGitHubMetrics() {
		try {
			const repoInfo = await this.fetchJson(
				`https://api.github.com/repos/${this.githubRepo}`,
			);

			// Get contributors count
			const contributors = await this.fetchJson(
				`https://api.github.com/repos/${this.githubRepo}/contributors`,
			);

			return {
				stars: repoInfo.stargazers_count,
				forks: repoInfo.forks_count,
				watchers: repoInfo.watchers_count,
				openIssues: repoInfo.open_issues_count,
				contributors: Array.isArray(contributors) ? contributors.length : 0,
				language: repoInfo.language,
				size: repoInfo.size,
				createdAt: repoInfo.created_at,
				updatedAt: repoInfo.updated_at,
			};
		} catch (error) {
			console.warn("Failed to fetch GitHub metrics:", error.message);
			return null;
		}
	}

	async loadPreviousMetrics() {
		try {
			const data = await fs.readFile(this.metricsFile, "utf8");
			return JSON.parse(data);
		} catch {
			return { history: [], lastCheck: null };
		}
	}

	async saveMetrics(metrics) {
		await fs.writeFile(this.metricsFile, JSON.stringify(metrics, null, 2));
	}

	checkMilestones(current, previous) {
		const achievements = [];

		if (!previous) {return achievements;}

		// Check npm milestones
		if (current.npm) {
			// Total downloads milestones
			for (const milestone of this.milestones.npm.downloads) {
				if (
					current.npm.totalDownloads >= milestone &&
					(!previous.npm || previous.npm.totalDownloads < milestone)
				) {
					achievements.push({
						type: "npm",
						metric: "downloads",
						milestone,
						message: `🎉 Milestone: ${milestone.toLocaleString()} total npm downloads!`,
					});
				}
			}

			// Weekly downloads milestones
			for (const milestone of this.milestones.npm.weeklyDownloads) {
				if (
					current.npm.weeklyDownloads >= milestone &&
					(!previous.npm || previous.npm.weeklyDownloads < milestone)
				) {
					achievements.push({
						type: "npm",
						metric: "weeklyDownloads",
						milestone,
						message: `🚀 Milestone: ${milestone.toLocaleString()} weekly npm downloads!`,
					});
				}
			}
		}

		// Check GitHub milestones
		if (current.github) {
			// Stars milestones
			for (const milestone of this.milestones.github.stars) {
				if (
					current.github.stars >= milestone &&
					(!previous.github || previous.github.stars < milestone)
				) {
					achievements.push({
						type: "github",
						metric: "stars",
						milestone,
						message: `⭐ Milestone: ${milestone.toLocaleString()} GitHub stars!`,
					});
				}
			}

			// Forks milestones
			for (const milestone of this.milestones.github.forks) {
				if (
					current.github.forks >= milestone &&
					(!previous.github || previous.github.forks < milestone)
				) {
					achievements.push({
						type: "github",
						metric: "forks",
						milestone,
						message: `🍴 Milestone: ${milestone.toLocaleString()} GitHub forks!`,
					});
				}
			}

			// Contributors milestones
			for (const milestone of this.milestones.github.contributors) {
				if (
					current.github.contributors >= milestone &&
					(!previous.github || previous.github.contributors < milestone)
				) {
					achievements.push({
						type: "github",
						metric: "contributors",
						milestone,
						message: `👥 Milestone: ${milestone.toLocaleString()} contributors!`,
					});
				}
			}
		}

		return achievements;
	}

	generateReport(current, achievements) {
		const report = [];

		report.push("# 📊 LiquidUI Community Metrics Report");
		report.push("");
		report.push(`**Generated:** ${new Date().toISOString()}`);
		report.push("");

		if (current.npm) {
			report.push("## 📦 NPM Metrics");
			report.push(`- **Version:** ${current.npm.version}`);
			report.push(
				`- **Weekly Downloads:** ${current.npm.weeklyDownloads.toLocaleString()}`,
			);
			report.push(
				`- **Monthly Downloads:** ${current.npm.monthlyDownloads.toLocaleString()}`,
			);
			report.push(
				`- **Total Downloads (est.):** ${current.npm.totalDownloads.toLocaleString()}`,
			);
			report.push("");
		}

		if (current.github) {
			report.push("## ⭐ GitHub Metrics");
			report.push(`- **Stars:** ${current.github.stars.toLocaleString()}`);
			report.push(`- **Forks:** ${current.github.forks.toLocaleString()}`);
			report.push(
				`- **Watchers:** ${current.github.watchers.toLocaleString()}`,
			);
			report.push(
				`- **Contributors:** ${current.github.contributors.toLocaleString()}`,
			);
			report.push(
				`- **Open Issues:** ${current.github.openIssues.toLocaleString()}`,
			);
			report.push("");
		}

		if (achievements.length > 0) {
			report.push("## 🎉 New Milestones Achieved!");
			report.push("");
			for (const achievement of achievements) {
				report.push(`- ${achievement.message}`);
			}
			report.push("");
		}

		report.push("## 📈 Growth Trends");
		report.push("");
		report.push("_Trend analysis available after multiple metric collections_");
		report.push("");

		return report.join("\n");
	}

	async run() {
		console.log("🔍 Fetching community metrics...");

		try {
			// Load previous metrics
			const previousData = await this.loadPreviousMetrics();
			const previousMetrics =
				previousData.history.length > 0
					? previousData.history.at(-1)
					: null;

			// Fetch current metrics
			const [npmMetrics, githubMetrics] = await Promise.all([
				this.getNpmMetrics(),
				this.getGitHubMetrics(),
			]);

			const currentMetrics = {
				timestamp: new Date().toISOString(),
				npm: npmMetrics,
				github: githubMetrics,
			};

			// Check for milestones
			const achievements = this.checkMilestones(
				currentMetrics,
				previousMetrics,
			);

			// Save metrics
			const newData = {
				lastCheck: currentMetrics.timestamp,
				history: [...previousData.history, currentMetrics].slice(-50), // Keep last 50 entries
			};

			await this.saveMetrics(newData);

			// Generate report
			const report = this.generateReport(currentMetrics, achievements);
			console.log("\n" + report);

			// Save report to file
			const reportFile = path.join(__dirname, "../community-metrics-report.md");
			await fs.writeFile(reportFile, report);

			if (achievements.length > 0) {
				console.log(
					"\n🎊 NEW MILESTONES ACHIEVED! Consider sharing the good news:",
				);
				for (const achievement of achievements) {
					console.log(`   ${achievement.message}`);
				}
				console.log("\n   Consider posting about these achievements on:");
				console.log("   - GitHub Discussions");
				console.log("   - Discord (when available)");
				console.log("   - Twitter/Social Media");
				console.log("   - Project README updates");
			}

			console.log("\n✅ Metrics tracking complete!");
			console.log(`📄 Report saved to: ${reportFile}`);
		} catch (error) {
			console.error("❌ Failed to track metrics:", error.message);
			process.exit(1);
		}
	}
}

// Run the tracker
if (import.meta.url === `file://${process.argv[1]}`) {
	const tracker = new CommunityMetricsTracker();
	tracker.run();
}

export default CommunityMetricsTracker;
