import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Cards from "../components/cards"

const BlogIndex = ({ pageContext, data }) => {
  const { tag } = pageContext
  return (
    <Layout>
      <SEO title={tag} />
      <h2>{tag}</h2>
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
