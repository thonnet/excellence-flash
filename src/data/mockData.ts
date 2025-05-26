
import { Excellence, Experience, User } from '../types';

export const mockUser: User = {
  id: 'user-1',
  email: 'jean.dupont@example.com',
  full_name: 'Jean Dupont',
  company_name: '',
  billing_type: 'individual',
  subscription_status: 'pro',
  plan_type: 'pro',
  theme_preference: 'dark',
  ai_insights_enabled: true,
  role: 'admin',
  permissions: { admin: true },
  last_sign_in_at: '2024-01-15T09:30:00Z',
  created_at: '2024-01-15T10:00:00Z',
  updated_at: '2024-01-15T10:00:00Z'
};

export const mockExcellences: Excellence[] = [
  {
    id: 'exc-1',
    user_id: 'user-1',
    name: 'Communication empathique',
    description: 'Capacité naturelle à comprendre et répondre aux besoins émotionnels des autres lors des échanges',
    category: 'manifestee',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: 'exc-2',
    user_id: 'user-1',
    name: 'Apprentissage continu',
    description: 'Principe de rester ouvert aux nouvelles connaissances et de chercher constamment à s\'améliorer',
    category: 'principe',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },
  {
    id: 'exc-3',
    user_id: 'user-1',
    name: 'Leadership collaboratif',
    description: 'Développer ma capacité à guider une équipe tout en valorisant les contributions de chacun',
    category: 'quete',
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z'
  },
  {
    id: 'exc-4',
    user_id: 'user-1',
    name: 'Résolution créative de problèmes',
    description: 'Capacité à trouver des solutions innovantes et originales aux défis complexes',
    category: 'manifestee',
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z'
  },
  {
    id: 'exc-5',
    user_id: 'user-1',
    name: 'Gestion du temps optimale',
    description: 'Méthode systématique pour prioriser les tâches et maximiser l\'efficacité',
    category: 'principe',
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-19T10:00:00Z'
  }
];

export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    user_id: 'user-1',
    excellence_id: 'exc-1',
    title: 'Médiation réussie entre équipes',
    description: 'J\'ai facilité une discussion entre deux équipes en conflit en écoutant activement chaque partie et en reformulant leurs préoccupations de manière empathique.',
    date_experienced: '2024-01-20',
    tags: ['médiation', 'écoute active', 'gestion conflit'],
    created_at: '2024-01-20T15:30:00Z',
    updated_at: '2024-01-20T15:30:00Z'
  },
  {
    id: 'exp-2',
    user_id: 'user-1',
    excellence_id: 'exc-1',
    title: 'Support émotionnel à un collègue',
    description: 'Un collègue traversait une période difficile. J\'ai su créer un espace d\'écoute bienveillant qui l\'a aidé à exprimer ses émotions.',
    date_experienced: '2024-01-18',
    tags: ['support', 'écoute', 'bienveillance'],
    created_at: '2024-01-18T11:20:00Z',
    updated_at: '2024-01-18T11:20:00Z'
  },
  {
    id: 'exp-3',
    user_id: 'user-1',
    excellence_id: 'exc-2',
    title: 'Formation en ligne sur l\'intelligence émotionnelle',
    description: 'Suivi d\'un cours complet pour approfondir mes connaissances en gestion des émotions',
    date_experienced: '2024-01-22',
    tags: ['formation', 'intelligence émotionnelle', 'apprentissage'],
    created_at: '2024-01-22T09:15:00Z',
    updated_at: '2024-01-22T09:15:00Z'
  },
  {
    id: 'exp-4',
    user_id: 'user-1',
    excellence_id: 'exc-4',
    title: 'Innovation dans le processus client',
    description: 'J\'ai proposé une nouvelle approche pour simplifier l\'onboarding client qui a été adoptée par l\'équipe.',
    date_experienced: '2024-01-21',
    tags: ['innovation', 'processus', 'client'],
    created_at: '2024-01-21T14:45:00Z',
    updated_at: '2024-01-21T14:45:00Z'
  },
  {
    id: 'exp-5',
    user_id: 'user-1',
    excellence_id: 'exc-5',
    title: 'Mise en place de la méthode GTD',
    description: 'J\'ai implémenté la méthode Getting Things Done pour mieux organiser mes tâches et projets.',
    date_experienced: '2024-01-19',
    tags: ['GTD', 'organisation', 'productivité'],
    created_at: '2024-01-19T16:00:00Z',
    updated_at: '2024-01-19T16:00:00Z'
  }
];
