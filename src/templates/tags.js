import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Cards from "../components/Cards"

const BlogIndex = ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <h2>Pickup</h2>
      <Cards items={data.portfolio.nodes} />
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($tag: String) {
    portfolio: allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      nodes {
        ...PortfolioCard
      }
    }
  }
`
