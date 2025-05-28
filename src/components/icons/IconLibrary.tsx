import { 
  Eye, 
  Home, 
  List, 
  Star, 
  Edit, 
  Link, 
  Search, 
  Image, 
  Filter, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Settings,
  Plus,
  HelpCircle,
  LayoutList,
  LayoutKanban,
  LayoutGallery,
  Clock4,
  PanelLeft,
  Sun,
  Moon,
  Contrast,
  Trash2,
  Save,
  SortAsc,
  Info
} from 'lucide-react';

// Navigation
const NextIcon = ChevronRight;
const BackIcon = ChevronLeft;
const HomeIcon = Home;
const SearchIcon = Search;

// Vues d'affichage
const KanbanIcon = LayoutKanban;
const ListIcon = LayoutList;
const GalleryIcon = LayoutGallery;
const TimelineIcon = Clock4;
const CompactIcon = PanelLeft;
const CalendarIcon = Calendar;

// Actions
const SaveIcon = Save;
const FilterIcon = Filter;
const SortIcon = SortAsc;
const LinkIcon = Link;
const ImageIcon = Image;
const InfoIcon = Info;

// Menu principal
const ExcellencesIcon = Star;
const ExperiencesIcon = CheckCircle2;
const ObservatoireIcon = Eye;
const AvatarIcon = Settings;

// Modes d'affichage
const DarkModeIcon = Moon;
const LightModeIcon = Sun;
const ContrastIcon = Contrast;

// Actions CRUD
const ViewIcon = Eye;
const EditIcon = Edit;
const DeleteIcon = Trash2;

// Export des icônes individuelles
export {
  // Navigation
  NextIcon,
  BackIcon,
  HomeIcon,
  SearchIcon,
  
  // Vues d'affichage
  KanbanIcon,
  ListIcon,
  GalleryIcon,
  TimelineIcon,
  CompactIcon,
  CalendarIcon,
  
  // Actions
  SaveIcon,
  FilterIcon,
  SortIcon,
  LinkIcon,
  ImageIcon,
  InfoIcon,
  
  // Menu principal
  ExcellencesIcon,
  ExperiencesIcon,
  ObservatoireIcon,
  AvatarIcon,
  
  // Modes d'affichage
  DarkModeIcon,
  LightModeIcon,
  ContrastIcon,
  
  // Actions CRUD
  ViewIcon,
  EditIcon,
  DeleteIcon
};

// Map pour l'utilisation avec le composant Icon générique
export const icons = {
  // Navigation
  next: NextIcon,
  back: BackIcon,
  home: HomeIcon,
  search: SearchIcon,
  
  // Vues d'affichage
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
  
  // Menu principal
  excellences: ExcellencesIcon,
  experiences: ExperiencesIcon,
  observatoire: ObservatoireIcon,
  avatar: AvatarIcon,
  
  // Modes d'affichage
  'dark-mode': DarkModeIcon,
  'light-mode': LightModeIcon,
  contrast: ContrastIcon,
  
  // Actions CRUD
  view: ViewIcon,
  edit: EditIcon,
  delete: DeleteIcon
} as const;

export type IconName = keyof typeof icons;
