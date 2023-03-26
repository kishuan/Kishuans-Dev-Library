import * as React from "react"
import Posts from "../components/posts"; // import the Post component

import Layout from "../components/layout"
import Seo from "../components/seo"
// import * as styles from "../components/index.module.css"



const IndexPage = () => (
  <Layout>
      <div>
        <Posts/>
      </div>
  </Layout>
)

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />

export default IndexPage
