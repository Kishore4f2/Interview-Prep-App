import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { themeMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const themes = [
    { value: 'light', icon: '☀️', label: 'Light' },
    { value: 'dark', icon: '🌙', label: 'Dark' },
    { value: 'system', icon: '💻', label: 'System' },
  ];

  return (
    <div className="theme-toggle" ref={dropdownRef}>
      <button
        className="theme-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme"
      >
        {themeMode === 'light' && '☀️'}
        {themeMode === 'dark' && '🌙'}
        {themeMode === 'system' && '💻'}
      </button>
      {isOpen && (
        <div className="theme-dropdown">
          {themes.map((theme) => (
            <button
              key={theme.value}
              className={`theme-option ${themeMode === theme.value ? 'active' : ''}`}
              onClick={() => {
                toggleTheme(theme.value);
                setIsOpen(false);
              }}
            >
              <span className="theme-icon">{theme.icon}</span>
              <span className="theme-label">{theme.label}</span>
              {themeMode === theme.value && <span className="theme-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

