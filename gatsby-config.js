/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type import('gatsby').GatsbyConfig
 */

require("dotenv").config();

const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;

if (!CONTENTFUL_ACCESS_TOKEN || !CONTENTFUL_SPACE_ID) {
  throw new Error(
    "Missing environment variables. Please set CONTENTFUL_ACCESS_TOKEN and CONTENTFUL_SPACE_ID in your .env file"
  );
}

module.exports = {
  siteMetadata: {
    title: `Kishuan's Dev Library`,
    description: `a repository of Kishuan's development projects and blog posts.`,
    author: `@kishuan`,
    siteUrl: `https://kishuan.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/KishIcon_Outlined.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        accessToken: CONTENTFUL_ACCESS_TOKEN,
        spaceId: CONTENTFUL_SPACE_ID,
        enableTags: true,
        downloadLocal: true,
      },
    },
    {
      resolve: "dotenv-webpack",
      options: {
        // load .env.* files based on the NODE_ENV environment variable
        path: `.env.${process.env.NODE_ENV}`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}
