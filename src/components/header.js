import React, { useState } from "react"
import { Link } from "gatsby"

// import useDayNightMode from "./usedaynightmode.js"
import { useDarkMode } from "./darkModeContext.js"
import Divider from "@mui/material/Divider"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Logo from "./logo.js"

// For AppBar display on Mobile
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useTheme, useMediaQuery, Button, Drawer, List, ListItem, ListItemText  } from "@mui/material"
import { Helmet } from "react-helmet"

import ThemeToggle from './themeToggle';

import CustomAppBar from "./CustomAppBar.js"


const Header = ({ siteTitle, title }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
        {['Home', 'Blog', 'Projects', 'Contact'].map((text) => (
          <ListItem button key={text} component={Link} to={text === 'Home' ? "/" : `/${text.toLowerCase()}`}>
            <ListItemText primary={text} />
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://kishuan.netlify.app/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://kishuan.netlify.app/blog",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Projects",
                item: "https://kishuan.netlify.app/projects",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Contact",
                item: "https://kishuan.netlify.app/contact",
              },
            ],
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
          ml: { xs: 0, sm: "4em" }, // 'ml' is marginLeft
          mr: { xs: 0, sm: "4em" }, // 'mr' is marginRight
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: `var(--font-lg)`,
            textDecoration: `none`,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Logo />
          <span style={{ marginLeft: "10px" }}>{siteTitle}</span>
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
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              {drawerList()}
            </Drawer>
          </>

        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', alignItems: 'center', color: 'primary' }}>
            <Link to="/"><Button aria-label="Home">HOME</Button></Link>
            <Link to="/blog"><Button aria-label="Blog">Blog</Button></Link>
            <Link to="/projects"><Button aria-label="projects">Projects</Button></Link>
            <Link to="/contact"><Button aria-label="contact">Contact</Button></Link>
          </Box>
        )}
        <Menu
          id="mobile-nav-menu"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/">Home</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/blog">Blog</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/projects">Projects</Link>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Link to="/contact">Contact</Link>
          </MenuItem>
        </Menu>
      </Box>

      <Divider component="div" role="presentation">
        <Typography variant="overline">{title}</Typography>
      </Divider>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ paddingRight: { xs: 0, sm: 5 } }}
      >

        <ThemeToggle/>

      </Box>
    </>
  )
}

export default Header