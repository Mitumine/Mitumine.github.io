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
      <h2>News</h2>
      <Cards items={data.portfolio_news.nodes} />
      <h2>Pickup</h2>
      <Cards items={data.portfolio_pick.nodes} />
      <Bio />
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  {
    portfolio_pick: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: "pickup" } } }
    ) {
      nodes {
        ...PortfolioCard
      }
    }
    portfolio_news: allMarkdownRemark(
      limit: 3
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        ...PortfolioCard
      }
    }
  }
`
