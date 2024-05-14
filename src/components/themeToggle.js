import React from 'react';
import { useDarkMode } from './darkModeContext'; // Import useDarkMode if you need state management from context
import MaterialUISwitch from './switch.js';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use context if needed

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.cookie = `theme=${newTheme}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
    window.location.reload(); // Reload the page to apply the theme server-side
  };

  return (
    <MaterialUISwitch
      checked={isDarkMode}
      onChange={toggleTheme}
      inputProps={{ "aria-label": "controlled" }}
      name="modeToggle"
    />
  );
};

export default ThemeToggle;
