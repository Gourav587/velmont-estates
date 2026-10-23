import React from 'react';
import ServicesSection from '../components/ServicesSection';


const ServicesPage: React.FC = () => {
  return (
    <>
      <div className="section" style={{ background: 'var(--primary)', paddingBottom: '0.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Our <span style={{ color: 'var(--accent)' }}>Expertise</span></h1>
          <p style={{ color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem' }}>
            Comprehensive real estate solutions designed to maximize value and minimize risk for our clients.
          </p>
        </div>
      </div>
      
      <ServicesSection />

      {/* Process Section */}
      <section className="section" style={{ background: 'var(--primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>How We <span style={{ color: 'var(--accent)' }}>Work</span></h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '2rem'
          }}>
            {[
              { step: '01', title: 'Consultation', desc: 'We understand your goals, budget, and location preferences.' },
              { step: '02', title: 'Curated Shortlist', desc: 'Using our network, we provide highly vetted property options.' },
              { step: '03', title: 'Due Diligence', desc: 'We verify all papers and RERA status for ultimate peace of mind.' },
              { step: '04', title: 'Closing & ROI', desc: 'Expert negotiation and after-sale support to ensure growth.' }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '2rem',
                borderLeft: '2px solid var(--accent)',
                background: 'rgba(255,255,255,0.02)'
              }}>
                <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.5rem', opacity: 0.5 }}>{item.step}</span>
                <h3 style={{ margin: '1rem 0' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
