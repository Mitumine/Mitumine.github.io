import React from "react"
import { graphql } from "gatsby"
// import { Helmet } from "react-helmet"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Cards from "../components/cards"

const BlogIndex = ({ data }) => {
  return (
    <Layout>
      <Seo title="home" />
      <Cards items={data.portfolio_news.nodes} />
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
      limit: 9
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        ...PortfolioCard
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`
