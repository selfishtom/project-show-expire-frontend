import React, { useState } from 'react';
import { Search } from './components/Search/Search';
import { LanguageSelector } from './components/LanguageSelector/LanguageSelector';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <header className="bg-base-100 shadow-md rounded-t-lg">
          <div className="px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-base-content mb-6">{t('userSearch')}</h1>
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle focus:outline-none"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
            <LanguageSelector />
          </div>
        </header>
        <main className="bg-base-100 shadow-md rounded-b-lg">
          <Search />
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
