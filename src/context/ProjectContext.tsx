/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Project } from '../types/project';
export type { Project } from '../types/project';

interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  error: string;
  refresh: () => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (id: string, project: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);
async function request(path = '', options?: RequestInit) {
  const response = await fetch(`/api/projects${path}`, { ...options, credentials: 'same-origin', headers: { 'Content-Type': 'application/json' } });
  if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('Listings are temporarily unavailable. Please try again.');
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || 'Unable to save your changes.');
  return body;
}
export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setProjects(await request()); }
    catch (error) { setError(error instanceof Error ? error.message : 'Unable to load listings.'); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => { void refresh(); }, [refresh]);
  const addProject = async (project: Omit<Project, 'id'>) => {
    const saved = await request('', { method: 'POST', body: JSON.stringify(project) });
    setProjects(current => [saved, ...current]);
  };
  const updateProject = async (id: string, project: Omit<Project, 'id'>) => {
    const saved = await request(`?id=${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(project) });
    setProjects(current => current.map(item => item.id === id ? saved : item));
  };
  const deleteProject = async (id: string) => {
    await request(`?id=${encodeURIComponent(id)}`, { method: 'DELETE', body: '{}' });
    setProjects(current => current.filter(item => item.id !== id));
  };
  return <ProjectContext.Provider value={{ projects, loading, error, refresh, addProject, updateProject, deleteProject }}>{children}</ProjectContext.Provider>;
}
export function useProjects() {
  const context = useContext(ProjectContext);
  if (!context) throw new Error('useProjects must be used within ProjectProvider');
  return context;
}
