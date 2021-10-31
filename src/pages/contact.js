import React from "react"

import Layout from "../components/layout"
// import Bio from "../components/bio"
import Seo from "../components/seo"

const ContactPage = () => {
  return (
    <Layout>
      <Seo title="contact" />
      <h2>Contact Form</h2>
      <iframe
        title="form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSf3bnKN7pZmKqpOyJJtO4kkmmUHZYsxlOTBnLoXYbENQ53R6A/viewform?embedded=true"
        width="100%"
        height="1000"
        frameborder="0"
        marginheight="0"
        s
        marginwidth="0"
      >
        読み込んでいます…
      </iframe>
      {/* <Bio /> */}
    </Layout>
  )
}

export default ContactPage
