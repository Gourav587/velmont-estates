import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  description?: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Amritsar Green Heights',
    location: 'Ranjit Avenue, Amritsar',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Premium luxury apartments with modern amenities.'
  },
  {
    id: '2',
    title: 'Pathankot Business Hub',
    location: 'Dalhousie Road, Pathankot',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Prime business hub in the heart of Zirakpur.'
  },
  {
    id: '3',
    title: 'Gurdaspur Royal Estates',
    location: 'Tibber Road, Gurdaspur',
    category: 'Luxury Plots',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fee74a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Exclusive plots for custom luxury homes.'
  }
];

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('velmont_projects');
      return saved ? JSON.parse(saved) : DEFAULT_PROJECTS;
    } catch (e) {
      console.error('Failed to parse projects from localStorage', e);
      return DEFAULT_PROJECTS;
    }
  });

  useEffect(() => {
    localStorage.setItem('velmont_projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects([...projects, newProject]);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, updateProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within a ProjectProvider');
  return context;
};
