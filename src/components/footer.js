import * as React from "react"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"

import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTubeIcon from "@mui/icons-material/YouTube"

function Footer() {
  return (
    <footer style={{ fontSize: `var(--font-lg)` }}>
      <Divider>
        <Typography variant="caption">
          © {new Date().getFullYear()} &middot; kishuan's.
        </Typography>
      </Divider>
      <Stack direction="row" spacing={3} justifyContent="center">
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
          variant="text"
          color="default"
          size="large"
        >
          <YouTubeIcon />
        </IconButton>
      </Stack>
    </footer>
  )
}

export default Footer
