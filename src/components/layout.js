import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ThemeProvider } from "@mui/material/styles";
import getTheme from './theme';
import Footer from "./footer";
import Header from "./header";
import { useDarkMode } from "./darkModeContext.js";
import { Fade, Box, Toolbar, Skeleton, Stack, Fab } from "@mui/material";
import "./layout.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ScrollTop from "./scrollTop";

const Layout = ({ children, title }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const { isDarkMode } = useDarkMode();
  const theme = React.useMemo(() => getTheme(isDarkMode), [isDarkMode]);

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        color: theme.palette.text.primary,
        display: "flex",
        flexDirection: "column",
      }}>
        <Header siteTitle={data.site.siteMetadata?.title || `My Site`} title={title} />
        <main>
          <Toolbar id="back-to-top-anchor" style={{ height: "0", minHeight: "0" }} />
          {visible ? (
            <Fade in={visible}>
              <Box
                sx={{
                  padding: theme.spacing(3),
                  maxWidth: "1200px", // Set a maxWidth for content width
                  margin: "0 auto",   // Center the content
                }}
              >
                {children}
              </Box>
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
          <Fab size="small" aria-label="scroll back to top" color="secondary">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default Layout;
