import React from 'react';
import { Mail, MessageCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="section" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: 'var(--bg-main)',
      backgroundImage: 'linear-gradient(135deg, var(--bg-main) 0%, var(--secondary) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Graphic - Simplified Version of the Skyscrapers */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: '5%',
        opacity: 0.05,
        pointerEvents: 'none'
      }}>
        <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="50" y="200" width="80" height="200" fill="var(--accent)" />
          <rect x="150" y="100" width="80" height="300" fill="var(--accent)" />
          <rect x="250" y="150" width="80" height="250" fill="var(--accent)" />
          <rect x="350" y="50" width="80" height="350" fill="var(--accent)" />
          <rect x="450" y="180" width="80" height="220" fill="var(--accent)" />
        </svg>
      </div>

      <div className="container">
        <div style={{ maxWidth: '800px' }}>
          <h4 style={{
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            Invest in the Future
          </h4>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            fontFamily: 'var(--font-heading)'
          }}>
            Elevate your <span style={{ color: 'var(--accent)' }}>lifestyle</span> living
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
            marginBottom: '2.5rem',
            maxWidth: '600px'
          }}>
            Expert guidance for residential, commercial, and premium estates across Pathankot, Gurdaspur, and Amritsar — curated by Velmont Estates.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/918284883282"
              className="btn btn-success"
              style={{ padding: '1rem 2rem' }}
            >
              <MessageCircle size={20} />
              WhatsApp
            </a>
            <a
              href="mailto:velmontestate@gmail.com"
              className="btn"
              style={{
                border: '1px solid var(--border)',
                background: 'var(--secondary)',
                padding: '1rem 2rem',
                color: 'var(--text-main)'
              }}
            >
              <Mail size={20} />
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
