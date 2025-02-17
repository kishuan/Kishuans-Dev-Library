import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import Slider from "react-slick";

const Post = ({ title, description, updatedAt, images, tag }) => {
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

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
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  const formatDateAndTime = dateString => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <Box>
      <Typography variant="h3" textAlign="center">
        {title}
      </Typography>
      <Divider textAlign="left">
        <Typography variant="overline">{formatDateAndTime(updatedAt)}</Typography>
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
          <Typography variant="overline">tags:</Typography>
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
