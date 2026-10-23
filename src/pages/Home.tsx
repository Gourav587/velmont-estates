import React from 'react';
import Hero from '../components/Hero';
import ProjectStatus from '../components/ProjectStatus';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { projects, loading, error } = useProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="section">
        <div className="container">
          <div className="results-heading" style={{ marginBottom: '3rem' }}>
            <div>
              <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '0.5rem' }}>Portfolio</h4>
              <h2 style={{ fontSize: '2.5rem' }}>Featured <span style={{ color: 'var(--accent)' }}>Projects</span></h2>
            </div>
            <Link to="/projects" className="btn" style={{ border: '1px solid var(--border)', color: 'var(--text-main)' }}>
              View All Projects
            </Link>
          </div>

          <ProjectStatus />
          {!loading && !error && projects.length === 0 && <div className="empty-state"><h3>Our next opportunities are on their way.</h3><p>Contact us for a property shortlist tailored to your needs.</p><Link to="/contact" className="btn btn-primary">Request a shortlist</Link></div>}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '2rem'
          }}>
            {!loading && !error && featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
};

export default Home;
