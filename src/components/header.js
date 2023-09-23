import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import Contact from "./contact.js"

const Header = ({ siteTitle }) => {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if the screen width is greater than 768px
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
          display: "flex", // Add flex display
          alignItems: "center", // Center items vertically
        }}
      >
        {/* Conditionally render the image based on screen width */}
        {isMobile ? (
          <img
            alt=""
            height={80}
            style={{
              margin: 0,
              padding: 0,
              display: "none", // Hide the image on mobile
            }}
            id="kish-icon"
            src="/KishIcon_Outlined.png"
          />
        ) : (
          <img
            alt=""
            height={80}
            style={{
              margin: 0,
              padding: 0,
            }}
            id="kish-icon"
            src="/KishIcon_Outlined.png"
          />
        )}

        <span style={{ marginLeft: "10px" }}>{siteTitle}</span>
      </Link>

      <Contact />
    </header>
  )
}

export default Header
