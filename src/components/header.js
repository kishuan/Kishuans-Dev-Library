import React, { useState } from "react"
import { Link } from "gatsby"

// import useDayNightMode from "./usedaynightmode.js"
import { useDarkMode } from "./darkModeContext.js"
import Divider from "@mui/material/Divider"
import Switch from "@mui/material/Switch"
import { styled } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import Logo from "./logo.js"

// For AppBar display on Mobile
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { useTheme, useMediaQuery } from "@mui/material"
import { Helmet } from "react-helmet"

const Header = ({ siteTitle, title }) => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const MaterialUISwitch = styled(Switch)(() => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      transition: "transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: isDarkMode ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.secondary.main,
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: isDarkMode ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }))

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
              // ... Add more items as required for your navigation
            ],
          })}
        </script>
      </Helmet>
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
          <IconButton
            size="large"
            aria-label="open navigation menu"
            aria-controls="mobile-nav-menu"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <Breadcrumbs aria-label="breadcrumb" spacing={3}>
            <Link to="/">
              <Typography aria-label="Home" variant="overline" gutterBottom>
                HOME
              </Typography>
            </Link>
            <Link to="/blog">
              <Typography aria-label="Blog" variant="overline" gutterBottom>
                Blog
              </Typography>
            </Link>
            <Link to="/projects">
              <Typography aria-label="projects" variant="overline" gutterBottom>
                Projects
              </Typography>
            </Link>
            <Link to="/contact">
              <Typography aria-label="contact" variant="overline" gutterBottom>
                Contact
              </Typography>
            </Link>
          </Breadcrumbs>
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
        {/* {!isMobile && (
          <Typography variant="subtitle1">decolonizing technology.</Typography>
        )} */}
        <Typography variant="overline">{title}</Typography>
      </Divider>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ paddingRight: { xs: 0, sm: 5 } }}
      >
        <MaterialUISwitch
          checked={isDarkMode}
          onChange={toggleDarkMode}
          inputProps={{ "aria-label": "controlled" }}
          name="modeToggle"
        />
      </Box>
    </>
  )
}

export default Header
