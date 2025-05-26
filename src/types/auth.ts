
export interface UserDisplay {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: UserDisplay | null;
  loading: boolean;
  isAdmin: boolean;
}
