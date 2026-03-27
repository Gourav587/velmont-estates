import React from 'react';
import { MessageCircle, Mail, Globe } from 'lucide-react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--secondary)', borderTop: '1px solid rgba(0,0,0,0.05)', padding: '4rem 0 2rem' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <img 
                src={logo} 
                alt="Velmont Estates" 
                style={{ 
                  height: '100px', 
                  width: 'auto', 
                  filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.5))'
                }} 
              />
            </div>
            <p style={{ color: 'var(--text-muted)', maxWidth: '300px' }}>
              Your path to smart real estate investments in the Triregion (Pathankot, Gurdaspur, Amritsar). Boutique service, professional advice.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/" style={linkStyle}>Home</Link></li>
              <li><Link to="/projects" style={linkStyle}>Our Projects</Link></li>
              <li><Link to="/about" style={linkStyle}>About Us</Link></li>
              <li><Link to="/services" style={linkStyle}>Services</Link></li>
              <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={socialIconStyle}><MessageCircle size={20} /></a>
              <a href="#" style={socialIconStyle}><Mail size={20} /></a>
              <a href="#" style={socialIconStyle}><Globe size={20} /></a>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(0,0,0,0.05)',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.85rem'
        }}>
          <p>© {new Date().getFullYear()} Velmont Estates. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
};

const linkStyle = {
  color: 'var(--text-muted)',
  fontSize: '0.95rem',
  transition: 'color 0.3s ease'
};

const socialIconStyle = {
  background: 'var(--secondary)',
  color: 'var(--accent)',
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease'
};

export default Footer;
