import { useProjects } from '../context/ProjectContext';
export default function ProjectStatus() {
  const { loading, error, refresh } = useProjects();
  if (error) return <div className="empty-state" role="alert"><h2>Unable to load properties</h2><p>{error}</p><button className="btn btn-primary" onClick={() => void refresh()}>Try again</button><a href="tel:+918284883282" className="btn btn-outline">Call our team</a></div>;
  if (loading) return <div className="property-grid" role="status" aria-label="Loading properties">{[1, 2, 3].map(id => <div className="property-skeleton" key={id}><div /><p>Loading property…</p></div>)}</div>;
  return null;
}
