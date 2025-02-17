// src/components/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#474e68"
    },
    secondary: {
      main: "#7f8c9d"
    },
    background: {
      default: "#ecf2ff",
      paper: "#f9f9f9"
    },
    text: {
      primary: "#33354a",
      secondary: "#626a82"
    }
  }
});

export default theme;
