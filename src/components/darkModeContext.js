// // DarkModeContext.js
// import React, { createContext, useContext } from "react";
// import useDayNightMode from "./usedaynightmode"; // Import the hook

// const DarkModeContext = createContext();

// export function DarkModeProvider({ children }) {
//   const [isDarkMode, toggleDarkMode] = useDayNightMode(); // Use the hook

//   return (
//     <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
//       {children}
//     </DarkModeContext.Provider>
//   );
// }

// export function useDarkMode() {
//   return useContext(DarkModeContext);
// }

import React, { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      // Read theme from <html data-theme="light | dark"> or cookies
      const storedTheme = document.documentElement.getAttribute("data-theme");
      return storedTheme === "dark";
    }
    return false; // Default to light mode in SSR
  });

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);

    // Update <html> attribute
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save to cookie
    document.cookie = `theme=${newTheme}; path=/; expires=${new Date(Date.now() + 31536000 * 1000).toUTCString()}`;
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}

