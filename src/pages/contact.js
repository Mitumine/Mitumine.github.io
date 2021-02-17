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
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSf3bnKN7pZmKqpOyJJtO4kkmmUHZYsxlOTBnLoXYbENQ53R6A/viewform?embedded=true"
        width="100%"
        height="1000"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
      >
        読み込んでいます…
      </iframe>
      <Bio />
    </Layout>
  )
}

export default ContactPage
