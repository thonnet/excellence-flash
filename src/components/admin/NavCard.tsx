
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
}

export const NavCard: React.FC<NavCardProps> = ({ icon, title, description, path }) => {
  const navigate = useNavigate();

  return (
    <div className="nav-card" onClick={() => navigate(path)}>
      <div className="nav-card-icon" style={{ fontSize: '2rem', marginBottom: '12px' }}>
        {icon}
      </div>
      <h3 style={{ 
        color: 'var(--text-primary)', 
        margin: '0 0 8px 0', 
        fontSize: '1.1rem', 
        fontWeight: '600' 
      }}>
        {title}
      </h3>
      <p style={{ 
        color: 'var(--text-secondary)', 
        margin: 0, 
        fontSize: '0.9rem', 
        lineHeight: '1.4' 
      }}>
        {description}
      </p>
    </div>
  );
};
