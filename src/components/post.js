import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Box from "@mui/material/Box"
import Chip from "@mui/material/Chip"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemAvatar from "@mui/material/ListItemAvatar"
import { GatsbyImage } from "gatsby-plugin-image"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Divider from "@mui/material/Divider"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Img from 'gatsby-image';

const Post = ({ title, description, updatedAt, images, tag, avatar }) => {
  // generate readable datetime format
  const formatDateAndTime = dateString => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use AM/PM format
    }
    return new Date(dateString).toLocaleString(undefined, options)
  }

  return (
    <Box>
      <Typography variant="h4">{title}</Typography>
      <Divider textAlign="center"></Divider>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar alt="" src={avatar.images.fallback.src} />
          </ListItemAvatar>
          <ListItemText primary="Kishuan Matteo Espiritu" secondary="he/him" />
        </ListItem>
      </List>
      <Divider textAlign="left">
        <Typography variant="overline">{`${formatDateAndTime(
          updatedAt
        )}`}</Typography>
      </Divider>

      <div id="images">
        {images &&
          images.map((image, index) => (
            <div key={index}>
              <GatsbyImage
                image={image.gatsbyImageData}
                alt={`image ${index + 1}`}
                layout="fluid"
                style={{ borderRadius: `1em`, alignItems: `center` }}
              />
            </div>
          ))}
      </div>

      {documentToReactComponents(JSON.parse(description.raw))}

      <Box mt={2}>
        <Divider textAlign="left">
          <Typography variant="overline">tags: </Typography>
        </Divider>
      </Box>
      <Box mt={2}>
        <Stack direction="row" spacing={2} justifyContent="flex-start">
          <Chip label={tag} size="small" variant="filled" />
        </Stack>
      </Box>
    </Box>
  )
}

export default Post
