import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Container from "@mui/material/Container"
import BlogPosts from "../components/blogposts" // import the Post component


const AboutMe = () => (
  <Layout title="Blog">
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
export const Head = () => <Seo title="Blog" />

export default AboutMe
