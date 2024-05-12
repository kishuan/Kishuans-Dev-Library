import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";
import { useTheme } from '@mui/material/styles';

const Post = ({ title, description, updatedAt, images, tag }) => {

  const theme = useTheme();  // This hook provides the theme context

  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: theme.palette.dark }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style, display: "block", background: theme.palette.dark
        }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,           // Enables navigational dots
    infinite: true,       // Infinite looping
    speed: 500,           // Transition speed in milliseconds
    slidesToShow: 1,      // Number of slides to show at once
    slidesToScroll: 1,    // Number of slides to scroll at once
    autoplay: true,       // Enables autoplay of slides
    autoplaySpeed: 5000,  // Delay in milliseconds between auto-scrolls
    fade: true,           // Enable fade transitions instead of slide
    cssEase: 'linear',    // Type of easing function for animations
    adaptiveHeight: true, // Adjust slider height based on each slide's content
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };


  // Generate readable datetime format
  const formatDateAndTime = dateString => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use AM/PM format
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Box>
      <Typography variant="h2" textAlign="center">{title}</Typography>
      <Divider textAlign="left">
        <Typography variant="overline">{`${formatDateAndTime(
          updatedAt
        )}`}</Typography>
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

  );
};


export default Post;
