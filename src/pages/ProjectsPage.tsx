import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';

const ProjectsPage: React.FC = () => {
  const { projects } = useProjects();

  return (
    <div className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Our <span style={{ color: 'var(--accent)' }}>Projects</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Explore our curated selection of premium residential and commercial opportunities in the Triregion (Pathankot, Gurdaspur, Amritsar).
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
