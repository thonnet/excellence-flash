
import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

// NAVIGATION (4 pictogrammes)
export const NextIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M180 120 L320 250 L180 380" stroke="currentColor" strokeWidth="40" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const BackIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M320 120 L180 250 L320 380" stroke="currentColor" strokeWidth="40" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const HomeIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M250 80 L420 220 L420 380 L320 380 L320 280 L180 280 L180 380 L80 380 L80 220 Z" fill="currentColor"/>
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="30" fill="none"/>
    <line x1="280" y1="280" x2="380" y2="380" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
  </svg>
);

// VUES D'AFFICHAGE (6 pictogrammes)
export const KanbanIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 499.03 498.76" className={className}>
    <rect x="50" y="50" width="120" height="200" fill="currentColor" rx="10"/>
    <rect x="190" y="50" width="120" height="300" fill="currentColor" rx="10"/>
    <rect x="330" y="50" width="120" height="150" fill="currentColor" rx="10"/>
  </svg>
);

export const ListIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="50" y="100" width="400" height="30" fill="currentColor" rx="5"/>
    <rect x="50" y="180" width="400" height="30" fill="currentColor" rx="5"/>
    <rect x="50" y="260" width="400" height="30" fill="currentColor" rx="5"/>
    <rect x="50" y="340" width="400" height="30" fill="currentColor" rx="5"/>
  </svg>
);

export const GalleryIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="80" y="80" width="150" height="150" fill="currentColor" rx="10"/>
    <rect x="270" y="80" width="150" height="150" fill="currentColor" rx="10"/>
    <rect x="80" y="270" width="150" height="150" fill="currentColor" rx="10"/>
    <rect x="270" y="270" width="150" height="150" fill="currentColor" rx="10"/>
  </svg>
);

export const TimelineIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <line x1="100" y1="50" x2="100" y2="450" stroke="currentColor" strokeWidth="8"/>
    <circle cx="100" cy="120" r="15" fill="currentColor"/>
    <circle cx="100" cy="220" r="15" fill="currentColor"/>
    <circle cx="100" cy="320" r="15" fill="currentColor"/>
    <rect x="140" y="105" width="280" height="30" fill="currentColor" rx="5"/>
    <rect x="140" y="205" width="280" height="30" fill="currentColor" rx="5"/>
    <rect x="140" y="305" width="280" height="30" fill="currentColor" rx="5"/>
  </svg>
);

export const CompactIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="50" y="120" width="400" height="20" fill="currentColor" rx="3"/>
    <rect x="50" y="180" width="400" height="20" fill="currentColor" rx="3"/>
    <rect x="50" y="240" width="400" height="20" fill="currentColor" rx="3"/>
    <rect x="50" y="300" width="400" height="20" fill="currentColor" rx="3"/>
    <rect x="50" y="360" width="400" height="20" fill="currentColor" rx="3"/>
  </svg>
);

export const CalendarIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="80" y="120" width="340" height="280" fill="none" stroke="currentColor" strokeWidth="20" rx="10"/>
    <line x1="80" y1="180" x2="420" y2="180" stroke="currentColor" strokeWidth="8"/>
    <line x1="150" y1="80" x2="150" y2="160" stroke="currentColor" strokeWidth="15" strokeLinecap="round"/>
    <line x1="350" y1="80" x2="350" y2="160" stroke="currentColor" strokeWidth="15" strokeLinecap="round"/>
    <circle cx="150" cy="240" r="8" fill="currentColor"/>
    <circle cx="250" cy="240" r="8" fill="currentColor"/>
    <circle cx="350" cy="240" r="8" fill="currentColor"/>
    <circle cx="150" cy="300" r="8" fill="currentColor"/>
    <circle cx="250" cy="300" r="8" fill="currentColor"/>
    <circle cx="350" cy="300" r="8" fill="currentColor"/>
  </svg>
);

// ACTIONS (6 pictogrammes)
export const SaveIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="100" y="80" width="300" height="340" fill="currentColor" rx="15"/>
    <rect x="120" y="100" width="260" height="200" fill="var(--bg-primary)" rx="10"/>
    <rect x="180" y="80" width="140" height="80" fill="var(--bg-primary)" rx="10"/>
    <circle cx="250" cy="380" r="20" fill="var(--bg-primary)"/>
  </svg>
);

export const FilterIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M80 120 L420 120 L320 250 L320 380 L180 380 L180 250 Z" fill="currentColor"/>
  </svg>
);

export const SortIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M150 80 L200 140 L100 140 Z" fill="currentColor"/>
    <line x1="150" y1="140" x2="150" y2="350" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <path d="M350 420 L300 360 L400 360 Z" fill="currentColor"/>
    <line x1="350" y1="360" x2="350" y2="150" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
  </svg>
);

export const LinkIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M200 180 Q150 130 100 180 Q50 230 100 280 Q150 330 200 280" stroke="currentColor" strokeWidth="30" fill="none" strokeLinecap="round"/>
    <path d="M300 220 Q350 170 400 220 Q450 270 400 320 Q350 370 300 320" stroke="currentColor" strokeWidth="30" fill="none" strokeLinecap="round"/>
    <line x1="200" y1="250" x2="300" y2="250" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
  </svg>
);

export const ImageIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="80" y="120" width="340" height="260" fill="none" stroke="currentColor" strokeWidth="25" rx="15"/>
    <circle cx="180" cy="200" r="25" fill="currentColor"/>
    <path d="M120 320 L200 240 L280 300 L380 200 L420 240 L420 340 L120 340 Z" fill="currentColor"/>
  </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <circle cx="250" cy="250" r="180" fill="none" stroke="currentColor" strokeWidth="30"/>
    <circle cx="250" cy="180" r="20" fill="currentColor"/>
    <line x1="250" y1="230" x2="250" y2="350" stroke="currentColor" strokeWidth="30" strokeLinecap="round"/>
  </svg>
);

