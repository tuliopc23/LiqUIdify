// server/validators/projectValidator.ts
import { z } from 'zod';

const ProjectDatabaseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().optional(),
  techStack: z.string().optional(),
  githubUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  status: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

const ProjectAPISchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  tech_stack: z.array(z.string()),
  github_url: z.string().url().optional(),
  live_url: z.string().url().optional(),
  status: z.string().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

export const validateDatabaseProject = (project: unknown) => 
  ProjectDatabaseSchema.parse(project);

export const validateAPIProject = (project: unknown) => 
  ProjectAPISchema.parse(project);

export { ProjectDatabaseSchema, ProjectAPISchema };