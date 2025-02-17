import React, { useState, useEffect } from "react";
import { Link } from "gatsby";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { contentfulClient } from "../services/contentfulClient";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";

const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Function to extract a clean preview text from Contentful Rich Text
const extractPreviewText = (description) => {
  if (!description || !description.content) return "No preview available.";

  try {
    let previewText = "";

    description.content.forEach((block) => {
      if (block.nodeType === "paragraph" && block.content) {
        block.content.forEach((child) => {
          if (child.nodeType === "text") {
            previewText += child.value + " ";
          }
        });
      }
    });

    // Trim whitespace before processing
    previewText = previewText.trim();

    // Truncate gracefully without breaking words
    if (previewText.length > 150) {
      let truncated = previewText.substring(0, 150);
      let lastSpace = truncated.lastIndexOf(" ");
      truncated = truncated.substring(0, lastSpace); // Avoids cutting off mid-word
      return truncated.trim() + "...";
    }

    return previewText;
  } catch (error) {
    console.error("Error parsing Contentful description:", error);
    return "Error loading preview.";
  }
};



const BlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: "post",
          "metadata.tags.sys.id[in]": "blog",
          order: "-sys.updatedAt",
        });

        console.log("Contentful Blog Posts Response:", response.items);
        setPosts(response.items);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return <Typography variant="h6">Loading blog posts...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center" }}>
      {posts.map((post) => {
        const { sys, fields } = post;
        const slug = createSlug(fields.title);
        const previewText = extractPreviewText(fields.description);

        return (
          <Grid item xs={12} sm={12} md={9} key={sys.id}>
            <Box>
              <Typography variant="h5">{fields.title}</Typography>
              <Divider />
              <Typography variant="body1" color="primary">
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
