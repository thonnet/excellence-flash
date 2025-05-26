
import React from 'react';
import { NavCard } from './NavCard';
import { StatCard } from './StatCard';
import { useAdminStats } from '../../hooks/useAdminStats';

export const AdminDashboard: React.FC = () => {
  const stats = useAdminStats();

  return (
    <div className="admin-container">
      {/* Navigation principale */}
      <div className="admin-nav-grid">
        <NavCard 
          icon="👥" 
          title="Gestion des utilisateurs"
          description="Créer, modifier et superviser les comptes"
          path="/admin/users"
        />
        <NavCard 
          icon="📊" 
          title="Analytics & Statistiques"
          description="Données d'usage et performance"
          path="/admin/analytics"
        />
        <NavCard 
          icon="🔧" 
          title="Configuration système"
          description="Paramètres globaux et maintenance"
          path="/admin/settings"
        />
        <NavCard 
          icon="🔍" 
          title="Audit & Logs"
          description="Historique des actions système"
          path="/admin/audit"
        />
      </div>

      {/* Statistiques temps réel */}
      <div className="stats-section">
        <h2 style={{ 
          color: 'var(--text-primary)', 
          margin: '0 0 20px 0', 
          fontSize: '1.25rem', 
          fontWeight: '600' 
        }}>
          📈 Statistiques en temps réel
        </h2>
        <div className="stats-grid">
          <StatCard 
            value={stats.activeUsers} 
            label="Utilisateurs actifs"
            trend="+3 cette semaine"
            trendUp={true}
            loading={stats.loading}
          />
          <StatCard 
            value={stats.totalExcellences} 
            label="Excellences créées"
            trend="+12 ce mois"
            trendUp={true}
            loading={stats.loading}
          />
          <StatCard 
            value={stats.totalExperiences} 
            label="Expériences partagées"
            trend="+8 cette semaine"
            trendUp={true}
            loading={stats.loading}
          />
          <StatCard 
            value={stats.pendingUsers} 
            label="Comptes en attente"
            trend="-1 depuis hier"
            trendUp={false}
            loading={stats.loading}
          />
        </div>
      </div>
    </div>
  );
};
