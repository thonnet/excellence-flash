
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

export interface NewUser {
  email: string;
  fullName: string;
  role: string;
}
