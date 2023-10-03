import * as React from "react"
import ProjectPosts from "../components/projectposts";
import Layout from "../components/layout"
import Seo from "../components/seo"
import Container from "@mui/material/Container"



const ProjectsPage = () => (
  <Layout title="Projects">
      <Container>
        <ProjectPosts/>
      </Container>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Projects" />

export default ProjectsPage
