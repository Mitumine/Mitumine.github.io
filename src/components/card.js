import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, StaticImage,getImage } from "gatsby-plugin-image"

const Card = ({ fields, frontmatter }) => {
  // fieldsをバラす
  const { slug } = fields

  // frontmatterをバラす
  const date = frontmatter.date
  const description = frontmatter.description
  // const tags = frontmatter.tags
  const title = frontmatter.title
  const thumbnail = getImage(frontmatter.thumbnail)

  // サムネイルの設定
  let img_code
  if (thumbnail == null) {
    img_code = (
      <StaticImage
        src="../images/default.png/"
        alt={title}
        className="card-img-top"
      />
    )
  } else {
    img_code = (
      <GatsbyImage image={thumbnail} alt={title} className="card-img-top" />
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
