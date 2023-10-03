import * as React from "react"
import ContactForm from "../components/contactForm";
import Layout from "../components/layout"
import Seo from "../components/seo"
import Container from "@mui/material/Container"



const Contact = () => (
  <Layout title="Contact">
      <Container>
        <ContactForm/>
      </Container>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Contact" />

export default Contact
