import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Container from "@mui/material/Container"
import Footer from "./footer"
import Header from "./header"
import { useDarkMode } from "./darkModeContext.js"
import { Fade } from "@mui/material"
import "./layout.css"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"

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

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? "dark" : "light",
        },
      }),
    [isDarkMode]
  )

  const [visible, setVisible] = React.useState(false) // start with content hidden

  // Show content after a set delay
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, 500) // 500ms delay before content fades in

    return () => clearTimeout(timer)
  }, []) // This effect should only run once when the component mounts

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Header
          siteTitle={data.site.siteMetadata?.title || `Kishuan's Dev Space`}
        />
        <main>
          {visible ? (
            <Fade in={visible}>
              <div>{children}</div>
            </Fade>
          ) : (
            <Stack spacing={3} alignItems="center">
              <Skeleton variant="rectangular" height={80} width="80%" />
              <Skeleton variant="rectangular" height={50} width="80%" />
              <Skeleton variant="rectangular" height="60vh" width="80%" />
            </Stack>
          )}
        </main>
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default Layout
