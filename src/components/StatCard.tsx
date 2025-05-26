
import React from 'react';

interface Trend {
  type: 'positive' | 'warning' | 'neutral';
  icon: string;
  text: string;
}

interface StatCardProps {
  icon: string;
  title: string;
  value: number;
  subtitle?: string;
  trend?: Trend;
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtitle, 
  trend, 
  isLoading 
}) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <h3 className="stat-title">{title}</h3>
      </div>
      
      <div className="stat-content">
        <div className="stat-value">
          {isLoading ? '...' : value}
        </div>
        {subtitle && (
          <div className="stat-subtitle">{subtitle}</div>
        )}
        {trend && (
          <div className={`stat-trend ${trend.type}`}>
            {trend.icon} {trend.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
