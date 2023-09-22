import * as React from "react"
import Grid from "@mui/material/Grid"
import Contact from "./contact.js"

//icons
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import YouTubeIcon from "@mui/icons-material/YouTube"

function Footer() {
  return (
    <footer
      style={{
        marginTop: `var(--space-5)`,
        fontSize: `var(--font-sm)`,
      }}
    >
      <Grid
        container
        spacing={{ xs: 1, md: 2 }}
        sx={{ justifyContent: `center`, textAlign: "center" }}
      >
        <Grid item xs={12} sm={2}>
          <Contact />
        </Grid>
        <Grid item xs={12} sm={4}>
          © {new Date().getFullYear()} &middot; kishuan's.
        </Grid>
        <Grid item xs={12} sm={2}>
          <a
            href="https://www.linkedin.com/in/kishuan-espiritu/"
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "1rem" }}
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://www.youtube.com/@kishuan7355"
            target="_blank"
            rel="noreferrer"
            style={{ marginRight: "1rem" }}
          >
            <YouTubeIcon />
          </a>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer
