
import { User } from '../types';

export const requireAdmin = (user: User | null): boolean => {
  return user?.role === 'admin';
};

export const redirectIfNotAdmin = (user: User | null, navigate: (path: string) => void): boolean => {
  if (!requireAdmin(user)) {
    navigate('/');
    return false;
  }
  return true;
};

export const getUserDisplayName = (user: User | null): string => {
  if (!user) return 'Utilisateur';
  return user.full_name || user.email || 'Utilisateur';
};
