import { Link, useParams } from 'react-router-dom';
import { MapPin, ArrowLeft, MessageCircle } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { formatPrice } from '../types/project';
import ProjectStatus from '../components/ProjectStatus';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const { projects, loading, error } = useProjects();
  const project = projects.find(item => item.id === id);
  if (loading || error) return <section className="container section"><ProjectStatus /></section>;
  if (!project) return <section className="container section empty-state"><h1>Property not found</h1><p>This property may have been removed. Explore the current portfolio or ask our team for help.</p><Link to="/projects" className="btn btn-primary">Browse properties</Link></section>;
  const photos = [...new Set([project.image, ...(project.gallery || [])])];
  const enquiry = `I'd like to arrange a visit to ${project.title} in ${project.location}.`;
  return <article className="container section property-detail">
    <Link to="/projects" className="back-link"><ArrowLeft size={16} /> Back to properties</Link>
    <header className="detail-header"><div><p className="eyebrow">{project.category}</p><h1>{project.title}</h1><p className="location"><MapPin size={18} />{project.location}</p></div><p className="detail-price">{formatPrice(project.price)}</p></header>
    <img className="detail-cover" src={project.image} alt={project.isIllustrative ? `Illustrative photo for ${project.title}` : project.title} width={1200} height={720} />
    {project.isIllustrative && <p className="photo-note">This is an illustrative listing with stock photography. Contact our team to confirm real property photos, pricing, and availability.</p>}
    <div className="detail-columns"><section><h2>About this property</h2><p className="property-description">{project.description || 'Contact our team for a detailed property brief.'}</p><dl className="property-facts"><div><dt>Area</dt><dd>{project.area || 'On request'}</dd></div><div><dt>Bedrooms</dt><dd>{project.bedrooms ?? 'On request'}</dd></div><div><dt>Availability</dt><dd>{project.status || 'Enquire for availability'}</dd></div><div><dt>RERA details</dt><dd>{project.rera || 'Ask our team to confirm applicable registration details.'}</dd></div></dl><a className="text-link" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.location)}`} target="_blank" rel="noopener noreferrer">Explore the neighbourhood on Google Maps</a></section>
    <aside className="enquiry-panel"><p className="eyebrow">Take the next step</p><h2>See it for yourself.</h2><p>Ask for the full details or arrange a visit with our local team.</p><Link className="btn btn-primary" to={`/contact?project=${encodeURIComponent(project.id)}#contact`}>Schedule a visit</Link><a className="btn btn-outline" href={`https://wa.me/918284883282?text=${encodeURIComponent(enquiry)}`}><MessageCircle size={18} /> Enquire on WhatsApp</a><a className="text-link" href="tel:+918284883282">Call +91 82848 83282</a></aside></div>
    {photos.length > 1 && <section className="section"><h2>Property gallery</h2><div className="gallery-grid">{photos.slice(1).map((photo, index) => <a key={photo} href={photo} target="_blank" rel="noopener noreferrer" aria-label={`Open photo ${index + 2} of ${project.title}`}><img src={photo} alt={`${project.title}, photo ${index + 2}`} loading="lazy" decoding="async" width={800} height={600} /></a>)}</div></section>}
  </article>;
}
