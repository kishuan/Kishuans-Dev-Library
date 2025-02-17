// gatsby-ssr.js
import React from "react";
import { DarkModeProvider } from "./src/components/darkModeContext";

export const onRenderBody = ({ setHtmlAttributes, setPreBodyComponents }) => {
  setHtmlAttributes({ lang: "en" });

  // This sets data-theme before the user sees the page
  const noFlashScript = `
  (function() {
    try {
      var match = document.cookie.match(/(^| )theme=([^;]+)/);
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

export const wrapRootElement = ({ element }) => (
  <DarkModeProvider>{element}</DarkModeProvider>
);
