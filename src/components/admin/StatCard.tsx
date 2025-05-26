
import React from 'react';

interface StatCardProps {
  value: number;
  label: string;
  trend?: string;
  trendUp?: boolean;
  loading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  label, 
  trend, 
  trendUp = true, 
  loading = false 
}) => {
  return (
    <div className="stat-card">
      <div className="stat-value">
        {loading ? '...' : value.toLocaleString()}
      </div>
      <div style={{ 
        color: 'var(--text-primary)', 
        fontSize: '0.95rem', 
        fontWeight: '500',
        marginBottom: '4px'
      }}>
        {label}
      </div>
      {trend && (
        <div className={`stat-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
          {trendUp ? '↗' : '↘'} {trend}
        </div>
      )}
    </div>
  );
};
