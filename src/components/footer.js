import * as React from "react"
// import Contact from "./contact.js"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"

//icons
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTubeIcon from "@mui/icons-material/YouTube"

function Footer() {
  return (
    <footer
      style={{
        fontSize: `var(--font-sm)`,
      }}
    >
      <Divider>
        <Typography variant="caption">
          © {new Date().getFullYear()} &middot; kishuan's.
        </Typography>
      </Divider>
      <Stack direction="row" spacing={2} justifyContent="center">
        {/* <Contact /> */}
        <IconButton
          href="https://www.linkedin.com/in/kishuan-espiritu/"
          target="_blank"
          rel="noreferrer"
          size="large"
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          href="https://www.youtube.com/@kishuan7355"
          target="_blank"
          rel="noreferrer"
          variant="text" // or "text", "outlined" depending on your preference
          color="default" // or "default", "secondary", etc.
          size="large"
        >
          <YouTubeIcon />
        </IconButton>
      </Stack>
    </footer>
  )
}

export default Footer
