import { useState, useEffect } from "react";

function useDayNightMode() {
  // Initial state is derived from localStorage or default value
  const storedValue = 
    typeof window !== "undefined" && 
    localStorage.getItem("isDarkMode");
    
  const initialIsDarkMode = storedValue ? JSON.parse(storedValue) : false;

  const [isDarkMode, setIsDarkMode] = useState(initialIsDarkMode);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    // Add or remove the dark mode class from the body
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.documentElement.classList.toggle("dark-mode", isDarkMode);

    // Update the localStorage only if there's a change
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  return [isDarkMode, toggleTheme];
}

export default useDayNightMode;
