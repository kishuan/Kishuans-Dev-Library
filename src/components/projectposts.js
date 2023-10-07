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
  useMediaQuery,
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
// conditional

const ProjectPosts = () => {
  const [selectedProject, setSelectedProject] = React.useState(null)
  const [viewMode, setViewMode] = React.useState("list")
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("md"))

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
      {(viewMode === "list" || !isMobile) && (
        <Grid item xs={12} sm={12} md={4} sx={{ overflowY: "auto" }}>
          {data.allContentfulPost.nodes.map(post => (
            <List key={post.id} component="nav" disablePadding>
              <ListItem disablePadding>
                <ListItemButton
                  size="small"
                  onClick={() => {
                    setSelectedProject(post)
                    setViewMode("post")
                  }}
                  sx={{ minHeight: "8rem" }} // 10% of the viewport height
                >
                  <ListItemText
                    primary={post.title}
                    secondary={post.preview.preview}
                    sx={{
                      ".MuiTypography-root": {
                        fontSize: isMobile ? "0.9rem" : "1rem",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider component="li" />
              <ListItem
                size="small"
                onClick={() => {
                  setSelectedProject(post)
                  setViewMode("post")
                }}
                sx={{ justifyContent: "flex-end" }}
              >
                <Button>
                  Read More
                  <ChevronRightIcon />
                </Button>
              </ListItem>
            </List>
          ))}
        </Grid>
      )}
      {/* Vertical Divider for larger screens */}
      <Grid item sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <Divider orientation="vertical" sx={{ height: "100%" }} />
      </Grid>

      {/* Post View */}
      {selectedProject && (!isMobile || (isMobile && viewMode === "post")) && (
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          sx={{
            maxHeight: { md: "70vh" },
            overflowY: "auto",
          }}
        >
          {/* Show the 'Back' button only on mobile and when in 'post' view mode */}
          {viewMode === "post" && isMobile && (
            <Button onClick={() => setViewMode("list")} size="large">
              <ChevronLeftIcon />
              Back to projects
            </Button>
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
