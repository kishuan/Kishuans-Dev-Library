import * as React from "react"
import { Link } from "gatsby"
import Icon from "../images/student.png"

const Header = ({ siteTitle }) => (
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
      height={40}
      style={{ margin: 0 }}
      src={Icon}
    />
  </header>
)

export default Header
