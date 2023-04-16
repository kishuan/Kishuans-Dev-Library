import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Paper from "@mui/material/Paper"
import { useStaticQuery, graphql } from "gatsby"
import Profile from "./profile.js"
import Stack from "@mui/material/Stack"

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query ProfileQuery {
      allContentfulPost(
        filter: {
          metadata: {
            tags: { elemMatch: { contentful_id: { eq: "profile" } } }
          }
        }
        sort: { updatedAt: DESC }
      ) {
        nodes {
          id
          title
          description {
            raw
          }
          updatedAt
          metadata {
            tags {
              id
              name
            }
          }
        }
      }
    }
  `)

  return (
      <Stack sx={{ justifyContent: `center` }}>
        {data.allContentfulPost.nodes.map(post => (
          <Profile
            key={post.id}
            title={post.title}
            description={post.description}
            updatedAt={post.updatedAt}
            tag={post.metadata.tags.map(tag => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          />
        ))}
      </Stack>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Blog" />

export default AboutMe
