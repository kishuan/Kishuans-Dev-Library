import * as React from "react";
import { useState, useEffect } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";

function ScrollTop(props) {
    const theme = useTheme();
    const { children, window: windowProp } = props; // Use `windowProp` to avoid confusion with the global `window`
    const trigger = useScrollTrigger({
        target: windowProp ? windowProp() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            // Return early if `window` is undefined in the SSR environment
            return;
        }

        let timeoutId = null;

        const handleScroll = () => {
            if (!isVisible) setIsVisible(true);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setIsVisible(false);
            }, 800); // ms of inactivity will hide the ScrollTop button
        };

        // Since we're now sure `window` is defined, we can safely add the event listener
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            if (window) {
                window.removeEventListener('scroll', handleScroll);
                clearTimeout(timeoutId);
            }
        };
    }, [isVisible]); // Dependencies array ensures this effect runs only when `isVisible` changes

    const handleClick = event => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

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
                    bottom: theme.spacing(3), // Equivalent to 16px by default
                    right: theme.spacing(3),
                    [theme.breakpoints.up("sm")]: {
                        bottom: theme.spacing(6.25), // Equivalent to 50px by default
                        right: theme.spacing(10), // Equivalent to 80px by default
                    },
                }}
            >
                {children}
            </Box>
        </Fade>
    );
}

export default ScrollTop;
