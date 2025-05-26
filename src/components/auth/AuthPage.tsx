
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ExcellenceFlashLogo } from '@/components/ExcellenceFlashLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (isSignUp && !fullName.trim()) {
      setError('Le nom complet est requis');
      setLoading(false);
      return;
    }

    try {
      const { error } = isSignUp 
        ? await signUp(email, password, fullName)
        : await signIn(email, password);

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect');
        } else if (error.message.includes('User already registered')) {
          setError('Un compte existe déjà avec cet email');
        } else if (error.message.includes('Password should be at least')) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
        } else {
          setError(error.message);
        }
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="max-w-md w-full mx-4">
        <div 
          className="rounded-lg shadow-xl p-8 border"
          style={{ 
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <ExcellenceFlashLogo size={48} />
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Excellence Flash
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
              {isSignUp ? 'Créer votre compte' : 'Connectez-vous à votre compte'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg flex items-center space-x-2" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
              <AlertCircle size={16} className="text-red-500" />
              <span className="text-sm text-red-600">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                  Nom complet
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                    focusRing: 'var(--accent-orange)'
                  }}
                  placeholder="Votre nom complet"
                  required={isSignUp}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  borderColor: 'var(--border-subtle)',
                  color: 'var(--text-primary)'
                }}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: 'var(--text-primary)' }}>
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {isSignUp && (
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  Au moins 6 caractères
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50"
              style={{ 
                backgroundColor: 'var(--accent-orange)',
                color: 'white'
              }}
            >
              {loading ? 'Chargement...' : (isSignUp ? 'Créer le compte' : 'Se connecter')}
            </button>
          </form>

          {/* Toggle between sign in/up */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
                setEmail('');
                setPassword('');
                setFullName('');
              }}
              className="text-sm hover:underline"
              style={{ color: 'var(--accent-orange)' }}
            >
              {isSignUp 
                ? 'Déjà un compte ? Se connecter' 
                : 'Pas encore de compte ? Créer un compte'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
