import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post"
import Stack from "@mui/material/Stack"

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
    <Stack sx={{ justifyContent: `center` }}>
        {data.allContentfulPost.nodes.map(post => (
          <Post
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

export default BlogPosts
