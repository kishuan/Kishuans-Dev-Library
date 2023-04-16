import { useState, useEffect } from "react";
import Dark_Icon from "../images/KishIcon_Outlined.png";
import Light_Icon from "../images/KishIcon_Outlined_Light.png";

function useDayNightMode() {
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
    localStorage.getItem("isDarkMode") !== null &&
    localStorage.getItem("isDarkMode") === "true"
  );

  useEffect(() => {
    const initialMode = isDarkMode ? "dark-mode" : ""
    if (initialMode) {
      document.body.classList.add(initialMode)
      document.documentElement.classList.add(initialMode)
    }
  }, [isDarkMode])

  useEffect(() => {
    const icon = isDarkMode ? Light_Icon : Dark_Icon;

    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", isDarkMode);
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.documentElement.classList.toggle("dark-mode", isDarkMode);
      const img = document.getElementById("kish-icon");
      if (img) {
        img.src = icon.toString();
      }
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // add or remove the "dark-mode" class on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.documentElement.classList.toggle("dark-mode", isDarkMode);
    }
  }, [isDarkMode]);

  // update the icon on initial render
  useEffect(() => {
    const icon = isDarkMode ? Light_Icon : Dark_Icon;
    const img = document.getElementById("kish-icon");
    if (img) {
      img.src = icon.toString();
    }
  }, [isDarkMode]);

  return [isDarkMode, toggleTheme];
}

export default useDayNightMode;
