
import { useEffect } from 'react';

interface KeyboardShortcuts {
  onNewExperience?: () => void;
  onFocusSearch?: () => void;
  onEscape?: () => void;
  onSave?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcuts) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      
      // Ignore si on est dans un input ou textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        // Permettre seulement Ctrl/Cmd+S pour sauvegarder depuis les inputs
        if (isCtrlOrCmd && e.key === 's' && shortcuts.onSave) {
          e.preventDefault();
          shortcuts.onSave();
        }
        return;
      }

      // Nouvelle expérience
      if (isCtrlOrCmd && e.key === 'n' && shortcuts.onNewExperience) {
        e.preventDefault();
        shortcuts.onNewExperience();
      }

      // Focus recherche
      if (isCtrlOrCmd && e.key === 'f' && shortcuts.onFocusSearch) {
        e.preventDefault();
        shortcuts.onFocusSearch();
      }

      // Escape
      if (e.key === 'Escape' && shortcuts.onEscape) {
        shortcuts.onEscape();
      }

      // Sauvegarder
      if (isCtrlOrCmd && e.key === 's' && shortcuts.onSave) {
        e.preventDefault();
        shortcuts.onSave();
      }

      // Éditer
      if (isCtrlOrCmd && e.key === 'e' && shortcuts.onEdit) {
        e.preventDefault();
        shortcuts.onEdit();
      }

      // Supprimer
      if (e.key === 'Delete' && shortcuts.onDelete) {
        e.preventDefault();
        shortcuts.onDelete();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};
