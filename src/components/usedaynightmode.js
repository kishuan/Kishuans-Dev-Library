import { useState, useEffect } from "react";
import Dark_Icon from "../images/KishIcon_Outlined.png";
import Light_Icon from "../images/KishIcon_Outlined_Light.png";

function useDayNightMode() {
  // Check if the icons are already in local storage
  const darkIcon = localStorage.getItem("darkIcon");
  const lightIcon = localStorage.getItem("lightIcon");

  // Preload the icons if they're not in local storage
  if (!darkIcon || !lightIcon) {
    const darkIconImage = new Image();
    darkIconImage.src = Dark_Icon;
    darkIconImage.onload = () => {
      localStorage.setItem("darkIcon", Dark_Icon);
    };

    const lightIconImage = new Image();
    lightIconImage.src = Light_Icon;
    lightIconImage.onload = () => {
      localStorage.setItem("lightIcon", Light_Icon);
    };
  }

  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== "undefined" &&
    localStorage.getItem("isDarkMode") !== null &&
    localStorage.getItem("isDarkMode") === "true"
  );

  useEffect(() => {
    const initialMode = isDarkMode ? "dark-mode" : "";
    if (initialMode) {
      document.body.classList.add(initialMode);
      document.documentElement.classList.add(initialMode);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const icon = isDarkMode ? lightIcon : darkIcon;

    if (typeof window !== "undefined") {
      localStorage.setItem("isDarkMode", isDarkMode);
      document.body.classList.toggle("dark-mode", isDarkMode);
      document.documentElement.classList.toggle("dark-mode", isDarkMode);
      const img = document.getElementById("kish-icon");
      if (img) {
        img.src = icon;
      }
    }
  }, [isDarkMode, darkIcon, lightIcon]);

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

  return [isDarkMode, toggleTheme];
}

export default useDayNightMode;
