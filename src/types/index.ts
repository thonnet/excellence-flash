
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
  image_url?: string;           // NOUVEAU: URL de l'image uploadée
  image_caption?: string;       // NOUVEAU: Légende optionnelle
  date_experienced: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export const EXCELLENCE_CATEGORIES = {
  manifestee: {
    title: "Excellence manifestée",
    description: "Compétences que vous pratiquez naturellement",
    color: "#0195ee",
    bgColor: "rgba(1, 149, 238, 0.1)",
    borderColor: "rgba(1, 149, 238, 0.3)"
  },
  principe: {
    title: "Principe d'excellence", 
    description: "Règles et méthodes qui optimisent vos performances",
    color: "#ee5a01",
    bgColor: "rgba(238, 90, 1, 0.1)",
    borderColor: "rgba(238, 90, 1, 0.3)"
  },
  quete: {
    title: "Quête d'excellence",
    description: "Excellences que vous souhaitez développer",
    color: "#707070",
    bgColor: "rgba(112, 112, 112, 0.1)",
    borderColor: "rgba(112, 112, 112, 0.3)"
  }
} as const;
