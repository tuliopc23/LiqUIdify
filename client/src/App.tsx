// client/src/App.tsx
import React from "react";
import { useProjects } from "./hooks/useProjects";
import ProjectCard from "./components/ProjectCard";

function App() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return (
      <div className="min-h-screen bg-liquid-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-liquid-accent mx-auto"></div>
          <p className="mt-4 text-liquid-secondary">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-liquid-bg flex items-center justify-center">
        <div className="text-center">
          <div className="bg-liquid-accent border border-liquid-accent text-liquid-accent px-4 py-3 rounded">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-liquid-bg">
      <header className="bg-liquid-bg shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-liquid-secondary">HackerFolio</h1>
          <p className="mt-2 text-liquid-secondary">Showcasing projects with proper API case mapping</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-semibold text-liquid-secondary mb-6">Projects</h2>
          {projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-liquid-secondary">No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="bg-liquid-bg border-t border-liquid-grey mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-liquid-secondary text-sm">
            HackerFolio - API Projects Case Mapping Implementation
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
