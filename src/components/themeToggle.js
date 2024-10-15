import React from 'react';
import { useDarkMode } from './darkModeContext'; // Import useDarkMode if you need state management from context
import MaterialUISwitch from './switch.js';

const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // Use context if needed

  const toggleTheme = () => {
    // Toggle the dark mode state
    toggleDarkMode();

    // Update the cookie to reflect the new theme
    const newTheme = !isDarkMode ? 'dark' : 'light';
    document.cookie = `theme=${newTheme}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
    
    // Remove window.location.reload() to avoid reloading the entire page
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
