import React from 'react';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import { useProjects } from '../context/ProjectContext';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      <Hero />
      
      {/* Featured Projects Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '0.5rem' }}>Portfolio</h4>
              <h2 style={{ fontSize: '2.5rem' }}>Featured <span style={{ color: 'var(--accent)' }}>Projects</span></h2>
            </div>
            <Link to="/projects" className="btn" style={{ border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              View All Projects
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} />
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
