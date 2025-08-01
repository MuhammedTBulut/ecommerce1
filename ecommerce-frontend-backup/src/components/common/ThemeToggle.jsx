import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-icon">
        {isDark ? (
          <span className="sun-icon">☀️</span>
        ) : (
          <span className="moon-icon">🌙</span>
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;