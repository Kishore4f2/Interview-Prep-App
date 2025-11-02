import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'system';
  });

  const [actualTheme, setActualTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') return 'dark';
    if (saved === 'light') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    if (themeMode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        setActualTheme(e.matches ? 'dark' : 'light');
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      
      setActualTheme(mediaQuery.matches ? 'dark' : 'light');
      root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      setActualTheme(themeMode);
      root.setAttribute('data-theme', themeMode);
    }
  }, [themeMode]);

  const toggleTheme = (mode) => {
    setThemeMode(mode);
    localStorage.setItem('theme', mode);
  };

  return (
    <ThemeContext.Provider value={{ themeMode, actualTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

