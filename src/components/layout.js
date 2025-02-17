import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import Fab from "@mui/material/Fab";
import Skeleton from "@mui/material/Skeleton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import theme from "./theme";
import Footer from "./footer";
import Header from "./header";
import ScrollTop from "./scrollTop";
import "./layout.css";

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

  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: theme.palette.background.default,
          color: theme.palette.text.primary,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Header siteTitle={data.site.siteMetadata?.title || "My Site"} title={title} />
        <main>
          <Toolbar id="back-to-top-anchor" style={{ height: "0", minHeight: "0" }} />
          {visible ? (
            <Fade in={visible}>
              <Box
                sx={{
                  padding: theme.spacing(3),
                  maxWidth: "1200px",
                  margin: "0 auto"
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
          <Fab size="small" aria-label="scroll back to top" color="primary">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
