// src/components/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#474e68"
    },
    secondary: {
      main: "#33354a"
    },
    background: {
      default: "#ecf2ff",
      paper: "#ecf2ff"
    },
    text: {
      primary: "#33354a",
      secondary: "#474e68",
    }
  }
});

export default theme;
