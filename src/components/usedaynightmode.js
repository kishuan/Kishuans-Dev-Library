// import { useState, useEffect } from "react";

// function useDayNightMode() {
//   // Check if code is running in the browser
//   const isBrowser = typeof window !== "undefined";

//   // Read the initial theme from cookies if in the browser
//   const getInitialTheme = () => {
//     if (!isBrowser) return false; // Default to light mode if SSR
//     const themeFromCookie = document.cookie.replace(/(?:(?:^|.*;\s*)theme\s*=\s*([^;]*).*$)|^.*$/, "$1");
//     return themeFromCookie === 'dark';  // Returns true if dark, false otherwise
//   };

//   const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

//   useEffect(() => {
//     if (isBrowser) {
//       // Sync the dark mode class with the current theme state
//       document.body.classList.toggle("dark-mode", isDarkMode);
//       document.documentElement.classList.toggle("dark-mode", isDarkMode);

//       // Update the cookie when the theme changes
//       document.cookie = `theme=${isDarkMode ? 'dark' : 'light'}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(prevMode => !prevMode);
//   };

//   return [isDarkMode, toggleTheme];
// }

// export default useDayNightMode;

// src/components/useDayNightMode.js

import { useState, useEffect } from "react";

function useDayNightMode() {
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;
    return document.documentElement.getAttribute("data-theme") === "dark";
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    document.cookie = `theme=${isDarkMode ? 'dark' : 'light'}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
  }, [isDarkMode]);

  return [isDarkMode, () => setIsDarkMode(prev => !prev)];
}

export default useDayNightMode;

