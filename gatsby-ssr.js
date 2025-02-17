// gatsby-ssr.js

// If you have no SSR needs, you can remove or leave it empty.
// No more references to theme or cookies for no-flash.

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" });
};

