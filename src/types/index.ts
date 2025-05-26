export interface User {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  billing_type: 'individual' | 'business';
  vat_number?: string;
  subscription_status: 'free' | 'pro' | 'premium';
  plan_type: 'free' | 'pro' | 'premium';
  theme_preference: 'dark' | 'light';
  ai_insights_enabled: boolean;
  role: 'user' | 'admin'; // Ajout du rôle
  created_at: string;
  updated_at: string;
}

export interface Excellence {
  id: string;
  user_id: string;
  name: string;
  description: string;
  category: 'manifestee' | 'principe' | 'quete';
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  user_id: string;
  excellence_id: string;
  title: string;
  description: string;
  image_url?: string;
  image_caption?: string;
  date_experienced: string;
  tags: string[]; // Maintenu pour compatibilité mais non utilisé
  created_at: string;
  updated_at: string;
}

export const EXCELLENCE_CATEGORIES = {
  manifestee: {
    title: "Excellence manifestée",
    description: "Compétences que vous pratiquez naturellement",
    color: "#8B9657",
    bgColor: "rgba(139, 150, 87, 0.1)",
    borderColor: "rgba(139, 150, 87, 0.3)"
  },
  principe: {
    title: "Principe d'excellence", 
    description: "Règles et méthodes qui optimisent vos performances",
    color: "#A7C7E7",
    bgColor: "rgba(167, 199, 231, 0.1)",
    borderColor: "rgba(167, 199, 231, 0.3)"
  },
  quete: {
    title: "Quête d'excellence",
    description: "Excellences que vous souhaitez développer",
    color: "#FFB366",
    bgColor: "rgba(255, 179, 102, 0.1)",
    borderColor: "rgba(255, 179, 102, 0.3)"
  }
} as const;
