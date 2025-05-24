
import React, { useState } from 'react';
import { Excellence, Experience, User } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface ObservatoireProps {
  excellences: Excellence[];
  experiences: Experience[];
  user: User;
}

export const Observatoire: React.FC<ObservatoireProps> = ({
  excellences,
  experiences,
  user
}) => {
  const [timePeriod, setTimePeriod] = useState('month');

  const timePeriods = {
    week: 'Semaine',
    month: 'Mois', 
    semester: 'Semestre',
    year: 'Année'
  };

  // Calculate metrics
  const totalExcellences = excellences.length;
  const totalExperiences = experiences.length;
  
  // Get experiences from selected period
  const getExperiencesForPeriod = (period: string) => {
    const now = new Date();
    let startDate = new Date();
    
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'semester':
        startDate.setMonth(now.getMonth() - 6);
        break;
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
    }
    
    return experiences.filter(exp => 
      new Date(exp.created_at) >= startDate
    );
  };

  const periodExperiences = getExperiencesForPeriod(timePeriod);

  // Top excellences by experience count for selected period
  const excellenceExperienceCounts = excellences.map(excellence => ({
    excellence,
    count: periodExperiences.filter(exp => exp.excellence_id === excellence.id).length
  })).sort((a, b) => b.count - a.count);

  const topExcellences = excellenceExperienceCounts.slice(0, 5);

  // Category distribution
  const categoryStats = Object.entries(EXCELLENCE_CATEGORIES).map(([key, category]) => ({
    key,
    category,
    count: excellences.filter(exc => exc.category === key).length
  }));

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="rounded-xl p-6 border" style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Observatoire - {user.full_name || 'Excellence Flash'} 👁️
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Analysez votre progression vers l'excellence
        </p>
      </div>

      {/* Period Selector */}
      <div className="flex items-center space-x-4">
        <label style={{ color: 'var(--text-primary)' }} className="font-medium">
          Période d'analyse :
        </label>
        <select 
          value={timePeriod} 
          onChange={(e) => setTimePeriod(e.target.value)}
          className="px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)'
          }}
        >
          {Object.entries(timePeriods).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Key Metrics - All gauges in BLUE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Total Excellences</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gauge-blue)' }}>{totalExcellences}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gauge-blue-light)' }}>
              <Target style={{ color: 'var(--gauge-blue)' }} size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Total Expériences</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gauge-blue)' }}>{totalExperiences}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gauge-blue-light)' }}>
              <Zap style={{ color: 'var(--gauge-blue)' }} size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Cette période</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gauge-blue)' }}>{periodExperiences.length}</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gauge-blue-light)' }}>
              <TrendingUp style={{ color: 'var(--gauge-blue)' }} size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm">Moyenne/Excellence</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--gauge-blue)' }}>
                {totalExcellences > 0 ? Math.round(totalExperiences / totalExcellences) : 0}
              </p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--gauge-blue-light)' }}>
              <BarChart3 style={{ color: 'var(--gauge-blue)' }} size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Excellences for period */}
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Top 5 Excellences - {timePeriods[timePeriod]}
          </h3>
          <div className="space-y-3">
            {topExcellences.map(({ excellence, count }, index) => {
              const category = EXCELLENCE_CATEGORIES[excellence.category];
              const maxCount = Math.max(...topExcellences.map(e => e.count), 1);
              const percentage = (count / maxCount) * 100;
              
              return (
                <div key={excellence.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {excellence.name}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {count} exp.
                    </span>
                  </div>
                  <div className="w-full rounded-full h-2" style={{ backgroundColor: 'var(--border-subtle)' }}>
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.max(percentage, 5)}%`,
                        backgroundColor: 'var(--gauge-blue)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
            
            {topExcellences.length === 0 && (
              <p style={{ color: 'var(--text-muted)' }} className="text-center py-4">
                Aucune excellence créée pour le moment
              </p>
            )}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
          <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Répartition par Catégorie
          </h3>
          <div className="space-y-4">
            {categoryStats.map(({ key, category, count }) => (
              <div key={key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm" style={{ color: 'var(--text-primary)' }}>
                    {category.title}
                  </span>
                </div>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {count}
                </span>
              </div>
            ))}
          </div>
          
          {totalExcellences === 0 && (
            <p style={{ color: 'var(--text-muted)' }} className="text-center py-4">
              Commencez par créer vos premières excellences
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl p-6 border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-subtle)' }}>
        <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border rounded-lg text-left hover:opacity-80 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--gauge-blue-light)',
                    borderColor: 'var(--gauge-blue)'
                  }}>
            <h4 className="font-medium mb-1" style={{ color: 'var(--gauge-blue)' }}>
              Ajouter une Excellence
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Identifiez une nouvelle compétence
            </p>
          </button>
          
          <button className="p-4 border rounded-lg text-left transition-colors"
                  style={{ 
                    backgroundColor: 'var(--accent-orange)',
                    borderColor: 'var(--accent-orange)',
                    color: 'white'
                  }}>
            <h4 className="font-medium mb-1">
              Nouvelle Expérience
            </h4>
            <p className="text-sm opacity-90">
              Documentez votre progression
            </p>
          </button>
          
          <button className="p-4 border rounded-lg text-left hover:opacity-80 transition-colors"
                  style={{ 
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-medium)'
                  }}>
            <h4 className="font-medium mb-1" style={{ color: 'var(--text-primary)' }}>
              Insights IA
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              Obtenez des conseils personnalisés
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
