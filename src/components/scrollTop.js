import * as React from "react"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import {useTheme} from "@mui/material/styles"
import { Fade } from "@mui/material"
import Box from "@mui/material/Box"

function ScrollTop(props) {
    const theme = useTheme()
    const { children, window } = props
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 100,
    })
  
    const handleClick = event => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        "#back-to-top-anchor"
      )
  
      if (anchor) {
        anchor.scrollIntoView({
          block: "center",
        })
      }
    }
  
    return (
      <Fade in={trigger}>
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{
            position: "fixed",
            bottom: theme.spacing(2), // Equivalent to 16px by default
            right: theme.spacing(2),
            [theme.breakpoints.up("sm")]: {
              bottom: theme.spacing(6.25), // Equivalent to 50px by default
              right: theme.spacing(10), // Equivalent to 80px by default
            },
          }}
        >
          {children}
        </Box>
      </Fade>
    )
  }

  export default ScrollTop; 