
import React, { useState } from 'react';
import { Experience, Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Plus, Calendar, Tag } from 'lucide-react';

interface ExperiencesListProps {
  experiences: Experience[];
  excellences: Excellence[];
  onAddExperience: (experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) => void;
}

export const ExperiencesList: React.FC<ExperiencesListProps> = ({
  experiences,
  excellences,
  onAddExperience
}) => {
  const [selectedExcellence, setSelectedExcellence] = useState<string>('all');

  const filteredExperiences = selectedExcellence === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.excellence_id === selectedExcellence);

  const getExcellenceForExperience = (experienceId: string) => {
    const experience = experiences.find(exp => exp.id === experienceId);
    if (!experience) return null;
    return excellences.find(exc => exc.id === experience.excellence_id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Group experiences by date
  const groupedExperiences = filteredExperiences.reduce((groups, experience) => {
    const date = experience.date_experienced;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(experience);
    return groups;
  }, {} as Record<string, Experience[]>);

  const sortedDates = Object.keys(groupedExperiences).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select
            value={selectedExcellence}
            onChange={(e) => setSelectedExcellence(e.target.value)}
            className="px-3 py-2 bg-[#2a2a3e] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#0195ee]/50"
          >
            <option value="all">Toutes les excellences</option>
            {excellences.map(excellence => (
              <option key={excellence.id} value={excellence.id}>
                {excellence.name}
              </option>
            ))}
          </select>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-[#0195ee] text-white rounded-lg hover:bg-[#0175bb] transition-colors">
          <Plus size={16} />
          <span>Nouvelle expérience</span>
        </button>
      </div>

      {/* Experiences Timeline */}
      <div className="space-y-6">
        {sortedDates.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-[#2a2a3e] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">
              Aucune expérience
            </h3>
            <p className="text-gray-400 mb-4">
              Commencez à documenter vos expériences d'excellence
            </p>
            <button className="px-4 py-2 bg-[#0195ee] text-white rounded-lg hover:bg-[#0175bb] transition-colors">
              Ajouter ma première expérience
            </button>
          </div>
        ) : (
          sortedDates.map(date => (
            <div key={date} className="space-y-3">
              {/* Date Header */}
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#0195ee] rounded-full" />
                <h3 className="text-lg font-medium text-white">
                  {formatDate(date)}
                </h3>
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-sm text-gray-400">
                  {groupedExperiences[date].length} expérience{groupedExperiences[date].length !== 1 ? 's' : ''}
                </span>
              </div>

              {/* Experiences for this date */}
              <div className="space-y-3 ml-6">
                {groupedExperiences[date].map(experience => {
                  const excellence = excellences.find(exc => exc.id === experience.excellence_id);
                  const category = excellence ? EXCELLENCE_CATEGORIES[excellence.category] : null;

                  return (
                    <div key={experience.id} className="bg-[#2a2a3e] rounded-lg p-4 border border-white/10">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-1">
                            {experience.title}
                          </h4>
                          {excellence && (
                            <div className="flex items-center space-x-2">
                              <div 
                                className="px-2 py-1 rounded text-xs font-medium"
                                style={{
                                  backgroundColor: category?.bgColor,
                                  color: category?.color
                                }}
                              >
                                {excellence.name}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {experience.description && (
                        <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                          {experience.description}
                        </p>
                      )}

                      {experience.tags.length > 0 && (
                        <div className="flex items-center space-x-2">
                          <Tag size={14} className="text-gray-400" />
                          <div className="flex flex-wrap gap-1">
                            {experience.tags.map(tag => (
                              <span 
                                key={tag}
                                className="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
