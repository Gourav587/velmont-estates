import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../types/project';

interface ProjectCardProps {
  id: string;
  price?: number | null;
  area?: string;
  isIllustrative?: boolean;
  title: string;
  location: string;
  image: string;
  category: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ id, title, location, image, category, price, area, isIllustrative }) => {
  return (
    <Link to={`/projects/${encodeURIComponent(id)}`} aria-label={`View ${title}`} style={{
      display: 'block',
      borderRadius: '20px',
      overflow: 'hidden',
      background: 'var(--primary)',
      border: '1px solid rgba(0,0,0,0.05)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'pointer',
      height: '100%'
    }} className="project-card">
      {/* Image Container */}
      <div style={{
        height: '240px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={image}
          loading="lazy" decoding="async" width={800} height={600}
          alt={isIllustrative ? `Illustrative photo for ${title}` : title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s ease'
          }} 
          className="project-image"
        />
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(4px)',
          padding: '0.4rem 1rem',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--accent)',
          textTransform: 'uppercase'
        }}>
          {category}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          {location}
        </p>
        
        <p className="property-price">{formatPrice(price)}{area ? ` · ${area}` : ''}</p>
        {isIllustrative && <p className="photo-note">Illustrative listing · details to be confirmed</p>}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'var(--accent)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <span>Learn More</span>
          <ArrowUpRight size={20} />
        </div>
      </div>

      <style>{`
        .project-card:hover {
          transform: translateY(-10px);
          border-color: rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
        }
        .project-card:hover .project-image {
          transform: scale(1.1);
        }
      `}</style>
    </Link>
  );
};

export default ProjectCard;
