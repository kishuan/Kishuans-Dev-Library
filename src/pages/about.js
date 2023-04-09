import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Paper from "@mui/material/Paper"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { useStaticQuery, graphql } from "gatsby"

const AboutPage = () => {
  const data = useStaticQuery(graphql`
    query ProfileQuery {
      allContentfulProfile {
        nodes {
          id
          title
          subtitle
          description
        }
      }
    }
  `)

  return (
    <Layout>
      {data.allContentfulProfile.nodes.map((profile) => (
        <Paper key={profile.id} variant="outlined">
          <h2>{profile.title}</h2>
          <h3>{profile.subtitle}</h3>
          <div>
            {documentToReactComponents(JSON.parse(profile.description))}
          </div>
        </Paper>
      ))}
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="About" />

export default AboutPage
