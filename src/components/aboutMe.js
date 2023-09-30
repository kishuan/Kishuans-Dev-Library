import * as React from "react"
import Seo from "../components/seo"
import { useStaticQuery, graphql } from "gatsby"
import Profile from "./profile.js"
import Card from "@mui/material/Card"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Typography from "@mui/material/Typography"
import CardContent from "@mui/material/CardContent"
import Grid from "@mui/material/Grid"

const AboutMe = () => {
  const data = useStaticQuery(graphql`
    query ProfileQuery {
      allContentfulPost(
        filter: {
          metadata: {
            tags: { elemMatch: { contentful_id: { eq: "profile" } } }
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
          metadata {
            tags {
              id
              name
            }
          }
          images {
            gatsbyImageData(layout: CONSTRAINED, width: 400)
            contentful_id
          }
        }
      }
      contentfulAsset(contentful_id: { eq: "47sv4JLEMcUbZniHLMifOa" }) {
        gatsbyImageData(layout: CONSTRAINED, width: 400)
      }
    }
  `)

  // Calculate the maximum width based on the image's width
  const maxCardWidth =
    getImage(data.contentfulAsset.gatsbyImageData).width + "px"

  return (
    <Grid container spacing={2} style={{ justifyContent: "center", alignItems: "center"}}>
      {/* Profile Card */}
      <Grid item xs={12} sm={12} md={4}>
        {data.contentfulAsset && (
          <Card
            sx={{
              borderRadius: `1em`,
              maxWidth: maxCardWidth,
              margin: "0 auto", // Center the card horizontally on mobile
              alignContent: `center`,
            }}
          >
            <GatsbyImage
              image={getImage(data.contentfulAsset.gatsbyImageData)}
              alt="Kishuan Matteo Espiritu"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                Kishuan Matteo Espiritu
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                (he/him)
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>

      {/* Profile Content */}
      {data.allContentfulPost.nodes.map(post => (
        <Grid item xs={12} sm={12} md={8} key={post.id}>
          <Profile
            key={post.id}
            title={post.title}
            description={post.description}
            updatedAt={post.updatedAt}
            tag={post.metadata.tags.map(tag => (
              <span key={tag.id}>{tag.name}</span>
            ))}
            images={post.images || []}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export const Head = () => <Seo title="About Me" />

export default AboutMe
