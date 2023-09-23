import React from "react";
import { Link } from "gatsby";
import Contact from "./contact.js";

const Header = ({ siteTitle }) => {
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
        <img
          alt=""
          height={80}
          style={{ margin: 0, padding: 0 }}
          id="kish-icon"
          src="/static/KishIcon_Outlined.png"
        />
        <span style={{ marginLeft: "10px" }}>{siteTitle}</span>
      </Link>
      <Contact />
    </header>
  );
};

export default Header;