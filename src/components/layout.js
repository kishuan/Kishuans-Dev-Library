import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import { useState, useEffect } from "react"
import Switch from "@mui/material/Switch"

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

  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    const body = document.querySelector("body")
    body.style.backgroundColor = checked ? "#474E68" : "#ECF2FF"
    body.style.color = checked ? "#ECF2FF" : "#474E68"

    const links = document.querySelectorAll("a")
    links.forEach(link => {
      link.style.color = checked ? "#ECF2FF" : "#474E68"
    })
  }, [checked])

  return (
    <Container>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Divider component="div" role="presentation">
        Grow with me.
      </Divider>
      <Breadcrumbs
        aria-label="breadcrumb"
        spacing={3}
        sx={{ fontFamily: `courier new` }}
      >
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        <Switch
        checked={checked}
        onChange={handleChange}
        inputProps={{ "aria-label": "controlled" }}
        color="default"
      />
      </Breadcrumbs>
      <main>{children}</main>
      <footer
        style={{
          marginTop: `var(--space-5)`,
          fontSize: `var(--font-sm)`,
        }}
      >
        © {new Date().getFullYear()} &middot; kishuan's.
      </footer>
    </Container>
  )
}

export default Layout
