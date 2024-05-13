import React, { useState } from 'react';
import { AppBar, Toolbar, Slide, useTheme, Box, Button, useMediaQuery, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useDarkMode } from './darkModeContext';
import { Link } from 'gatsby';
import MaterialUISwitch from "./switch.js";
import MenuIcon from '@mui/icons-material/Menu';  // Import the MenuIcon for the button

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50
  });

  return (
    <Slide appear={false} direction="down" in={trigger}>
      {children}
    </Slide>
  );
}

const CustomAppBar = ({ siteTitle }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const appBarStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
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
    <HideOnScroll>
      <AppBar position="fixed" style={appBarStyle}>
        <Toolbar>
          <Box sx={{ flexShrink: 0 }}>
            <MaterialUISwitch
              checked={isDarkMode}
              onChange={toggleDarkMode}
              inputProps={{ 'aria-label': 'controlled' }}
              name="modeToggle"
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
                  anchor="top"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  {drawerList()}
                </Drawer>
              </>
            ) : (
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                <Link to="/"><Button aria-label="Home">HOME</Button></Link>
                <Link to="/blog"><Button aria-label="Blog">Blog</Button></Link>
                <Link to="/projects"><Button aria-label="projects">Projects</Button></Link>
                <Link to="/contact"><Button aria-label="contact">Contact</Button></Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
};

export default CustomAppBar;
