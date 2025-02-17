import React, { useState } from "react";
import { Link } from "gatsby";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useTheme, useMediaQuery } from "@mui/material";
import { Helmet } from "react-helmet";

import Logo from "./logo";
import CustomAppBar from "./CustomAppBar";

const Header = ({ siteTitle, title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const toggleDrawer = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Home", "Blog", "Projects", "Contact"].map(text => (
          <ListItem
            button
            key={text}
            component={Link}
            to={text === "Home" ? "/" : `/${text.toLowerCase()}`}
          >
            <ListItemText primary={text} sx={{ color: theme.palette.text.primary }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kishuan.netlify.app/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://kishuan.netlify.app/blog" },
              { "@type": "ListItem", position: 3, name: "Projects", item: "https://kishuan.netlify.app/projects" },
              { "@type": "ListItem", position: 4, name: "Contact", item: "https://kishuan.netlify.app/contact" }
            ]
          })}
        </script>
      </Helmet>
      <CustomAppBar siteTitle={siteTitle} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: "1em",
          ml: { xs: 0, sm: "4em" },
          mr: { xs: 0, sm: "4em" }
        }}
      >
        <Link
          to="/"
          style={{
            color: "inherit",
            fontSize: "var(--font-lg)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Logo />
          <span style={{ marginLeft: "10px", color: theme.palette.text.primary }}>
            {siteTitle}
          </span>
        </Link>
        {isMobile ? (
          <>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList()}
            </Drawer>
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "end", alignItems: "center" }}>
            <Link to="/">
              <Button
                aria-label="Home"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textTransform: "uppercase"
                }}
              >
                HOME
              </Button>
            </Link>
            <Link to="/blog">
              <Button
                aria-label="Blog"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textTransform: "uppercase"
                }}
              >
                Blog
              </Button>
            </Link>
            <Link to="/projects">
              <Button
                aria-label="Projects"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textTransform: "uppercase"
                }}
              >
                Projects
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                aria-label="Contact"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  textTransform: "uppercase"
                }}
              >
                Contact
              </Button>
            </Link>
          </Box>
        )}
        <Menu
          id="mobile-nav-menu"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/" style={{ color: theme.palette.text.primary }}>
              Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/blog" style={{ color: theme.palette.text.primary }}>
              Blog
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/projects" style={{ color: theme.palette.text.primary }}>
              Projects
            </Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/contact" style={{ color: theme.palette.text.primary }}>
              Contact
            </Link>
          </MenuItem>
        </Menu>
      </Box>
      <Divider component="div" role="presentation">
        <Typography variant="overline">{title}</Typography>
      </Divider>
    </>
  );
};

export default Header;
