import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import { Link } from "gatsby"
import useDayNightMode from "./usedaynightmode"
import Switch from "@mui/material/Switch"
import Footer from "./footer"
import Box from "@mui/material/Box"

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

  const [isDarkMode, toggleTheme] = useDayNightMode()

  React.useEffect(() => {
    const initialMode = isDarkMode ? "dark-mode" : ""
    if (initialMode) {
      document.body.classList.add(initialMode)
      document.documentElement.classList.add(initialMode)
    }
  }, [isDarkMode])

  return (
    <>
      <Container>
        <Header
          siteTitle={data.site.siteMetadata?.title || `Kishuan's Dev Space`}
        />
        <Divider component="div" role="presentation">
          on responsible innovation.
        </Divider>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Breadcrumbs
            aria-label="breadcrumb"
            spacing={3}
            sx={{ fontFamily: `courier new` }}
          >
            <Link to="/">Home</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/projects">Projects</Link>
          </Breadcrumbs>
          <Switch
            checked={isDarkMode}
            onChange={toggleTheme}
            inputProps={{ "aria-label": "controlled" }}
            color="default"
          />
        </Box>
        <main>{children}</main>
        <Footer/>
      </Container>
    </>
  )
}

export default Layout
