
import React, { useState, useMemo } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Eye, Edit2, X, Search, Tag } from 'lucide-react';

interface ExcellenceListViewProps {
  excellences: Excellence[];
  onView: (excellence: Excellence) => void;
  onEdit: (excellence: Excellence) => void;
  onDelete: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
}

type SortKey = 'name' | 'category' | 'experiences' | 'created_at';
type SortDirection = 'asc' | 'desc';

export const ExcellenceListView: React.FC<ExcellenceListViewProps> = ({
  excellences,
  onView,
  onEdit,
  onDelete,
  getExperienceCount
}) => {
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const getCategoryIconClass = (category: string) => {
    if (category === 'manifestee') return 'category-icon--manifestee';
    if (category === 'principe') return 'category-icon--principe';
    if (category === 'quete') return 'category-icon--quete';
    return 'category-icon--manifestee';
  };

  const getSortArrows = (column: SortKey) => {
    return (
      <div className="sort-arrows">
        <span className={sortKey === column && sortDirection === 'asc' ? 'active' : ''}>▲</span>
        <span className={sortKey === column && sortDirection === 'desc' ? 'active' : ''}>▼</span>
      </div>
    );
  };

  const filteredAndSortedExcellences = useMemo(() => {
    let filtered = excellences;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(excellence =>
        excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excellence.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(excellence => excellence.category === categoryFilter);
    }

    // Sort
    return filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortKey) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = EXCELLENCE_CATEGORIES[a.category].title;
          bValue = EXCELLENCE_CATEGORIES[b.category].title;
          break;
        case 'experiences':
          aValue = getExperienceCount(a.id);
          bValue = getExperienceCount(b.id);
          break;
        case 'created_at':
          aValue = new Date(a.created_at);
          bValue = new Date(b.created_at);
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [excellences, searchQuery, categoryFilter, sortKey, sortDirection, getExperienceCount]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="search-field-container">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: searchQuery ? 'var(--accent-orange)' : 'var(--border-subtle)',
                color: 'var(--text-primary)'
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className={`search-clear-button visible`}
                title="Effacer la recherche"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-primary)'
          }}
        >
          <option value="all">Toutes les catégories</option>
          {Object.entries(EXCELLENCE_CATEGORIES).map(([key, category]) => (
            <option key={key} value={key}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th 
                className="text-left p-4 cursor-pointer border-b"
                style={{ borderColor: 'var(--border-medium)' }}
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  <span style={{ color: 'var(--text-primary)' }}>Nom</span>
                  {getSortArrows('name')}
                </div>
              </th>
              <th 
                className="text-left p-4 cursor-pointer border-b"
                style={{ borderColor: 'var(--border-medium)' }}
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">
                  <span style={{ color: 'var(--text-primary)' }}>Catégorie</span>
                  {getSortArrows('category')}
                </div>
              </th>
              <th 
                className="text-left p-4 border-b"
                style={{ borderColor: 'var(--border-medium)' }}
              >
                <span style={{ color: 'var(--text-primary)' }}>Description</span>
              </th>
              <th 
                className="text-left p-4 cursor-pointer border-b"
                style={{ borderColor: 'var(--border-medium)' }}
                onClick={() => handleSort('experiences')}
              >
                <div className="flex items-center">
                  <span style={{ color: 'var(--text-primary)' }}>Nb Expériences</span>
                  {getSortArrows('experiences')}
                </div>
              </th>
              <th 
                className="text-left p-4 cursor-pointer border-b"
                style={{ borderColor: 'var(--border-medium)' }}
                onClick={() => handleSort('created_at')}
              >
                <div className="flex items-center">
                  <span style={{ color: 'var(--text-primary)' }}>Date création</span>
                  {getSortArrows('created_at')}
                </div>
              </th>
              <th 
                className="text-left p-4 border-b"
                style={{ borderColor: 'var(--border-medium)' }}
              >
                <span style={{ color: 'var(--text-primary)' }}>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedExcellences.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8" style={{ color: 'var(--text-muted)' }}>
                  {searchQuery || categoryFilter !== 'all' 
                    ? 'Aucune excellence trouvée pour ces critères'
                    : 'Aucune excellence pour le moment'
                  }
                </td>
              </tr>
            ) : (
              filteredAndSortedExcellences.map((excellence, index) => (
                <tr 
                  key={excellence.id}
                  className="border-b hover:bg-opacity-50"
                  style={{ 
                    backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    borderColor: 'var(--border-subtle)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-primary)';
                  }}
                >
                  <td className="p-4">
                    <span className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {excellence.name}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                      <Tag className={`category-icon ${getCategoryIconClass(excellence.category)} mr-2`} size={16} />
                      <span style={{ color: 'var(--text-secondary)' }}>
                        {EXCELLENCE_CATEGORIES[excellence.category].title}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <span 
                      className="truncate block"
                      style={{ color: 'var(--text-secondary)' }}
                      title={excellence.description}
                    >
                      {excellence.description}
                    </span>
                  </td>
                  <td className="p-4">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {getExperienceCount(excellence.id)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {formatDate(excellence.created_at)}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(excellence)}
                        className="action-btn"
                        title="Voir"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onEdit(excellence)}
                        className="action-btn"
                        title="Modifier"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Êtes-vous sûr de vouloir supprimer cette excellence ?')) {
                            onDelete(excellence.id);
                          }
                        }}
                        className="action-btn"
                        title="Supprimer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Results summary */}
      {(searchQuery || categoryFilter !== 'all') && (
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {filteredAndSortedExcellences.length} excellence{filteredAndSortedExcellences.length !== 1 ? 's' : ''} trouvée{filteredAndSortedExcellences.length !== 1 ? 's' : ''}
          {searchQuery && ` pour "${searchQuery}"`}
          {categoryFilter !== 'all' && ` dans la catégorie "${EXCELLENCE_CATEGORIES[categoryFilter as keyof typeof EXCELLENCE_CATEGORIES].title}"`}
        </div>
      )}
    </div>
  );
};