// MENU PRINCIPAL (4 pictogrammes)
export const ExcellencesIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M250 50 L400 200 L250 350 L100 200 Z" fill="none" stroke="currentColor" strokeWidth="25"/>
    <path d="M250 150 L320 220 L250 290 L180 220 Z" fill="currentColor"/>
  </svg>
);

export const ExperiencesIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="100" y="150" width="300" height="200" fill="none" stroke="currentColor" strokeWidth="25" rx="15"/>
    <rect x="150" y="100" width="200" height="50" fill="currentColor" rx="10"/>
    <circle cx="200" cy="250" r="15" fill="currentColor"/>
    <circle cx="300" cy="250" r="15" fill="currentColor"/>
    <line x1="140" y1="380" x2="360" y2="380" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
  </svg>
);

export const ObservatoireIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <circle cx="250" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="25"/>
    <circle cx="250" cy="200" r="60" fill="none" stroke="currentColor" strokeWidth="15"/>
    <circle cx="250" cy="200" r="20" fill="currentColor"/>
    <path d="M150 350 L350 350 Q380 350 380 320 L380 280" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round"/>
    <path d="M120 350 L120 320 Q120 290 150 290 L350 290 Q380 290 380 260" stroke="currentColor" strokeWidth="20" fill="none" strokeLinecap="round"/>
  </svg>
);

export const AvatarIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <circle cx="250" cy="180" r="80" fill="currentColor"/>
    <path d="M100 420 Q100 320 250 320 Q400 320 400 420" fill="currentColor"/>
  </svg>
);

// MODES D'AFFICHAGE (3 pictogrammes)
export const DarkModeIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M200 100 Q300 120 350 200 Q320 300 220 350 Q150 320 100 250 Q120 150 200 100 Z" fill="currentColor"/>
  </svg>
);

export const LightModeIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <circle cx="250" cy="250" r="80" fill="currentColor"/>
    <line x1="250" y1="80" x2="250" y2="130" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="250" y1="370" x2="250" y2="420" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="420" y1="250" x2="370" y2="250" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="130" y1="250" x2="80" y2="250" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="356" y1="144" x2="321" y2="179" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="179" y1="321" x2="144" y2="356" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="356" y1="356" x2="321" y2="321" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
    <line x1="179" y1="179" x2="144" y2="144" stroke="currentColor" strokeWidth="20" strokeLinecap="round"/>
  </svg>
);

export const ContrastIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <circle cx="250" cy="250" r="150" fill="none" stroke="currentColor" strokeWidth="30"/>
    <path d="M250 100 A 150 150 0 0 1 250 400 Z" fill="currentColor"/>
  </svg>
);

// ACTIONS CRUD (3 pictogrammes)
export const ViewIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M250 150 Q400 150 450 250 Q400 350 250 350 Q100 350 50 250 Q100 150 250 150 Z" fill="none" stroke="currentColor" strokeWidth="25"/>
    <circle cx="250" cy="250" r="50" fill="currentColor"/>
  </svg>
);

export const EditIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <path d="M100 350 L150 300 L350 100 L400 150 L200 350 L100 400 Z" fill="currentColor"/>
    <line x1="320" y1="130" x2="370" y2="180" stroke="var(--bg-primary)" strokeWidth="15"/>
  </svg>
);

export const DeleteIcon: React.FC<IconProps> = ({ size = 14, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 500 500" className={className}>
    <rect x="150" y="150" width="200" height="270" fill="currentColor" rx="15"/>
    <rect x="120" y="120" width="260" height="40" fill="currentColor" rx="10"/>
    <rect x="200" y="80" width="100" height="40" fill="currentColor" rx="10"/>
    <line x1="200" y1="200" x2="200" y2="350" stroke="var(--bg-primary)" strokeWidth="15" strokeLinecap="round"/>
    <line x1="250" y1="200" x2="250" y2="350" stroke="var(--bg-primary)" strokeWidth="15" strokeLinecap="round"/>
    <line x1="300" y1="200" x2="300" y2="350" stroke="var(--bg-primary)" strokeWidth="15" strokeLinecap="round"/>
  </svg>
);

// Export de tous les icônes avec leurs noms originaux pour compatibilité
export {
  KanbanIcon as LayoutKanban,
  GalleryIcon as LayoutGallery,
  SearchIcon as Search,
  FilterIcon as Filter,
  SortIcon as ArrowUpDown,
  EditIcon as Edit,
  DeleteIcon as Trash2,
  ViewIcon as Eye,
  SaveIcon as Save,
  InfoIcon as Info,
  LinkIcon as Link,
  ImageIcon as Image,
  HomeIcon as Home,
  NextIcon as ChevronRight,
  BackIcon as ChevronLeft,
  AvatarIcon as User,
  DarkModeIcon as Moon,
  LightModeIcon as Sun
};

// Map pour accès dynamique
export const iconMap = {
  kanban: KanbanIcon,
  list: ListIcon,
  gallery: GalleryIcon,
  timeline: TimelineIcon,
  compact: CompactIcon,
  calendar: CalendarIcon,
  excellences: ExcellencesIcon,
  experiences: ExperiencesIcon,
  observatoire: ObservatoireIcon,
  search: SearchIcon,
  filter: FilterIcon,
  sort: SortIcon,
  save: SaveIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  view: ViewIcon,
  info: InfoIcon,
  link: LinkIcon,
  image: ImageIcon,
  home: HomeIcon,
  next: NextIcon,
  back: BackIcon,
  avatar: AvatarIcon,
  darkMode: DarkModeIcon,
  lightMode: LightModeIcon,
  contrast: ContrastIcon
};
