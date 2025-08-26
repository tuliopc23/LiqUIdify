// client/src/components/ProjectCard.tsx
import React from "react";

interface ProjectCardProps {
  project: {
    id: number;
    name: string;
    description: string;
    tech_stack: string[];
    github_url?: string;
    live_url?: string;
    status?: string;
    created_at?: string;
    updated_at?: string;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="project-card bg-liquid-bg rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-liquid-secondary mb-2">
          {project.name}
        </h3>
        <p className="text-liquid-secondary text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {project.tech_stack.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-liquid-secondary mb-2">
            Technologies:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((tech, index) => (
              <span
                key={index}
                className="inline-block bg-liquid-accent text-liquid-accent text-xs px-2 py-1 rounded-full font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 border border-liquid-grey rounded-md text-sm font-medium text-liquid-secondary bg-liquid-bg hover:bg-liquid-bg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </a>
        )}

        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-liquid-text-inverse bg-liquid-accent hover:bg-liquid-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        )}
      </div>

      {project.status && (
        <div className="mt-3 pt-3 border-t border-liquid-grey">
          <span
            className={`inline-block text-xs px-2 py-1 rounded-full font-medium ${
              project.status === "active"
                ? "bg-liquid-accent text-liquid-accent"
                : "bg-liquid-bg text-liquid-secondary"
            }`}
          >
            {project.status}
          </span>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
