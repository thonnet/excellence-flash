
import { useState, useCallback } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}

export const useToastNotification = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now().toString();
    const newToast: Toast = {
      id,
      message,
      type,
      isVisible: true
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove after delay
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3500);
  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prev => 
      prev.map(toast => 
        toast.id === id ? { ...toast, isVisible: false } : toast
      )
    );

    // Remove from array after animation
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 300);
  }, []);

  const showSuccess = useCallback((message: string) => {
    showToast(message, 'success');
  }, [showToast]);

  const showError = useCallback((message: string) => {
    showToast(message, 'error');
  }, [showToast]);

  const showInfo = useCallback((message: string) => {
    showToast(message, 'info');
  }, [showToast]);

  return {
    toasts,
    showToast,
    hideToast,
    showSuccess,
    showError,
    showInfo
  };
};
