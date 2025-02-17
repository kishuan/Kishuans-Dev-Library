// import { createTheme } from '@mui/material/styles';

// const getTheme = (isDarkMode) => createTheme({
//   palette: {
//     mode: isDarkMode ? 'dark' : 'light',
//     primary: {
//       main: isDarkMode ? '#ecf2ff' : '#474e68',
//       light: isDarkMode ? '#ecf2ff' : '#474e68',
//       dark: isDarkMode ? '#ecf2ff' : '#474e68',
//       contrastText: '#fff',
//     },
//     secondary: {
//       main: isDarkMode ? '#ecf2ff' : '#474e68',
//     },
//     background: {
//       default: isDarkMode ? '#33354a' : '#e1e8ff', // nav background 
//       paper: isDarkMode ? '#33354a' : '#e1e8ff',
//     },
//     text: {
//       primary: isDarkMode ? '#b0c7ee' : '#33354a',
//       secondary: isDarkMode ? '#ecf2ff' : '#626a82',
//     }
//   }
// });

// export default getTheme;

import { createTheme } from '@mui/material/styles';

const getTheme = (isDarkMode) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: isDarkMode ? '#90caf9' : '#474e68', // Light blue in dark mode, grey in light mode
      light: isDarkMode ? '#bbdefb' : '#626a82',
      dark: isDarkMode ? '#42a5f5' : '#1e1e2e',
      contrastText: isDarkMode ? '#000' : '#fff',
    },
    secondary: {
      main: isDarkMode ? '#f48fb1' : '#7f8c9d', // Pink in dark mode, muted grey in light mode
    },
    background: {
      default: isDarkMode ? '#1e1e2e' : '#ecf2ff', // DARK MODE FIX: now actually dark
      paper: isDarkMode ? '#2c2c3e' : '#f9f9f9', // Card background fix
    },
    text: {
      primary: isDarkMode ? '#ffffff' : '#33354a', // White text in dark mode, black in light
      secondary: isDarkMode ? '#d1d1e0' : '#626a82',
    }
  }
});

export default getTheme;

