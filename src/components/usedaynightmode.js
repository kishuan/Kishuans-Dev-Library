import { useState, useEffect } from "react";

function useDayNightMode() {
  // This function only runs on the client side after mounting
  const getInitialTheme = () => {
    if (typeof document !== "undefined") {  // Check if document is available
      const themeFromCookie = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/, "$1");
      return themeFromCookie === 'dark';  // Returns true if dark, false otherwise
    }
    return false; // Default theme if document is not available
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    // This effect only runs on the client side
    if (typeof document !== "undefined") {
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.documentElement.classList.toggle("dark-mode", isDarkMode);
      document.cookie = `theme=${isDarkMode ? 'dark' : 'light'}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return [isDarkMode, toggleTheme];
}

export default useDayNightMode;
