import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

import "./layout.css"

import Header from "./header"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <ul style={{display: `flex`, justifyContent: `start`, gap: `0.5em`}}>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Projects</Link>
      </ul>
      <hr></hr>
      <div>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot;
        </footer>
      </div>
    </>
  )
}

export default Layout
