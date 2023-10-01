import * as React from "react"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post.js"
import Grid from "@mui/material/Grid"


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
          images {
            gatsbyImageData(layout: CONSTRAINED, width: 400)
            contentful_id
          }
        }
      }
      contentfulAsset(contentful_id: { eq: "47sv4JLEMcUbZniHLMifOa" }) {
        gatsbyImageData(layout: CONSTRAINED, width: 400)
      }
    }
  `)

  return (
    <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center"}}>
      {data.allContentfulPost.nodes.map(post => (
        <Grid item xs={12} sm={12} md={9} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            updatedAt={post.updatedAt}
            tag={post.metadata.tags.map(tag => (
              <span key={tag.id}>{tag.name}</span>
            ))}
            images={post.images || []}
            avatar={data.contentfulAsset.gatsbyImageData}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export const Head = () => <Seo title="About Me" />

export default AboutMe
