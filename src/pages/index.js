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
      <h3>Contents</h3>
      <Cards items={data.portfolio_news.nodes} />
      <h3>What's new</h3>
      <div>
        <ul className="whatsnew">
          <li>211116 - サイト更新</li>
          <li>211101 - アルバム「1から0へ」公開</li>
        </ul>
      </div>
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
