import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
const site = 'https://velomtestates.netlify.app';
const pages: Record<string, [string, string]> = {
  '/': ['Real Estate in Pathankot, Gurdaspur & Amritsar', 'Explore residential, commercial, and plot opportunities in Pathankot, Gurdaspur, and Amritsar with Velmont Estates.'],
  '/projects': ['Properties in Punjab', 'Find your next property with location, property type, and budget filters. Ask Velmont Estates for a tailored shortlist.'],
  '/about': ['About Velmont Estates', 'Meet your local real estate partner for Pathankot, Gurdaspur, and Amritsar.'],
  '/services': ['Real Estate Services', 'Property shortlisting, local guidance, due diligence support, and negotiation assistance across the Triregion.'],
  '/contact': ['Contact Velmont Estates', 'Speak with our local team, ask about a property, or arrange a visit in Pathankot, Gurdaspur, or Amritsar.'],
  '/privacy': ['Privacy Notice', 'How Velmont Estates handles your enquiry and contact information.'],
  '/admin': ['Administrator Sign-in', 'Authorized listing management for Velmont Estates.'],
};
export default function PageMetadata() {
  const { pathname } = useLocation();
  const { projects, loading } = useProjects();
  const project = projects.find(item => pathname === `/projects/${encodeURIComponent(item.id)}`);
  const known = !!pages[pathname] || !!project;
  const [title, description] = project ? [project.title, project.description || `${project.category} in ${project.location}. Contact Velmont Estates for details and viewings.`] : pages[pathname] || [loading && pathname.startsWith('/projects/') ? 'Property Details' : 'Page Not Found', 'Explore properties with Velmont Estates.'];
  useEffect(() => {
    document.title = `${title} | Velmont Estates`;
    const update = (selector: string, value: string) => document.querySelector(selector)?.setAttribute('content', value);
    update('meta[name="description"]', description);
    update('meta[property="og:title"]', document.title);
    update('meta[property="og:description"]', description);
    update('meta[property="og:url"]', `${site}${pathname}`);
    update('meta[property="og:image"]', project?.image || `${site}/favicon.png`);
    update('meta[name="twitter:title"]', document.title);
    update('meta[name="twitter:description"]', description);
    update('meta[name="twitter:image"]', project?.image || `${site}/favicon.png`);
    update('meta[name="robots"]', pathname === '/admin' || project?.isIllustrative || !known ? 'noindex, nofollow' : 'index, follow');
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${site}${pathname}`);
  }, [title, description, pathname, project?.image, project?.isIllustrative, known]);
  const structuredData = project && !project.isIllustrative ? { '@context': 'https://schema.org', '@type': 'Place', name: project.title, description, image: project.image, address: project.location, url: `${site}${pathname}` } : pathname === '/' ? { '@context': 'https://schema.org', '@type': 'RealEstateAgent', name: 'Velmont Estates', url: site, telephone: '+91 82848 83282', email: 'velmontestate@gmail.com', areaServed: ['Pathankot', 'Gurdaspur', 'Amritsar'] } : null;
  return structuredData ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }} /> : null;
}
