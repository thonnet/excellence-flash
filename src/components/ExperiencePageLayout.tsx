
import React from 'react';

interface ExperiencePageLayoutProps {
  children: React.ReactNode;
}

export const ExperiencePageLayout: React.FC<ExperiencePageLayoutProps> = ({ children }) => {
  return (
    <div className="space-y-8">
      {children}
    </div>
  );
};
