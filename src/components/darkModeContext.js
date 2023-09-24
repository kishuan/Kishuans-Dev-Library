// DarkModeContext.js
import React, { createContext, useContext } from "react";
import useDayNightMode from "./usedaynightmode"; // Import the hook

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
  const [isDarkMode, toggleDarkMode] = useDayNightMode(); // Use the hook

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}
