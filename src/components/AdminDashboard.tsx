
import React from 'react';
import { Users, Shield, Settings, Database } from 'lucide-react';
import { UserDisplay } from '../types/auth';

interface AdminDashboardProps {
  user: UserDisplay;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-6 rounded-lg">
        <div className="flex items-center space-x-3">
          <Shield size={32} />
          <div>
            <h1 className="text-2xl font-bold">Panneau d'Administration</h1>
            <p className="opacity-90">Connecté en tant que : {user.full_name} ({user.email})</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="text-blue-500" size={24} />
            <h3 className="text-lg font-semibold">Gestion des Utilisateurs</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Gérer les comptes utilisateurs et leurs permissions
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Voir les Utilisateurs
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Database className="text-green-500" size={24} />
            <h3 className="text-lg font-semibold">Base de Données</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Gérer les données d'excellences et d'expériences
          </p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Gérer les Données
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border shadow-sm">
          <div className="flex items-center space-x-3 mb-4">
            <Settings className="text-purple-500" size={24} />
            <h3 className="text-lg font-semibold">Paramètres Système</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Configuration générale de l'application
          </p>
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors">
            Paramètres
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
          Mode Administrateur Actif
        </h3>
        <p className="text-yellow-700 dark:text-yellow-300">
          Vous êtes actuellement en mode administrateur. Utilisez le bouton de basculement dans l'en-tête pour revenir en mode utilisateur normal.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
