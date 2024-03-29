import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
// import * as styles from "../components/index.module.css"
import AboutMe from "../components/aboutMe"
import Container from "@mui/material/Container"

const IndexPage = () => (
  <Layout title="Home">
    <Container>
      <AboutMe/>
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
