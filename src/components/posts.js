import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Post from "../components/post"

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
    render={(data) => (
      <div>
        {data.allContentfulPost.nodes.map((post) => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
          />
        ))}
      </div>
    )}
  />
)

export default Posts
