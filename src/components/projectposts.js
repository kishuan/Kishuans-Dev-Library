import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post"
import {
  Grid,
  Typography,
  Button,
  ListItemButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery
} from "@mui/material"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const ProjectPosts = () => {
  const [selectedProject, setSelectedProject] = React.useState(null)
  const [viewMode, setViewMode] = React.useState("list")
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const data = useStaticQuery(graphql`
    query PortfolioQuery {
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
      contentfulAsset(contentful_id: { eq: "47sv4JLEMcUbZniHLMifOa" }) {
        gatsbyImageData(layout: CONSTRAINED, width: 400)
      }
    }
  `)

  return (
    <Grid container spacing={2}>
      {/* List View */}
      {(viewMode === "list" || !isMobile) && ( // check window width or use a hook/library
        <Grid item xs={12} sm={12} md={4} sx={{ overflowY: "auto" }}>
          {data.allContentfulPost.nodes.map(post => (
            <List key={post.id} variant="outlined">
              <ListItem disablePadding>
                <ListItemButton
                  size="small"
                  onClick={() => {
                    setSelectedProject(post)
                    setViewMode("post")
                  }}
                >
                  <ListItemText
                    primary={post.title}
                    secondary={post.preview.preview}
                  />
                </ListItemButton>
              </ListItem>
              <Divider component="li" variant="inset" />
            </List>
          ))}
        </Grid>
      )}
      {/* Vertical Divider for larger screens */}
      <Grid item sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <Divider orientation="vertical" sx={{ height: "100%" }} />
      </Grid>

      {/* Post View */}
      {selectedProject && (!isMobile || (isMobile && viewMode === "post")) &&  (
        <Grid item xs={12} sm={12} md={7}>
          {/* Show the 'Back' button only on mobile and when in 'post' view mode */}
          {viewMode === "post" && isMobile && (
            <Button onClick={() => setViewMode("list")} size="large"><ChevronLeftIcon/>Back</Button>
          )}
          <Post
            key={selectedProject.id}
            title={selectedProject.title}
            description={selectedProject.description}
            updatedAt={selectedProject.updatedAt}
            tag={selectedProject.metadata.tags.map(tag => (
              <span key={tag.id}>{tag.name}</span>
            ))}
            images={selectedProject.images || []}
            avatar={data.contentfulAsset.gatsbyImageData}
          />
        </Grid>
      )}

      {/* Default Message for larger screens */}
      {!selectedProject && !isMobile && (
        <Grid item md={7}>
          <Typography variant="h6" sx={{ mt: 3, textAlign: "center" }}>
            Select a project to view more details!
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default ProjectPosts
