import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Collapse from "@mui/material/Collapse"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

// import icons
import IconButton from "@mui/material/IconButton"
import ExpandMoreIcon from "@mui/icons-material/ExpandMoreRounded"

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: "ease-in",
}))

const ProjectPosts = () => {
  const data = useStaticQuery(graphql`
    query ProjectPostsQuery {
      allContentfulPost(
        filter: {
          metadata: {
            tags: { elemMatch: { contentful_id: { eq: "project" } } }
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
          preview {
            preview
          }
        }
      }
    }
  `)

  const [expanded, setExpanded] = React.useState(null)

  const handleExpandClick = (id) => {
    if (id === expanded) {
      setExpanded(null)
    } else {
      setExpanded(id)
    }
  }

  const expandedCardStyle = {
    gridColumn: "1 / -1",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 2, // Set a higher value for the expanded card
    opacity: 1, // Show the expanded card
    maxHeight: "none", // Show the expanded card content
    transition: "ease-in"
  }

  const unexpandedCardStyle = {
    minWidth: 300,
    display: expanded ? "none" : "flex", // Hide unexpanded cards when one is expanded
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1, // Set a lower value for unexpanded cards
    opacity: 1, // Show unexpanded cards
    maxHeight: expanded ? 0 : "none", // Hide unexpanded card content when one is expanded
  }

  return (
    <Box container sx={{ justifyContent: `center` }} direction="row">
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 1,
        }}
      >
        {data.allContentfulPost.nodes.map((post) => (
          <Card
            key={post.id}
            sx={expanded === post.id ? expandedCardStyle : unexpandedCardStyle}
            variant="outlined"
            id="projectPost"
          >
            <Box>
              {expanded !== post.id && (
                <>
                  <CardContent>
                    <h3>{post.title}</h3>
                  </CardContent>
                  <hr />
                  <CardContent>
                    <Typography variant="body2">
                      {post.preview.preview}...
                    </Typography>
                  </CardContent>
                </>
              )}
            </Box>

            <Box>
              <Collapse in={expanded === post.id} unmountOnExit>
                <CardContent>
                  <Post
                    key={post.id}
                    title={post.title}
                    description={post.description}
                    updatedAt={post.updatedAt}
                    tag={post.metadata.tags.map((tag) => (
                      <span key={tag.id}>{tag.name}</span>
                    ))}
                  />
                </CardContent>
              </Collapse>
            
              <CardActions disableSpacing>
                <ExpandMore
                  expand={expanded === post.id}
                  onClick={() => handleExpandClick(post.id)}
                  aria-expanded={expanded === post.id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon /> 
                </ExpandMore>
              </CardActions>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default ProjectPosts
