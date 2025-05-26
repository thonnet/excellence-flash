
export interface UserDisplay {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

// Extended user interface for cases where we need full user data
export interface UserProfile extends UserDisplay {
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
