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

