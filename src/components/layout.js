import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import { Link } from "gatsby"
import useDayNightMode from "./usedaynightmode"
import Switch from "@mui/material/Switch"

import "./layout.css"

import Header from "./header"

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

  const [isDarkMode, setIsDarkMode] = useDayNightMode()

  const handleChange = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      <Container>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Divider component="div" role="presentation">
          on responsible innovation.
        </Divider>
        <Breadcrumbs
          aria-label="breadcrumb"
          spacing={3}
          sx={{ fontFamily: `courier new` }}
        >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Switch
            checked={isDarkMode}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            color="default"
          />
        </Breadcrumbs>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot; kishuan's.
        </footer>
      </Container>
    </>
  )
}

export default Layout
