import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import { Link } from "gatsby"
import useDayNightMode from "./usedaynightmode"
import Switch from "@mui/material/Switch"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Contact from "./contact.js"

//icons
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTubeIcon from "@mui/icons-material/YouTube"

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
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Divider component="div" role="presentation">
          on responsible innovation.
        </Divider>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          inputProps={{ "aria-label": "controlled" }}
          color="default"
        />
        <Breadcrumbs
          aria-label="breadcrumb"
          spacing={3}
          sx={{ fontFamily: `courier new` }}
        >
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
        </Breadcrumbs>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ justifyContent: `center` }}
          >
            <Grid item xs={2}>
              <Contact />
            </Grid>
            <Grid item xs={2}>
              © {new Date().getFullYear()} &middot; kishuan's.
            </Grid>
            <Grid item xs={2}>
              <Stack direction="row" spacing={1}>
                <a
                  href="https://www.linkedin.com/in/kishuan-espiritu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon />
                </a>
                <a
                  href="https://www.youtube.com/@kishuan7355"
                  target="_blank"
                  rel="noreferrer"
                >
                  <YouTubeIcon />
                </a>
              </Stack>
            </Grid>
          </Grid>
        </footer>
      </Container>
    </>
  )
}

export default Layout
