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
import Fab from "@mui/material/Fab"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"

function ScrollTop(props) {
  const { children, window } = props
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  })

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    )

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      })
    }
  }

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  )
}

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
          secondary: {
            main: "#2c3e50",
          },
          dark: "#474e68",
          light: "#ecf2ff",
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
          <Toolbar
            id="back-to-top-anchor"
            style={{ height: "0", minHeight: "0" }}
          />
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

        <ScrollTop>
          <Fab
            size="small"
            aria-label="scroll back to top"
            sx={{color: isDarkMode ? "dark" : "light", backgroundColor: isDarkMode ? "light" : "dark" }}
          >
            <KeyboardArrowUpIcon/>
          </Fab>
        </ScrollTop>
        <Footer />
      </Container>
    </ThemeProvider>
  )
}

export default Layout
