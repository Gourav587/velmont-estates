import { useSearchParams } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import ProjectStatus from '../components/ProjectStatus';
import { useProjects } from '../context/ProjectContext';
import { categories } from '../types/project';

export default function ProjectsPage() {
  const { projects, loading, error } = useProjects();
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('type') || '';
  const city = params.get('city') || '';
  const budget = params.get('budget') || '';
  function filter(key: string, value: string) {
    setParams(current => { const next = new URLSearchParams(current); if (value) next.set(key, value); else next.delete(key); return next; }, { replace: true });
  }
  const cities = ['Amritsar', 'Pathankot', 'Gurdaspur'];
  const results = projects.filter(project =>
    `${project.title} ${project.location}`.toLowerCase().includes(search.toLowerCase()) &&
    (!category || project.category === category) && (!city || project.location.toLowerCase().includes(city.toLowerCase())) &&
    (!budget || (project.price != null && project.price <= Number(budget))));
  return <section className="section container">
    <div className="page-intro"><p className="eyebrow">The portfolio</p><h1>Find your place in <span>Punjab.</span></h1><p>Explore residential, commercial, and plot opportunities across Pathankot, Gurdaspur, and Amritsar.</p></div>
    <div className="property-filters">
      <label>Search<input className="form-input" type="search" placeholder="Property or neighbourhood" value={search} onChange={event => filter('q', event.target.value)} /></label>
      <label>Property type<select className="form-input" value={category} onChange={event => filter('type', event.target.value)}><option value="">All types</option>{categories.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>City<select className="form-input" value={city} onChange={event => filter('city', event.target.value)}><option value="">All cities</option>{cities.map(value => <option key={value}>{value}</option>)}</select></label>
      <label>Maximum budget<select className="form-input" value={budget} onChange={event => filter('budget', event.target.value)}><option value="">Any budget</option><option value="5000000">₹50 lakh</option><option value="10000000">₹1 crore</option><option value="20000000">₹2 crore</option><option value="50000000">₹5 crore</option></select></label>
    </div>
    {budget && <p className="photo-note">Properties with prices on request are excluded from budget results.</p>}
    <ProjectStatus />
    {!loading && !error && <><div className="results-heading"><p role="status">{results.length} {results.length === 1 ? 'property' : 'properties'}</p><button className="btn btn-outline" onClick={() => setParams({})}>Clear filters</button></div>
      {results.length ? <div className="property-grid">{results.map(project => <ProjectCard key={project.id} {...project} />)}</div> : <div className="empty-state"><h2>No properties match yet</h2><p>Try a different location or budget, or contact us for a tailored shortlist.</p><button className="btn btn-primary" onClick={() => setParams({})}>Reset filters</button><a className="btn btn-outline" href="https://wa.me/918284883282">Ask for a shortlist</a></div>}</>}
  </section>;
}
