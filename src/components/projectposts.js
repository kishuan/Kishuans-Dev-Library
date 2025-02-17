import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Toolbar,
  Stack,
  Chip,
  Divider
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

function formatDateAndTime(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleString(undefined, options);
}

const ProjectPosts = () => {
  const [selectedProject, setSelectedProject] = React.useState(null);

  const data = useStaticQuery(graphql`
    query {
      allContentfulPost(
        filter: {
          metadata: { tags: { elemMatch: { contentful_id: { eq: "project" } } } }
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
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, aspectRatio: 1.777)
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
  `);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
    adaptiveHeight: true
  };

  const handleSelectProject = (project) => {
    window.scrollTo(0, 0);
    setSelectedProject(project);
  };

  // Show the grid of project cards unless a project is selected
  if (!selectedProject) {
    return (
      <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center" }}>
        {data.allContentfulPost.nodes.map(post => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ display: "flex", flexDirection: "column", height: 400 }}>
              <CardActionArea onClick={() => handleSelectProject(post)} sx={{ flex: "1 0 auto" }}>
                <CardMedia
                  component="img"
                  sx={{ height: 200, objectFit: "cover" }}
                  image={post.images[0].file.url}
                  alt="Project image"
                />
                <CardContent sx={{ overflow: "auto", flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" color="text.secondary">
                    {post.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {post.preview.preview}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  // Otherwise, show SINGLE project details
  const { title, description, updatedAt, images, metadata } = selectedProject;

  return (
    <>
      {/* If you have a scroll-to-top button or anchor logic, you can keep a toolbar anchor: */}
      <Toolbar id="back-to-top-anchor" style={{ height: 0, minHeight: 0 }} />

      {/* TOP BACK BUTTON (outside main container) */}
      <Box textAlign="left" mb={1} ml={{ xs: 2, sm: 4 }}>
        <Button variant="text" color="secondary" onClick={() => setSelectedProject(null)}>
          <ChevronLeftIcon />
          Back to All Projects
        </Button>
      </Box>

      {/* SINGLE-PROJECT CONTAINER */}
      <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={12} sm={12} md={9}>
          <Box>
            {/* Title */}
            <Typography variant="h3" textAlign="center">
              {title}
            </Typography>
            <Divider>
              <Typography variant="overline">{formatDateAndTime(updatedAt)}</Typography>
            </Divider>

            {/* Images slider */}
            {images && images.length > 0 && (
              <div id="images">
                <Slider {...sliderSettings}>
                  {images.map((image, index) => (
                    <div key={index}>
                      <GatsbyImage
                        image={getImage(image.gatsbyImageData)}
                        alt={`image ${index + 1}`}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}

            {/* Description */}
            <Box mt={3}>
              {documentToReactComponents(JSON.parse(description.raw))}
            </Box>

            {/* Tags */}
            {metadata?.tags?.length > 0 && (
              <Box mt={2}>
                <Divider textAlign="left">
                  <Typography variant="overline">Tags:</Typography>
                </Divider>
                <Stack direction="row" spacing={2} justifyContent="flex-start">
                  {metadata.tags.map(tag => (
                    <Chip key={tag.id} label={tag.name} size="small" variant="filled" />
                  ))}
                </Stack>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* BOTTOM BACK BUTTON (also outside main container) */}
      <Box textAlign="left" mt={2} ml={{ xs: 2, sm: 4 }}>
        <Button variant="text" color="secondary" onClick={() => setSelectedProject(null)}>
          <ChevronLeftIcon />
          Back to All Projects
        </Button>
      </Box>
    </>
  );
};

export default ProjectPosts;
