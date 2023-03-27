import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/post"
// import { stackClasses } from "@mui/system"
import Stack from "@mui/material/Stack"

const Posts = () => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulPost(sort: {fields: updatedAt, order: DESC}) { 
          nodes {
            id
            title
            description {
              raw
            }
            updatedAt
          }
        }
      }
    `}
    render={data => (
      <Stack sx={{justifyContent: `center`}}>
        {data.allContentfulPost.nodes.map(post => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
            updatedAt={post.updatedAt}
          />
        ))}
      </Stack>
    )}
  />
)

export default Posts
