
import React, { useState, useMemo } from 'react';
import { Excellence } from '../types';
import { EXCELLENCE_CATEGORIES } from '../types';
import { Eye, Edit2, X, ChevronUp, ChevronDown } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ExcellenceListViewProps {
  excellences: Excellence[];
  onView: (excellence: Excellence) => void;
  onEdit: (excellence: Excellence) => void;
  onDelete: (id: string) => void;
  getExperienceCount: (excellenceId: string) => number;
}

type SortField = 'name' | 'category' | 'experienceCount' | 'created_at';
type SortDirection = 'asc' | 'desc';

export const ExcellenceListView: React.FC<ExcellenceListViewProps> = ({
  excellences,
  onView,
  onEdit,
  onDelete,
  getExperienceCount
}) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette excellence ?')) {
      onDelete(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredAndSortedExcellences = useMemo(() => {
    let filtered = excellences.filter(excellence => {
      const matchesCategory = categoryFilter === 'all' || excellence.category === categoryFilter;
      const matchesSearch = searchQuery === '' || 
        excellence.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excellence.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = EXCELLENCE_CATEGORIES[a.category].title;
          bValue = EXCELLENCE_CATEGORIES[b.category].title;
          break;
        case 'experienceCount':
          aValue = getExperienceCount(a.id);
          bValue = getExperienceCount(b.id);
          break;
        case 'created_at':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        default:
          return 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [excellences, sortField, sortDirection, categoryFilter, searchQuery, getExperienceCount]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />;
  };

  if (excellences.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <span className="text-2xl">📋</span>
        </div>
        <h3 className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
          Aucune excellence
        </h3>
        <p style={{ color: 'var(--text-muted)' }} className="mb-4">
          Créez votre première excellence pour commencer votre cartographie !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Rechercher dans les excellences..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
          />
        </div>
        <div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
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
      </div>

      {/* Table */}
      <div 
        className="rounded-lg border overflow-hidden"
        style={{ 
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border-subtle)'
        }}
      >
        <Table>
          <TableHeader>
            <TableRow style={{ borderColor: 'var(--border-subtle)' }}>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort('name')}
                style={{ color: 'var(--text-primary)' }}
              >
                <div className="flex items-center space-x-2">
                  <span>Nom</span>
                  <SortIcon field="name" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort('category')}
                style={{ color: 'var(--text-primary)' }}
              >
                <div className="flex items-center space-x-2">
                  <span>Catégorie</span>
                  <SortIcon field="category" />
                </div>
              </TableHead>
              <TableHead style={{ color: 'var(--text-primary)' }}>
                Description
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort('experienceCount')}
                style={{ color: 'var(--text-primary)' }}
              >
                <div className="flex items-center space-x-2">
                  <span>Expériences</span>
                  <SortIcon field="experienceCount" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer select-none"
                onClick={() => handleSort('created_at')}
                style={{ color: 'var(--text-primary)' }}
              >
                <div className="flex items-center space-x-2">
                  <span>Créée le</span>
                  <SortIcon field="created_at" />
                </div>
              </TableHead>
              <TableHead style={{ color: 'var(--text-primary)' }}>
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedExcellences.map((excellence, index) => {
              const category = EXCELLENCE_CATEGORIES[excellence.category];
              const experienceCount = getExperienceCount(excellence.id);
              
              return (
                <TableRow 
                  key={excellence.id}
                  style={{ 
                    borderColor: 'var(--border-subtle)',
                    backgroundColor: index % 2 === 0 ? 'var(--bg-secondary)' : 'var(--bg-tertiary)'
                  }}
                >
                  <TableCell>
                    <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                      {excellence.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div 
                      className="inline-block px-2 py-1 rounded text-xs font-medium"
                      style={{
                        backgroundColor: category.bgColor,
                        color: category.color
                      }}
                    >
                      {category.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div 
                      className="max-w-xs truncate text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                      title={excellence.description}
                    >
                      {excellence.description || '—'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {experienceCount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                      {formatDate(excellence.created_at)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onView(excellence)}
                        className="p-2 rounded transition-colors"
                        style={{ 
                          color: 'var(--text-secondary)',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Voir"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(excellence)}
                        className="p-2 rounded transition-colors"
                        style={{ 
                          color: 'var(--text-secondary)',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Modifier"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(excellence.id)}
                        className="p-2 rounded transition-colors"
                        style={{ 
                          color: 'var(--text-secondary)',
                          backgroundColor: 'transparent'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        title="Supprimer"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredAndSortedExcellences.length === 0 && (excellences.length > 0) && (
        <div className="text-center py-8">
          <p style={{ color: 'var(--text-muted)' }}>
            Aucune excellence ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};
