import React from "react";
import { DarkModeProvider } from "./src/components/darkModeContext";
import cookie from "cookie";

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * This function will set HTML attributes based on cookies.
 */
export const onRenderBody = ({ setHtmlAttributes }, { pathname, headers }) => {
  // Default language setup
  setHtmlAttributes({ lang: `en` });

  // Parse cookies
  const cookies = headers && headers.cookie ? cookie.parse(headers.cookie) : {};
  const theme = cookies.theme || 'light'; // Default to light theme if not specified in cookies

  // Dynamically add class based on theme
  const className = theme === 'dark' ? 'dark-mode' : 'light-mode';
  setHtmlAttributes({ className: className });
};

/**
 * Wrap the root element with the DarkModeProvider context
 */
export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
);
