import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Container from "@mui/material/Container"
import Footer from "./footer"
import Header from "./header"
import { useDarkMode } from "./darkModeContext.js"

import "./layout.css"

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

  const { isDarkMode } = useDarkMode()

  // Derived theme based on isDarkMode
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  )

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header
          siteTitle={data.site.siteMetadata?.title || `Kishuan's Dev Space`}
        />
        <main>{children}</main>
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default Layout
