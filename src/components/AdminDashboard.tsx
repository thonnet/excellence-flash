
import React, { useState } from 'react';
import { useAdminStats } from '../hooks/useAdminStats';
import StatCard from './StatCard';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'users'>('dashboard');
  const { stats, loading, refreshStats } = useAdminStats();

  if (currentView === 'users') {
    return <UserManagement onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header-section">
        <h1>🎛️ Interface d'administration</h1>
        <p>Gestion et supervision de l'application Excellence Flash</p>
        <button 
          className="refresh-btn"
          onClick={refreshStats}
          disabled={loading}
        >
          🔄 {loading ? 'Actualisation...' : 'Actualiser'}
        </button>
      </div>
      
      {/* Statistiques temps réel */}
      <div className="stats-section">
        <h2>📊 Statistiques temps réel</h2>
        <div className="stats-grid">
          <StatCard
            icon="👥"
            title="Utilisateurs totaux"
            value={stats.totalUsers}
            subtitle={`${stats.activeUsers} actifs`}
            trend={{
              type: stats.thisWeekUsers > 0 ? 'positive' : 'neutral',
              icon: stats.thisWeekUsers > 0 ? '↗' : '→',
              text: `+${stats.thisWeekUsers} cette semaine`
            }}
            isLoading={loading}
          />
          
          <StatCard
            icon="⭐"
            title="Excellences créées"
            value={stats.totalExcellences}
            subtitle={`${stats.todayExcellences} aujourd'hui`}
            trend={{
              type: stats.todayExcellences > 0 ? 'positive' : 'neutral',
              icon: stats.todayExcellences > 0 ? '↗' : '→',
              text: `${stats.todayExcellences} nouvelles`
            }}
            isLoading={loading}
          />
          
          <StatCard
            icon="💡"
            title="Expériences partagées"
            value={stats.totalExperiences}
            isLoading={loading}
          />
          
          <StatCard
            icon="⏳"
            title="En attente d'activation"
            value={stats.pendingUsers}
            trend={{
              type: stats.pendingUsers > 0 ? 'warning' : 'positive',
              icon: stats.pendingUsers > 0 ? '⚠️' : '✅',
              text: stats.pendingUsers > 0 ? 'Nécessite attention' : 'Tout activé'
            }}
            isLoading={loading}
          />
        </div>
      </div>

      {/* Navigation admin existante */}
      <div className="admin-quick-stats">
        <div className="stat-card">
          <h3>👥 Utilisateurs</h3>
          <p>Gérer les comptes et permissions</p>
          <button 
            className="admin-btn"
            onClick={() => setCurrentView('users')}
          >
            Accéder
          </button>
        </div>
        
        <div className="stat-card">
          <h3>📊 Statistiques</h3>
          <p>Analyser l'usage de l'application</p>
          <button className="admin-btn">Voir les stats</button>
        </div>
        
        <div className="stat-card">
          <h3>⚙️ Configuration</h3>
          <p>Paramètres système et maintenance</p>
          <button className="admin-btn">Configurer</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
