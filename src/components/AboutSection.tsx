import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="section" id="about" style={{ background: 'var(--secondary)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Image Side */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: '30px',
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.1)'
            }}>
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Modern Real Estate" 
                style={{ width: '100%', display: 'block' }}
              />
            </div>
            {/* Stats Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '2rem',
              background: 'var(--accent)',
              padding: '2rem',
              borderRadius: '20px',
              color: 'var(--primary)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              textAlign: 'center'
            }}>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', margin: 0 }}>Triregion</h3>
              <p style={{ fontWeight: 600, margin: 0 }}>Local Experts</p>
            </div>
          </div>

          {/* Text Side */}
          <div>
            <h4 style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem' }}>
              About Us
            </h4>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Redefining Real Estate in the <span style={{ color: 'var(--accent)' }}>Triregion</span> (Pathankot, Gurdaspur, Amritsar)
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
              At Velmont Estates, we don't just sell properties; we build legacies. Specializing in premium estates and luxury living, we provide personalized, data-driven real estate solutions for our elite clientele.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                'Market-Leading Due Diligence',
                'Transparent & Ethical Pricing',
                'Tailored Property Shortlists',
                'Expert Negotiation Support'
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <CheckCircle2 color="var(--accent)" size={24} />
                  <span style={{ fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
