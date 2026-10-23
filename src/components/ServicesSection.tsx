import React from 'react';
import { Home, Briefcase, LandPlot, Key, TrendingUp, Handshake } from 'lucide-react';

const services = [
  {
    icon: <Home size={32} />,
    title: 'Residential',
    description: 'Expert guidance in finding your dream home, from luxury apartments to independent villas.'
  },
  {
    icon: <Briefcase size={32} />,
    title: 'Commercial',
    description: 'Strategically located office spaces, retail showrooms, and industrial properties.'
  },
  {
    icon: <LandPlot size={32} />,
    title: 'Plots & Land',
    description: 'Curated plots for investment or development in the fastest-growing sectors.'
  },
  {
    icon: <Key size={32} />,
    title: 'Rental & Leasing',
    description: 'End-to-end support for tenants and landlords in securing the best deals.'
  },
  {
    icon: <TrendingUp size={32} />,
    title: 'Investment Advisory',
    description: 'Data-driven insights to maximize your ROI in the real estate market.'
  },
  {
    icon: <Handshake size={32} />,
    title: 'Franchise Expert',
    description: 'Helping businesses expand through strategic franchise location scouting and due diligence.'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="section" id="services">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Our <span style={{ color: 'var(--accent)' }}>Services</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            We provide a comprehensive suite of real estate services tailored to meet the unique needs of every investor and home buyer.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '2rem'
        }}>
          {services.map((service, index) => (
            <div key={index} style={{
              padding: '2.5rem',
              background: 'var(--secondary)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.05)',
              transition: 'all 0.3s ease'
            }} className="service-card">
              <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}>
                {service.icon}
              </div>
              <h3 style={{ marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .service-card:hover {
          background: var(--primary);
          border-color: var(--accent);
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
