import React from "react"
// import PropTypes from "prop-types"

// Components
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"


import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"



const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges } = data.allMarkdownRemark
  const tagHeader = `${tag}`


  return (
    <Layout title={tag}>
      <SEO title={tag} />
      <div>
        <h2>{tagHeader}</h2>

        <div className='container'>
          <div className='row my-4'>
            {edges.map(({ node }) => {
              const { slug } = node.fields
              const _title = node.frontmatter.title
              const _date = node.frontmatter.date
              const _description = node.frontmatter.description

              const thumbnail_image = (
                node.frontmatter.thumbnail ?
                  node.frontmatter.thumbnail.childImageSharp.fluid :
                  data.def_image.childImageSharp.fluid
              )

              return (
                <div className='col-12 col-sm-6 col-xl-4 mb-4'>
                  <div className="card">
                    <Link to={slug} className='card-link'>
                      <Image fluid={thumbnail_image} className="card-img-top" />
                    </Link>
                    <div className="card-body">
                      <Link to={slug} className='card-link'>
                        <h5 className="card-title">{_title}</h5>
                        <h6 className="card-subtitle text-muted" > {_date}</h6 >
                        <p className="card-text" > {_description}</p >
                      </Link >
                    </div >
                  </div >
                </div >
              )
            })}
          </div>
        </div >
      </div >
      <Bio />
    </Layout >
  )
}

export default Tags

export const pageQuery = graphql`
query ($tag: String) {
  def_image: file(absolutePath: {regex: "./default.png/"}) {
    childImageSharp {
      fluid(maxHeight: 1000){
        ...GatsbyImageSharpFluid
      }
    }
  }
  allMarkdownRemark(limit: 2000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {tags: {in: [$tag]}}}) {
    totalCount
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          title
          description
          date
          thumbnail {
            childImageSharp {
              fluid(maxHeight: 1000){
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
}

`