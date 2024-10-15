/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */
require("dotenv").config()
/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

const path = require('path');

// Helper function to create slugs dynamically
const createSlug = (title) => title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allContentfulPost {
        nodes {
          id
          title
        }
      }
    }
  `);

  result.data.allContentfulPost.nodes.forEach(post => {
    const slug = createSlug(post.title);

    createPage({
      path: `/blog/${slug}`,
      component: path.resolve('./src/components/blogpost.js'),
      context: {
        id: post.id,
        slug: slug,  // Pass generated slug to page context
      },
    });
  });
};




// exports.onCreateWebpackConfig = ({ actions }) => {
//   actions.setWebpackConfig({
//     resolve: {
//       fallback: {
//         crypto: require.resolve('crypto-browserify')
//       }
//     }
//   });
// };


// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions

//   const typeDefs = [
//     schema.buildObjectType({
//       name: "ContentfulProfile",
//       fields: {
//         title: "String!",
//         subtitle: "String!",
//         description: {
//           type: "contentfulProfileDescriptionTextNode",
//           resolve: (source) => source.description || "",
//         },
//         profilePicture: "ContentfulAsset",
//       },
//       interfaces: ["Node"],
//     }),
//     schema.buildObjectType({
//       name: "contentfulProfileDescriptionTextNode",
//       fields: {
//         description: "String",
//       },
//       interfaces: ["Node"],
//     }),
//   ]

//   createTypes(typeDefs)
// }



// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type ContentfulProfile implements Node {
//       id: ID!
//       title: String!
//       subtitle: String!
//       description: JSON! 
//     }

//     type Query {
//       allContentfulProfile: [ContentfulProfile!]!
//     }
//   `
//   createTypes(typeDefs)
// }

