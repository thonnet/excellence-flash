
import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface HelpPageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack: () => void;
}

export const HelpPage: React.FC<HelpPageProps> = ({
  title,
  subtitle,
  children,
  onBack
}) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors"
            style={{ 
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Retour</span>
          </button>
          <div>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h1>
            {subtitle && (
              <p className="text-lg mt-1" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};
