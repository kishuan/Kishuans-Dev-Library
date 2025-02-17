import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const BlogPosts = () => {
  const data = useStaticQuery(graphql`
    query BlogPostsQuery {
      allContentfulPost(
        filter: {
          metadata: { tags: { elemMatch: { contentful_id: { eq: "blog" } } } }
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
        }
      }
    }
  `);

  return (
    <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center" }}>
      {data.allContentfulPost.nodes.map(post => {
        const slug = createSlug(post.title);
        const previewText = truncateText(
          JSON.parse(post.description.raw).content[0].content[0].value,
          150
        );

        return (
          <Grid item xs={12} sm={12} md={9} key={post.id}>
            <Box>
              <Typography variant="h5">{post.title}</Typography>
              <Divider />
              <Typography variant="body1" color="textSecondary">
                {previewText}
              </Typography>
              <Link to={`/blog/${slug}`} style={{ textDecoration: "none" }}>
                <Button variant="text" color="primary" size="medium">
                  Read More
                  <ChevronRightIcon />
                </Button>
              </Link>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BlogPosts;
