// import React from "react";
// import { DarkModeProvider } from "./src/components/darkModeContext";
// import cookie from "cookie";

// /**
//  * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
//  *
//  * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
//  */

// /**
//  * This function will set HTML attributes based on cookies.
//  */
// export const onRenderBody = ({ setHtmlAttributes }, { pathname, headers }) => {
//   // Default language setup
//   setHtmlAttributes({ lang: `en` });

//   // Parse cookies
//   const cookies = headers && headers.cookie ? cookie.parse(headers.cookie) : {};
//   const theme = cookies.theme || 'light'; // Default to light theme if not specified in cookies

//   // Dynamically add class based on theme
//   const className = theme === 'dark' ? 'dark-mode' : 'light-mode';
//   setHtmlAttributes({ className: className });
// };

// /**
//  * Wrap the root element with the DarkModeProvider context
//  */
// export const wrapRootElement = ({ element }) => (
//   <DarkModeProvider>{element}</DarkModeProvider>
// );

import React from "react";
import { DarkModeProvider } from "./src/components/darkModeContext";

/**
 * Prevent Flash of Incorrect Theme on Load
 * Reads theme from cookies before the body renders.
 */
export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: "en" });

  const noFlashScript = `
  (function() {
    try {
      var match = document.cookie.match(new RegExp('(^| )theme=([^;]+)'));
      var theme = match ? match[2] : 'light'; 
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
  `;

  setPreBodyComponents([
    <script
      key="theme-no-flash"
      dangerouslySetInnerHTML={{ __html: noFlashScript }}
    />,
  ]);
};

/**
 * Wrap the root element with DarkModeProvider
 */
export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
);
