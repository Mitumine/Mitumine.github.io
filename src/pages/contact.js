import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Bio from "../components/bio"
import SEO from "../components/seo"

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
      <div className="container">
        <div className="row">
          <div className="col-6">
            <form name="contact" method="POST" netlify>
              <label htmlFor="name">お名前</label>
              <input
                type="text"
                className="form-control mb-2"
                id="name"
                placeholder="First Name"
              />

              <label htmlFor="mail">メールアドレス</label>
              <input
                type="text"
                className="form-control mb-2"
                id="mail"
                placeholder="Mail Address"
              />

              <label htmlFor="inquiry">内容</label>
              <textarea
                type="text"
                className="form-control mb-2"
                id="inquiry"
                placeholder="Inquiry"
              />

              <button type="submit" className="btn btn-primary mb-2">
                送信
              </button>
            </form>
          </div>
        </div>
      </div>

      <Bio />
    </Layout>
  )
}

export default ContactPage
