import * as React from "react";
import { useState, useEffect } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";

function ScrollTop(props) {
  const theme = useTheme();
  const { children, window: windowProp } = props;
  const trigger = useScrollTrigger({
    target: windowProp ? windowProp() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let timeoutId = null;

    const handleScroll = () => {
      if (!isVisible) setIsVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 800);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  const handleClick = event => {
    const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger && isVisible}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: theme.spacing(3),
          right: theme.spacing(3),
          [theme.breakpoints.up("sm")]: {
            bottom: theme.spacing(6.25),
            right: theme.spacing(10),
          },
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

export default ScrollTop;
