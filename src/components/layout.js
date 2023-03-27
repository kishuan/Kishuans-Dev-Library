import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Stack from "@mui/material/Stack"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"

import "./layout.css"

import Header from "./header"
import { Link } from "gatsby"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div>
      <Container>
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        <Divider component="div" role="presentation">
          Kishuan Matteo
        </Divider>

        <Stack direction="row" spacing={2}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Projects</Link>
        </Stack>
        <main>{children}</main>
        <footer
          style={{
            marginTop: `var(--space-5)`,
            fontSize: `var(--font-sm)`,
          }}
        >
          © {new Date().getFullYear()} &middot;
        </footer>
      </Container>
    </div>
  )
}

export default Layout
