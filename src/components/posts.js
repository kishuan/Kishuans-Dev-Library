import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/post"
// import { stackClasses } from "@mui/system"
import Stack from "@mui/material/Stack"

const Posts = () => (
  <StaticQuery
    query={graphql`
      query {
        allContentfulPost {
          nodes {
            id
            title
            description {
              raw
            }
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
          />
        ))}
      </Stack>
    )}
  />
)

export default Posts
