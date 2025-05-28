
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  viewBox?: string;
}

// === NAVIGATION (4) ===
export const NextIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M180 120 L320 250 L180 380 L160 360 L280 250 L160 140 Z" />
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M320 120 L300 140 L420 250 L300 360 L320 380 L460 250 Z" transform="scale(-1,1) translate(-500,0)" />
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M250 80 L400 200 L400 400 L300 400 L300 300 L200 300 L200 400 L100 400 L100 200 Z" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="20" />
    <path d="M260 260 L400 400" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
  </svg>
);

// === VUES D'AFFICHAGE (6) ===
export const KanbanIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="80" y="100" width="80" height="300" rx="8" />
    <rect x="210" y="150" width="80" height="250" rx="8" />
    <rect x="340" y="120" width="80" height="280" rx="8" />
  </svg>
);

export const ListIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="80" y="120" width="340" height="30" rx="4" />
    <rect x="80" y="200" width="340" height="30" rx="4" />
    <rect x="80" y="280" width="340" height="30" rx="4" />
    <rect x="80" y="360" width="340" height="30" rx="4" />
  </svg>
);

export const GalleryIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="80" y="80" width="100" height="100" rx="8" />
    <rect x="200" y="80" width="100" height="100" rx="8" />
    <rect x="320" y="80" width="100" height="100" rx="8" />
    <rect x="80" y="200" width="100" height="100" rx="8" />
    <rect x="200" y="200" width="100" height="100" rx="8" />
    <rect x="320" y="200" width="100" height="100" rx="8" />
    <rect x="80" y="320" width="100" height="100" rx="8" />
    <rect x="200" y="320" width="100" height="100" rx="8" />
    <rect x="320" y="320" width="100" height="100" rx="8" />
  </svg>
);

export const TimelineIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <line x1="100" y1="100" x2="100" y2="400" stroke="currentColor" strokeWidth="4" />
    <circle cx="100" cy="150" r="12" />
    <circle cx="100" cy="250" r="12" />
    <circle cx="100" cy="350" r="12" />
    <rect x="130" y="135" width="200" height="30" rx="4" />
    <rect x="130" y="235" width="200" height="30" rx="4" />
    <rect x="130" y="335" width="200" height="30" rx="4" />
  </svg>
);

export const CompactIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="80" y="80" width="160" height="120" rx="8" opacity="0.7" />
    <rect x="120" y="140" width="160" height="120" rx="8" opacity="0.8" />
    <rect x="160" y="200" width="160" height="120" rx="8" opacity="0.9" />
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="100" y="120" width="300" height="260" rx="12" stroke="currentColor" strokeWidth="8" fill="none" />
    <rect x="140" y="80" width="8" height="80" rx="4" />
    <rect x="300" y="80" width="8" height="80" rx="4" />
    <line x1="100" y1="180" x2="400" y2="180" stroke="currentColor" strokeWidth="4" />
    <rect x="140" y="220" width="40" height="40" rx="6" />
    <rect x="200" y="220" width="40" height="40" rx="6" />
    <rect x="260" y="220" width="40" height="40" rx="6" />
    <rect x="320" y="220" width="40" height="40" rx="6" />
    <rect x="140" y="280" width="40" height="40" rx="6" />
    <rect x="200" y="280" width="40" height="40" rx="6" />
    <rect x="260" y="280" width="40" height="40" rx="6" />
    <rect x="320" y="280" width="40" height="40" rx="6" />
  </svg>
);

// === ACTIONS (6) ===
export const SaveIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="100" y="100" width="300" height="300" rx="12" />
    <rect x="120" y="100" width="80" height="60" rx="8" fill="white" />
    <rect x="140" y="220" width="220" height="160" rx="8" fill="white" />
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M100 120 L400 120 L300 220 L300 350 L200 350 L200 220 Z" />
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M150 150 L150 350 L120 320 M150 350 L180 320" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round" />
    <path d="M350 350 L350 150 L380 180 M350 150 L320 180" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round" />
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M200 150 L300 150 L300 200 L350 150 L300 100 L300 150" stroke="currentColor" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="120" y="120" width="160" height="60" rx="30" stroke="currentColor" strokeWidth="12" fill="none" />
    <rect x="220" y="320" width="160" height="60" rx="30" stroke="currentColor" strokeWidth="12" fill="none" />
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="80" y="120" width="340" height="260" rx="12" stroke="currentColor" strokeWidth="8" fill="none" />
    <circle cx="160" cy="200" r="25" />
    <path d="M120 320 L200 240 L280 320 L380 220 L420 260 L420 360 L120 360 Z" />
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <circle cx="250" cy="250" r="150" stroke="currentColor" strokeWidth="12" fill="none" />
    <circle cx="250" cy="180" r="12" />
    <line x1="250" y1="220" x2="250" y2="320" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
  </svg>
);

