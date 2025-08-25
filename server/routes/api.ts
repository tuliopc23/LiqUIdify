// server/routes/api.ts
import { Elysia, Context } from 'elysia';
import { ProjectTransformService } from '../services/projectTransformService';
import { validateDatabaseProject } from '../validators/projectValidator';

const api = new Elysia({ prefix: '/api' });

// Mock database function - replace with actual database implementation
async function getProjectsFromDatabase() {
  // This would be replaced with actual database query
  return [
    {
      id: 1,
      name: 'Sample Project',
      description: 'A sample project for testing',
      techStack: '["React", "TypeScript", "Node.js"]',
      githubUrl: 'https://github.com/user/sample-project',
      liveUrl: 'https://sample-project.vercel.app',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-02'),
    }
  ];
}

// GET /api/projects - Fixed implementation with proper case mapping
api.get('/projects', async () => {
  try {
    const projects = await getProjectsFromDatabase();
    
    // Validate database projects
    const validatedProjects = projects.map(project => validateDatabaseProject(project));
    
    // Transform to API format with consistent snake_case fields
    const transformedProjects = validatedProjects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description ?? '',
      tech_stack: project.techStack ? JSON.parse(project.techStack) : [],
      github_url: project.githubUrl ?? undefined,
      live_url: project.liveUrl ?? undefined,
      status: project.status ?? undefined,
      created_at: project.createdAt?.toISOString() ?? undefined,
      updated_at: project.updatedAt?.toISOString() ?? undefined,
    }));

    return transformedProjects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: { 
          code: 'INTERNAL_ERROR', 
          message: 'Failed to fetch projects' 
        } 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
});

// GET /api/github/:owner/:repo/commits - Fixed String(limit) issue
api.get('/github/:owner/:repo/commits', async ({ params, query }) => {
  try {
    const { owner, repo } = params;
    const limit = query.limit ? parseInt(String(query.limit)) : 10;
    
    const headers = {
      'User-Agent': 'HackerFolio/1.0',
      'Accept': 'application/vnd.github.v3+json',
    };

    // Fixed: Ensure String(limit) is properly formatted
    const url = `https://api.github.com/repos/${owner}/${repo}/commits?per_page=${String(limit)}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const commits = await res.json();
    return commits;
  } catch (error) {
    console.error('Error fetching GitHub commits:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: { 
          code: 'GITHUB_API_ERROR', 
          message: 'Failed to fetch commits' 
        } 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
});

export { api };