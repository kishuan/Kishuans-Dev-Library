import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Box from "@mui/material/Box"

const Post = ({ title, description, updatedAt }) => {
  return (
    <item>
      <Box
        sx={{
          "&:hover": {
            boxShadow: 1,
            borderRadius: 1,
          },
          maxWidth: `false`,
          width: `100%`,
          alignItems: `center`,
          textAlign: `left`,
          border: `1em`,
          margin: `0.5em`,
          padding: `1em`,
        }}
      >
        <h2>{title}</h2>
        <hr></hr>
          {documentToReactComponents(JSON.parse(description.raw))}
          <p>Last published at: {updatedAt}</p>
      </Box>
    </item>
  )
}

export default Post
