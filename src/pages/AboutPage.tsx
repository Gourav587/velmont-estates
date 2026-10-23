import React from 'react';
import AboutSection from '../components/AboutSection';
import { Target, Eye, ShieldCheck } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="section" style={{ background: 'var(--primary)', paddingBottom: '0.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>About <span style={{ color: 'var(--accent)' }}>Velmont Estates</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Built on trust, transparency, and a deep understanding of the Triregion (Pathankot, Gurdaspur, Amritsar) real estate market.
          </p>
        </div>
      </div>

      <AboutSection />

      <section className="section">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
            gap: '3rem'
          }}>
            <div style={cardStyle}>
              <div style={iconBoxStyle}><Target size={32} /></div>
              <h3>Our Mission</h3>
              <p style={{ color: 'var(--text-muted)' }}>To empower investors with high-yield opportunities and help families find their perfect home through expert guidance and ethical practices.</p>
            </div>
            <div style={cardStyle}>
              <div style={iconBoxStyle}><Eye size={32} /></div>
              <h3>Our Vision</h3>
              <p style={{ color: 'var(--text-muted)' }}>To be the most trusted name in real estate across Punjab and Haryana, known for our integrity and boutique investment solutions.</p>
            </div>
            <div style={cardStyle}>
              <div style={iconBoxStyle}><ShieldCheck size={32} /></div>
              <h3>Our Values</h3>
              <p style={{ color: 'var(--text-muted)' }}>Transparency, deep local expertise, and a client-first approach guide every interaction we have at Velmont Estates.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const cardStyle = {
  padding: '3rem',
  background: 'var(--secondary)',
  borderRadius: '24px',
  textAlign: 'center' as const,
  border: '1px solid rgba(255,255,255,0.05)'
};

const iconBoxStyle = {
  color: 'var(--accent)',
  marginBottom: '1.5rem',
  display: 'flex',
  justifyContent: 'center'
};

export default AboutPage;
