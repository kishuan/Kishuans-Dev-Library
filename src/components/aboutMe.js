import * as React from "react"
import Seo from "../components/seo"
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
            references {
              ... on ContentfulAsset {
                contentful_id
                __typename
                title
                file {
                  url
                  details {
                    size
                    image {
                      width
                      height
                    }
                  }
                  fileName
                  contentType
                }
              }
            }
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

export const Head = () => <Seo title="Blog" />

export default AboutMe
