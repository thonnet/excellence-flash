
import React from 'react';
import { Excellence, Experience, User } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { BarChart3, TrendingUp, Target, Zap } from 'lucide-react';

interface DashboardProps {
  excellences: Excellence[];
  experiences: Experience[];
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({
  excellences,
  experiences,
  user
}) => {
  // Calculate metrics
  const totalExcellences = excellences.length;
  const totalExperiences = experiences.length;
  
  // Get experiences from last 7 days
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const weeklyExperiences = experiences.filter(exp => 
    new Date(exp.created_at) >= weekStart
  ).length;

  // Top excellences by experience count
  const excellenceExperienceCounts = excellences.map(excellence => ({
    excellence,
    count: experiences.filter(exp => exp.excellence_id === excellence.id).length
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
      <div className="bg-gradient-to-r from-[#0195ee]/20 to-[#ee5a01]/20 rounded-xl p-6 border border-white/10">
        <h1 className="text-2xl font-bold text-white mb-2">
          Bienvenue, {user.full_name || 'Excellence Flash'} ! 👋
        </h1>
        <p className="text-gray-300">
          Voici un aperçu de votre progression vers l'excellence
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Excellences</p>
              <p className="text-2xl font-bold text-white">{totalExcellences}</p>
            </div>
            <div className="p-3 bg-[#0195ee]/20 rounded-lg">
              <Target className="text-[#0195ee]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Expériences</p>
              <p className="text-2xl font-bold text-white">{totalExperiences}</p>
            </div>
            <div className="p-3 bg-[#ee5a01]/20 rounded-lg">
              <Zap className="text-[#ee5a01]" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Cette semaine</p>
              <p className="text-2xl font-bold text-white">{weeklyExperiences}</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Moyenne/Excellence</p>
              <p className="text-2xl font-bold text-white">
                {totalExcellences > 0 ? Math.round(totalExperiences / totalExcellences) : 0}
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <BarChart3 className="text-purple-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Excellences */}
        <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
            Top 5 Excellences
          </h3>
          <div className="space-y-3">
            {topExcellences.map(({ excellence, count }, index) => {
              const category = EXCELLENCE_CATEGORIES[excellence.category];
              const percentage = totalExperiences > 0 ? (count / totalExperiences) * 100 : 0;
              
              return (
                <div key={excellence.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white font-medium">
                      {excellence.name}
                    </span>
                    <span className="text-sm text-gray-400">
                      {count} exp.
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.max(percentage, 5)}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
            
            {topExcellences.length === 0 && (
              <p className="text-gray-400 text-center py-4">
                Aucune excellence créée pour le moment
              </p>
            )}
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold text-white mb-4">
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
                  <span className="text-sm text-white">
                    {category.title}
                  </span>
                </div>
                <span className="text-sm text-gray-400">
                  {count}
                </span>
              </div>
            ))}
          </div>
          
          {totalExcellences === 0 && (
            <p className="text-gray-400 text-center py-4">
              Commencez par créer vos premières excellences
            </p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#2a2a3e] rounded-xl p-6 border border-white/10">
        <h3 className="text-lg font-semibold text-white mb-4">
          Actions Rapides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-[#0195ee]/10 border border-[#0195ee]/30 rounded-lg text-left hover:bg-[#0195ee]/20 transition-colors">
            <h4 className="text-[#0195ee] font-medium mb-1">
              Ajouter une Excellence
            </h4>
            <p className="text-sm text-gray-400">
              Identifiez une nouvelle compétence
            </p>
          </button>
          
          <button className="p-4 bg-[#ee5a01]/10 border border-[#ee5a01]/30 rounded-lg text-left hover:bg-[#ee5a01]/20 transition-colors">
            <h4 className="text-[#ee5a01] font-medium mb-1">
              Nouvelle Expérience
            </h4>
            <p className="text-sm text-gray-400">
              Documentez votre progression
            </p>
          </button>
          
          <button className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-left hover:bg-purple-500/20 transition-colors">
            <h4 className="text-purple-400 font-medium mb-1">
              Insights IA
            </h4>
            <p className="text-sm text-gray-400">
              Obtenez des conseils personnalisés
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
