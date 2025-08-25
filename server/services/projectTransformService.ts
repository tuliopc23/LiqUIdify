// server/services/projectTransformService.ts

/**
 * Data transformation service for API projects case mapping
 * Handles conversions between camelCase database fields and snake_case API responses
 */

interface ProjectDatabaseRow {
  id: number;
  name: string;
  description?: string;
  techStack?: string; // JSON stringified array
  githubUrl?: string;
  liveUrl?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectAPIResponse {
  id: number;
  name: string;
  description: string;
  tech_stack: string[]; // Parsed JSON array
  github_url?: string;
  live_url?: string;
  status?: string;
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
}

export class ProjectTransformService {
  /**
   * Transform database row to API response format
   * Converts camelCase to snake_case and handles data type transformations
   */
  static transformToAPIFormat(project: ProjectDatabaseRow): ProjectAPIResponse {
    return {
      id: project.id,
      name: project.name,
      description: project.description ?? '',
      tech_stack: this.parseTechStack(project.techStack),
      github_url: project.githubUrl ?? undefined,
      live_url: project.liveUrl ?? undefined,
      status: project.status ?? undefined,
      created_at: project.createdAt?.toISOString() ?? undefined,
      updated_at: project.updatedAt?.toISOString() ?? undefined,
    };
  }

  /**
   * Parse and validate tech stack JSON string
   * Returns empty array if parsing fails
   */
  private static parseTechStack(techStack?: string): string[] {
    if (!techStack) return [];
    
    try {
      const parsed = JSON.parse(techStack);
      return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : [];
    } catch (error) {
      console.warn('Failed to parse tech stack:', error);
      return [];
    }
  }

  /**
   * Transform API format back to database format
   * For POST/PUT operations
   */
  static transformToDatabaseFormat(apiProject: Partial<ProjectAPIResponse>): Partial<ProjectDatabaseRow> {
    return {
      id: apiProject.id,
      name: apiProject.name,
      description: apiProject.description,
      techStack: apiProject.tech_stack ? JSON.stringify(apiProject.tech_stack) : undefined,
      githubUrl: apiProject.github_url,
      liveUrl: apiProject.live_url,
      status: apiProject.status,
      createdAt: apiProject.created_at ? new Date(apiProject.created_at) : undefined,
      updatedAt: apiProject.updated_at ? new Date(apiProject.updated_at) : undefined,
    };
  }
}

export type { ProjectDatabaseRow, ProjectAPIResponse };