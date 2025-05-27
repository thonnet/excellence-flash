
import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

interface ToastNotificationProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  autoHideDelay?: number;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  message,
  type,
  isVisible,
  onClose,
  autoHideDelay = 3000
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        onClose();
      }, autoHideDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDelay, onClose]);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (!isAnimating) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={16} style={{ color: '#0195ee' }} />;
      case 'error':
        return <AlertCircle size={16} style={{ color: '#ee5a01' }} />;
      default:
        return <AlertCircle size={16} style={{ color: 'var(--text-secondary)' }} />;
    }
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
      }`}
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg min-w-64 max-w-96"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)',
          color: 'var(--text-primary)'
        }}
      >
        {getIcon()}
        <span className="text-sm flex-1">{message}</span>
        <button
          onClick={onClose}
          className="p-1 rounded transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={(e) => {
            (e.target as HTMLElement).style.color = 'var(--text-secondary)';
            (e.target as HTMLElement).style.backgroundColor = 'var(--bg-hover)';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLElement).style.color = 'var(--text-muted)';
            (e.target as HTMLElement).style.backgroundColor = 'transparent';
          }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
