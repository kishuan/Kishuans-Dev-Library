import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"

const Post = ({ title, description, updatedAt, tag }) => {
  return (
    <Box
      // sx={{
      //   "&:hover": {
      //     boxShadow: 3,
      //     borderRadius: 1,
      //   },
      //   maxWidth: `false`,
      //   width: `100%`,
      //   alignItems: `center`,
      //   textAlign: `left`,
      //   border: `1em`,
      //   margin: `0.5em`,
      //   padding: `1em`,
      // }}
    >
      <div id="post_title">
        <h2>{title} </h2>
      </div>
      <hr></hr>
      <div>{documentToReactComponents(JSON.parse(description.raw))}</div>
      <hr></hr>

      <Stack direction="row" spacing={1}>
        <Chip
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
            backgroundColor: `#474E68`,
            color: `#ECF2FF`,
          }}
          label={`Last published: ${updatedAt}`}
          size="small"
          variant="outlined"
        />
        <Chip
          sx={{ color: `#ECF2FF`, backgroundColor: `#474E68` }}
          label={tag}
          size="small"
          variant="outlined"
        />
      </Stack>
    </Box>
  )
}

export default Post
