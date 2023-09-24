import React, { useState, useEffect, useContext } from "react"; // Added useContext
import { Link } from "gatsby";
import Contact from "./contact.js";
import useDayNightMode from "./usedaynightmode.js";
import { styled, useTheme } from "@mui/material/styles"; // Import useTheme instead of ThemeContext
import { useDarkMode } from "./darkModeContext"; // <-- Import the useDarkMode hook

const Header = ({ siteTitle }) => {
  const [isMobile, setIsMobile] = useState(true);
  const { isDarkMode, toggleDarkMode } = useDarkMode(); // <-- Use the hook
  const theme = useTheme();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const lightModeIcon = "/KishIcon_Outlined.png";
  const darkModeIcon = "/KishIcon_Outlined_Light.png";
  const iconImage = theme.palette.mode === 'dark' ? darkModeIcon : lightModeIcon; // Modified this line

  return (
    <header
      style={{
        margin: `0`,
        padding: `var(--space-2) var(--size-gutter)`,
        display: `flex`,
        alignItems: `center`,
        justifyContent: `space-between`,
      }}
    >
      <Link
        to="/"
        style={{
          fontSize: `var(--font-lg)`,
          textDecoration: `none`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          alt="Kish Icon"
          height={80}
          style={{
            margin: 0,
            padding: 0,
            display: isMobile ? "none" : "block",
          }}
          id="kish-icon"
          src={iconImage}
        />
        <span style={{ marginLeft: "10px" }}>{siteTitle}</span>
      </Link>
      <Contact />
    </header>
  );
};

export default Header;
