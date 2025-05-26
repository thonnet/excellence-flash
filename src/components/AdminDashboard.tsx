
import React, { useState } from 'react';
import UserManagement from './UserManagement';

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'users'>('dashboard');

  if (currentView === 'users') {
    return <UserManagement onBack={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header-section">
        <h1>🎛️ Interface d'administration</h1>
        <p>Gestion et supervision de l'application Excellence Flash</p>
      </div>
      
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
