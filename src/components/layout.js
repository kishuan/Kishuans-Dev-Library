import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Footer from "./footer"
import Header from "./header"
import { useDarkMode } from "./darkModeContext.js"
import { Fade } from "@mui/material"
import "./layout.css"
import Skeleton from "@mui/material/Skeleton"
import Stack from "@mui/material/Stack"
import Fab from "@mui/material/Fab"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import ScrollTop from "./scrollTop"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"

const Layout = ({ children, title }) => {
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
    }, 100) // 100ms delay before content fades in

    return () => clearTimeout(timer)
  }, []) // This effect should only run once when the component mounts

  React.useEffect(() => {
    console.log("Current theme:", isDarkMode ? "Dark" : "Light");
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // make sure the container is at least as tall as the viewport
        }}
      >
        <Header
          siteTitle={data.site.siteMetadata?.title || `Kishuan's Dev Space`}
          title={title}
        />
        <main>
          {title && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            ></Box>
          )}
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
            scroll="smooth"
            sx={{
              color: isDarkMode ? theme.palette.dark : theme.palette.light,
              backgroundColor: isDarkMode
                ? theme.palette.light
                : theme.palette.dark,
              "&:hover": {
                backgroundColor: isDarkMode
                  ? theme.palette.light
                  : theme.palette.dark,
                opacity: 0.8,
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default Layout
