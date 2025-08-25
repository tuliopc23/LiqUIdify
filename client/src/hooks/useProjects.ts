// client/src/hooks/useProjects.ts
import { useState, useEffect } from "react";

interface Project {
  id: number;
  name: string;
  description: string;
  tech_stack: string[];
  github_url?: string;
  live_url?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Project[] = await response.json();

        // Data is now in expected snake_case format
        // Validate that we have the expected fields
        const validatedData = data.map((project) => {
          if (!project.tech_stack || !Array.isArray(project.tech_stack)) {
            console.warn("Project missing or invalid tech_stack:", project);
          }
          return project;
        });

        setProjects(validatedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export type { Project };
