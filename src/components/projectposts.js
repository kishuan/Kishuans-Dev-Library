import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Post from "./post"
import {
  Grid,
  Container,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography
} from "@mui/material"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"


const ProjectPosts = () => {
  const [selectedProject, setSelectedProject] = React.useState(null)

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
          preview {
            preview
          }
         images {
          file {
            url
          }
         }
          metadata {
            tags {
              id
              name
            }
          }
        }
      }
    }
  `)

  console.log(data.allContentfulPost.nodes); // Log the fetched nodes to inspect their structure


  return (<Grid container direction="row" justifyContent="center" alignItems="flex-start" spacing={2}>
    {selectedProject ? (
      <>
        <Grid item xs={12}>
          <Button onClick={() => setSelectedProject(null)}><ChevronLeftIcon />Back to All Projects</Button>
        </Grid>
        <Grid item xs={12}>
          <Container>
            <Post
              key={selectedProject.id}
              title={selectedProject.title}
              description={selectedProject.description}
              updatedAt={selectedProject.updatedAt}
              images={selectedProject.images.map(image => ({
                ...image,
                gatsbyImageData: image.file.url
              }))}
              tag={selectedProject.metadata.tags.map(tag => tag.name).join(", ")} // Adjusted for multiple tags
            />
          </Container>
        </Grid>
      </>
    ) : (
      data.allContentfulPost.nodes.map(post => (
        <Grid item key={post.id} xs={12} sm={6} md={4}>
          <Card sx={{ display: 'flex', flexDirection: 'column', height: 400 }}>
            <CardActionArea onClick={() => setSelectedProject(post)} sx={{ flex: '1 0 auto' }}>
              <CardMedia
                component="img"
                sx={{ height: 200, objectFit: 'cover' }}
                image={post.images[0].file.url}
                alt="Project image"
              />
              <CardContent sx={{ overflow: 'auto', flexGrow: 1 }}> {/* Allow ContentCard to manage remaining space */}
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.preview.preview}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button size="small" onClick={() => setSelectedProject(post)}>
                Read More<ChevronRightIcon />
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))
    )}
  </Grid>
  )
}

export default ProjectPosts
