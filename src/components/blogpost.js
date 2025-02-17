import React from "react";
import { graphql } from "gatsby";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Slider from "react-slick";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Layout from "./layout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";

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
    <Layout title="blog">
      {/* Anchor for scroll-to-top logic, if you use it */}
      <Toolbar id="back-to-top-anchor" style={{ height: "0", minHeight: "0" }} />

      {/* TOP back button, outside the main Grid */}
      <Box textAlign="left" mb={1} ml={{ xs: 2, sm: 4 }}>
        <Link href="/blog" style={{ textDecoration: "none" }}>
          <Button variant="text" color="primary" size="medium">
            <ChevronLeftIcon />
            Back to all blog posts
          </Button>
        </Link>
      </Box>

      {/* Main container holding the blog post content */}
      <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center" }}>
        <Grid item xs={12} sm={12} md={9}>
          <Box>
            <Typography variant="h3" textAlign="center">{title}</Typography>
            <Divider>
              <Typography variant="overline">
                {formatDateAndTime(updatedAt)}
              </Typography>
            </Divider>

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

            <Box mt={3}>
              {documentToReactComponents(JSON.parse(description.raw))}
            </Box>

            {metadata && metadata.tags && metadata.tags.length > 0 && (
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

      {/* BOTTOM back button, also outside the main Grid */}
      <Box textAlign="left" mt={2} ml={{ xs: 2, sm: 4 }}>
        <Link href="/blog" style={{ textDecoration: "none" }}>
          <Button variant="text" color="primary" size="medium">
            <ChevronLeftIcon />
            Back to all blog posts
          </Button>
        </Link>
      </Box>
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
