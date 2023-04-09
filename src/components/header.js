import React from "react";
import { Link } from "gatsby";
import useDayNightMode from "./usedaynightmode";


const Header = ({ siteTitle }) => {
  const [icon] = useDayNightMode();

  return (
    <header
      style={{
        margin: `0 auto`,
        padding: `var(--space-4) var(--size-gutter)`,
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
        }}
      >
        {siteTitle}
      </Link>
      <img
        alt="Icon"
        height={90}
        style={{ margin: 0 }}
        id="kish-icon"
        src={icon}
      />
    </header>
  );
}

export default Header;
