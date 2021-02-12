import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Bio from "../components/bio"
import SEO from "../components/seo"
import Form from "../components/form"

const ContactPage = () => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          social {
            twitter
          }
        }
      }
    }
  `)

  const social = data.site.siteMetadata?.social
  const twitter_link = social?.twitter

  return (
    <Layout>
      <SEO title="contact" />
      <h2>Contact Form</h2>
      <Form />
      <h2>Contact Form</h2>
      <Link to={twitter_link}>Twitter</Link>
      <Bio />
    </Layout>
  )
}

export default ContactPage
