import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post"
import Grid from "@mui/material/Grid"

const BlogPosts = () => {
  const data = useStaticQuery(graphql`
    query BlogPostsQuery {
      allContentfulPost(
        filter: {
          metadata: { tags: { elemMatch: { contentful_id: { eq: "blog" } } } }
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
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default BlogPosts
