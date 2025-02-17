import React from 'react';
import { graphql } from 'gatsby';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Slider from 'react-slick';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from './layout';  // Import the Layout component
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

// Helper function to format date
const formatDateAndTime = dateString => {
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
};

const BlogPost = ({ data }) => {
  const { title, description, updatedAt, images, metadata } = data.contentfulPost;

  // Image slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: 'linear',
    adaptiveHeight: true
  };

  return (
    <Layout title="blog">  {/* Wrap content inside the Layout */}
      {/* Add Scroll anchor for back-to-top button */}
      <Toolbar id="back-to-top-anchor" style={{ height: "0", minHeight: "0" }} />
      <Link href={`/blog/`} style={{ textDecoration: "none" }}>
        <Button variant="text" color="primary" size="medium"><ChevronLeftIcon />Back to all blog posts
        </Button>
      </Link>
      <Container>
        <Box>
          {/* Title and Date */}
          <Typography variant="h3" textAlign="center">{title}</Typography>
          <Divider>
            <Typography variant="overline">{`${formatDateAndTime(updatedAt)}`}</Typography>
          </Divider>

          {/* Image Slider (if images exist) */}
          {images && images.length > 0 && (
            <div id="images">
              <Slider {...settings}>
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

          {/* Description (rich text) */}
          <Box mt={3}>
            {documentToReactComponents(JSON.parse(description.raw))}
          </Box>

          {/* Tags (if available) */}
          {metadata && metadata.tags && metadata.tags.length > 0 && (
            <Box mt={2}>
              <Divider textAlign="left">
                <Typography variant="overline">Tags:</Typography>
              </Divider>
              <Stack direction="row" spacing={2} justifyContent="flex-start">
                {metadata.tags.map((tag) => (
                  <Chip key={tag.id} label={tag.name} size="small" variant="filled" />
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String!) {
    contentfulPost(id: { eq: $id }) {
      title
      updatedAt
      description {
        raw
      }
      images {
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, aspectRatio: 1.777)
      }
      metadata {
        tags {
          id
          name
        }
      }
    }
  }
`;

export default BlogPost;