// === MENU PRINCIPAL (4) ===
export const ExcellencesIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M250 80 L320 200 L400 190 L340 280 L380 360 L250 320 L120 360 L160 280 L100 190 L180 200 Z" />
  </svg>
);

export const ExperiencesIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="120" y="120" width="260" height="260" rx="20" stroke="currentColor" strokeWidth="12" fill="none" />
    <rect x="160" y="160" width="180" height="60" rx="8" />
    <rect x="160" y="240" width="180" height="40" rx="6" />
    <rect x="160" y="300" width="120" height="40" rx="6" />
  </svg>
);

export const ObservatoireIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="100" y="300" width="300" height="100" rx="12" />
    <rect x="120" y="120" width="60" height="200" rx="8" />
    <rect x="220" y="180" width="60" height="140" rx="8" />
    <rect x="320" y="160" width="60" height="160" rx="8" />
  </svg>
);

export const AvatarIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <circle cx="250" cy="180" r="80" />
    <path d="M120 400 C120 320 180 280 250 280 C320 280 380 320 380 400 L120 400 Z" />
  </svg>
);

// === MODES D'AFFICHAGE (3) ===
export const ModeSombreIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M200 100 C300 120 380 200 380 300 C380 350 360 390 330 420 C280 380 240 320 220 250 C200 180 200 140 200 100 Z" />
  </svg>
);

export const ModeClairIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <circle cx="250" cy="250" r="80" />
    <line x1="250" y1="80" x2="250" y2="120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="250" y1="380" x2="250" y2="420" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="80" y1="250" x2="120" y2="250" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="380" y1="250" x2="420" y2="250" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="135" y1="135" x2="165" y2="165" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="335" y1="335" x2="365" y2="365" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="365" y1="135" x2="335" y2="165" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    <line x1="165" y1="335" x2="135" y2="365" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

export const ContrasteIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <circle cx="250" cy="250" r="150" stroke="currentColor" strokeWidth="8" fill="none" />
    <path d="M250 100 A150 150 0 0 1 250 400 Z" />
  </svg>
);

// === ACTIONS CRUD (3) ===
export const ViewIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <ellipse cx="250" cy="250" rx="200" ry="120" stroke="currentColor" strokeWidth="12" fill="none" />
    <circle cx="250" cy="250" r="60" />
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <path d="M320 120 L380 180 L200 360 L120 380 L140 300 Z" />
    <line x1="300" y1="140" x2="360" y2="200" stroke="white" strokeWidth="4" />
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 14, className = "", viewBox = "0 0 500 500" }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="currentColor" className={className}>
    <rect x="150" y="180" width="200" height="240" rx="12" />
    <rect x="120" y="140" width="260" height="20" rx="10" />
    <rect x="200" y="100" width="100" height="20" rx="10" />
    <line x1="200" y1="220" x2="200" y2="360" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <line x1="250" y1="220" x2="250" y2="360" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <line x1="300" y1="220" x2="300" y2="360" stroke="white" strokeWidth="8" strokeLinecap="round" />
  </svg>
);

// Index des icônes pour import facile
export const icons = {
  // Navigation
  next: NextIcon,
  back: BackIcon,
  home: HomeIcon,
  search: SearchIcon,
  
  // Vues
  kanban: KanbanIcon,
  list: ListIcon,
  gallery: GalleryIcon,
  timeline: TimelineIcon,
  compact: CompactIcon,
  calendar: CalendarIcon,
  
  // Actions
  save: SaveIcon,
  filter: FilterIcon,
  sort: SortIcon,
  link: LinkIcon,
  image: ImageIcon,
  info: InfoIcon,
  
  // Menu
  excellences: ExcellencesIcon,
  experiences: ExperiencesIcon,
  observatoire: ObservatoireIcon,
  avatar: AvatarIcon,
  
  // Modes
  'mode-sombre': ModeSombreIcon,
  'mode-clair': ModeClairIcon,
  contraste: ContrasteIcon,
  
  // CRUD
  view: ViewIcon,
  edit: EditIcon,
  delete: DeleteIcon
};

export type IconName = keyof typeof icons;
