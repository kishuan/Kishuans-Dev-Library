import { useState, useEffect } from "react";

function useDayNightMode() {
  // Read the initial theme from cookies instead of localStorage
  const getInitialTheme = () => {
    const themeFromCookie = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/, "$1");
    return themeFromCookie === 'dark';  // Returns true if dark, false otherwise
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    // Sync the dark mode class with the current theme state
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.documentElement.classList.toggle("dark-mode", isDarkMode);

    // Update the cookie when the theme changes
    document.cookie = `theme=${isDarkMode ? 'dark' : 'light'}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return [isDarkMode, toggleTheme];
}

export default useDayNightMode;
