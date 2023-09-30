import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Contact from "./contact.js"
import useDayNightMode from "./usedaynightmode.js"
import { useTheme } from "@mui/material/styles"
import { useDarkMode } from "./darkModeContext.js"
import Divider from "@mui/material/Divider"

const Header = ({ siteTitle }) => {
  const [isMobile, setIsMobile] = useState(true)
  const { isDarkMode, toggleDarkMode } = useDarkMode()
  const theme = useTheme()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const lightModeIcon = "/KishIcon_Outlined.png"
  const darkModeIcon = "/KishIcon_Outlined_Light.png"
  const iconImage = theme.palette.mode === "dark" ? darkModeIcon : lightModeIcon

  return (
    <>
      <header
        style={{
          margin: `0.5em`,
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
      {/* Divider wrapped in its own container */}
      <div style={{ padding: "0 var(--space-2)"}}>
        <Divider component="div" role="presentation">
          {!isMobile && `decolonizing technology.`}
        </Divider>
      </div>
    </>
  )
}

export default Header
