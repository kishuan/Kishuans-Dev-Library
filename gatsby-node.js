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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ContentfulProfile implements Node {
      id: ID!
      title: String!
      subtitle: String!
      description: JSON! 
    }

    type Query {
      allContentfulProfile: [ContentfulProfile!]!
    }
  `
  createTypes(typeDefs)
}

