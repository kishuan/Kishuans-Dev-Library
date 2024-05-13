import { createTheme } from '@mui/material/styles';

const getTheme = (isDarkMode) => createTheme({
  palette: {
    mode: isDarkMode ? 'dark' : 'light',
    primary: {
      main: isDarkMode ? '#ecf2ff' : '#474e68',
      light: isDarkMode ? '#ecf2ff' : '#474e68',
      dark: isDarkMode ? '#ecf2ff' : '#474e68',
      contrastText: '#fff',
    },
    secondary: {
      main: isDarkMode ? '#ecf2ff' : '#474e68',
    },
    background: {
      default: isDarkMode ? '#33354a' : '#e1e8ff', // nav background 
      paper: isDarkMode ? '#33354a' : '#e1e8ff',
    },
    text: {
      primary: isDarkMode ? '#b0c7ee' : '#33354a',
      secondary: isDarkMode ? '#ecf2ff' : '#626a82',
    }
  }
});

export default getTheme;
