import React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const Post = ({ title, description, updatedAt, tag }) => {
  const findAsset = (id, references) => {
    return references.find((ref) => ref.sys.id === id);
  };

  const options = {
    renderNode: {
      "embedded-asset-block": (node) => {
        const asset = findAsset(node.data.target.sys.id, JSON.parse(description.references));
        const { title, file } = asset.fields;
        const imageUrl = file.url;
        return <img src={imageUrl} alt={title} />;
      },
    },
  };

  return (
    <Box>
      <div id="post_title">
        <h2>{title} </h2>
      </div>
      <hr></hr>
      <div>{documentToReactComponents(JSON.parse(description.raw), options)}</div>
      <hr></hr>
      <Stack direction="row" spacing={1}>
        <Chip
          sx={{
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
            backgroundColor: `#474E68`,
            color: `#ECF2FF`,
          }}
          label={`Last published: ${updatedAt}`}
          size="small"
          variant="outlined"
        />
        <Chip
          sx={{ color: `#ECF2FF`, backgroundColor: `#474E68` }}
          label={tag}
          size="small"
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default Post;
