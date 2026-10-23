/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem('theme'); } catch { /* Storage may be disabled. */ }
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Default theme
  });

  useEffect(() => {
    try { localStorage.setItem('theme', theme); } catch { /* Theme still works without storage. */ }
    document.documentElement.setAttribute('data-theme', theme);
    // Also update body background to prevent flashes
    document.body.style.backgroundColor = theme === 'dark' ? '#0a0a0a' : '#ffffff';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
