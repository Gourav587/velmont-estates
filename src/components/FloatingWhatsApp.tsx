import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumbers = [
    { label: 'Primary Contact', number: '918284883282' },
    { label: 'Secondary Contact', number: '919115662411' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: '1rem'
    }}>
      {/* Options Menu */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem',
        marginBottom: isOpen ? '0.5rem' : '0',
        opacity: isOpen ? 1 : 0,
        transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: isOpen ? 'all' : 'none',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {whatsappNumbers.map((item, index) => (
          <a
            key={index}
            href={`https://wa.me/${item.number}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'white',
              color: 'var(--text-main)',
              padding: '0.8rem 1.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 600,
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(0,0,0,0.05)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateX(-10px)';
              e.currentTarget.style.background = '#25D366';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = 'var(--text-main)';
            }}
          >
            <MessageCircle size={18} fill="currentColor" />
            {item.label}
          </a>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: isOpen ? '#ff4444' : '#25D366',
          color: 'white',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: isOpen 
            ? '0 10px 25px rgba(255, 68, 68, 0.4)' 
            : '0 10px 25px rgba(37, 211, 102, 0.4)',
          transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          border: 'none',
          cursor: 'pointer',
          outline: 'none'
        }}
        className="whatsapp-float-toggle"
      >
        {isOpen ? <X size={32} /> : (
          <div style={{ position: 'relative' }}>
            <MessageCircle size={32} fill="white" />
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#ff4444',
              color: 'white',
              fontSize: '0.7rem',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              border: '2px solid white'
            }}>2</div>
          </div>
        )}
      </button>

      <style>{`
        .whatsapp-float-toggle:hover {
          transform: scale(1.05);
        }
        .whatsapp-float-toggle:active {
          transform: scale(0.95);
        }
      `}</style>
    </div>
  );
};

export default FloatingWhatsApp;
