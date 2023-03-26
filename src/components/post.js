import React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

const Post = ({ title, description }) => {
  return (
    <div>
      <h2>{title}</h2>
      {documentToReactComponents(JSON.parse(description.raw))}
    </div>
  )
}

export default Post