import { useSearchParams, Link } from 'react-router-dom';
import ContactSection from '../components/ContactSection';
import { useProjects } from '../context/ProjectContext';
import ProjectStatus from '../components/ProjectStatus';
export default function ContactPage() {
  const [params] = useSearchParams();
  const id = params.get('project') || '';
  const { projects, loading, error } = useProjects();
  const project = projects.find(item => item.id === id);
  if (id && (loading || error)) return <section className="container section"><ProjectStatus /></section>;
  return <div><header className="container page-intro" style={{ paddingTop: '3rem' }}><p className="eyebrow">Local guidance</p><h1>Let’s talk property.</h1></header>{id && !project && <p className="container notice">This property is no longer listed. <Link className="text-link" to="/projects">Browse current properties</Link> or send a general enquiry below.</p>}<ContactSection key={project?.id || 'general'} projectId={project?.id} projectTitle={project?.title} /></div>;
}
