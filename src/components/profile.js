import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import Stack from "@mui/material/Stack"
import { GatsbyImage } from "gatsby-plugin-image"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Img from 'gatsby-image';

// this component defines the layout for a Profile

const Profile = ({ title, description, updatedAt, images, tag }) => {
  return (
    <Box>
      <div id="post_title">
        <h2>{title}</h2>
      </div>
      <hr></hr>
      <div id="images">
        {images &&
          images.map((image, index) => (
            <div key={index}>
                <GatsbyImage
                  image={image.gatsbyImageData}
                  alt={`image ${index + 1}`}
                  layout="fluid"
                  style={{borderRadius: `1em`, alignItems: `center`}}
                />
            </div>
          ))}
      </div>
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

export default Profile
