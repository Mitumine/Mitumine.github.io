import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"

const Card = ({ fields, frontmatter }) => {
  // fieldsをバラす
  const { slug } = fields

  // frontmatterをバラす
  const date = frontmatter.date
  const description = frontmatter.description
  // const tags = frontmatter.tags
  const title = frontmatter.title
  const thumbnail = frontmatter.thumbnail

  // サムネイル設定のためのクエリ
  const _default = graphql`
    {
      def_image: file(absolutePath: { regex: "./default.png/" }) {
        childImageSharp {
          fluid(maxHeight: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `

  // サムネイル設定
  const thumbnail_image = thumbnail ? thumbnail.childImageSharp.fluid : _default

  return (
    <Link to={slug} className="card-link">
      <Img fluid={thumbnail_image} alt={title} className="card-img-top" />
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <p className="card-subtitle text-muter">{description}</p>
        <p className="card-text">{date}</p>
      </div>
    </Link>
  )
}

export default Card

export const query = graphql`
  fragment PortfolioCard on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      date
      description
      tags
      title
      thumbnail {
        childImageSharp {
          fluid(maxHeight: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`
