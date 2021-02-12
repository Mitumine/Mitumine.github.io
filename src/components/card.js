import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Image from "../components/image"

const Card = ({ fields, frontmatter }) => {
  // fieldsをバラす
  const { slug } = fields

  // frontmatterをバラす
  const date = frontmatter.date
  const description = frontmatter.description
  // const tags = frontmatter.tags
  const title = frontmatter.title
  const thumbnail = frontmatter.thumbnail

  // サムネイル設定
  const thumbnail_image = thumbnail ? thumbnail.childImageSharp.fluid : null

  let img_code
  if (thumbnail_image == null) {
    img_code = (
      <Image filename="default.png" alt={title} className="card-img-top" />
    )
  } else {
    img_code = (
      <Img fluid={thumbnail_image} alt={title} className="card-img-top" />
    )
  }
  // 出力
  return (
    <Link to={slug} className="card-link">
      {img_code}
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
  {
    def_image: file(absolutePath: { regex: "images/default.png/" }) {
      childImageSharp {
        fluid(maxHeight: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
