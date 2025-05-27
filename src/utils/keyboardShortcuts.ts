
// Raccourcis clavier basiques pour les expériences
export interface KeyboardShortcutContext {
  currentMode: 'explorer' | 'consigner';
  isModalOpen: boolean;
  canSave: boolean;
  onNavigateToConsigner: () => void;
  onNavigateToExplorer: () => void;
  onSave: () => void;
  onCloseModal: () => void;
}

export class KeyboardShortcuts {
  private context: KeyboardShortcutContext;
  private isActive = false;

  constructor(context: KeyboardShortcutContext) {
    this.context = context;
  }

  public activate() {
    if (this.isActive) return;
    
    this.isActive = true;
    document.addEventListener('keydown', this.handleKeyDown);
  }

  public deactivate() {
    if (!this.isActive) return;
    
    this.isActive = false;
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  public updateContext(newContext: Partial<KeyboardShortcutContext>) {
    this.context = { ...this.context, ...newContext };
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    // Échapper si dans un input/textarea
    if (this.isInputFocused()) return;

    switch (e.key) {
      case 'Escape':
        this.handleEscape();
        break;
      
      case 's':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.handleSave();
        }
        break;
      
      case 'n':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          this.handleNew();
        }
        break;
    }
  };

  private isInputFocused(): boolean {
    const activeElement = document.activeElement;
    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.tagName === 'SELECT' ||
      activeElement.getAttribute('contenteditable') === 'true'
    );
  }

  private handleEscape() {
    if (this.context.isModalOpen) {
      this.context.onCloseModal();
    } else if (this.context.currentMode === 'consigner') {
      this.context.onNavigateToExplorer();
    }
  }

  private handleSave() {
    if (this.context.currentMode === 'consigner' && this.context.canSave) {
      this.context.onSave();
    }
  }

  private handleNew() {
    if (this.context.currentMode === 'explorer') {
      this.context.onNavigateToConsigner();
    }
  }
}
