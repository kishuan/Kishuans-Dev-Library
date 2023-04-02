import * as React from "react"
import BlogPosts from "../components/blogposts" // import the Post component

import Layout from "../components/layout"
import Seo from "../components/seo"
// import * as styles from "../components/index.module.css"

import Container from "@mui/material/Container"

const IndexPage = () => (
  <Layout>
    <Container>
      <BlogPosts />
    </Container>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
