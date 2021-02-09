import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Bio from "../components/bio"
import Image from "gatsby-image"


const BlogIndex = ({ data }) => {
  const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <SEO title="home" />
      <h2>Pickup</h2>
      <div className='container'>
        <div className='row my-4 card-deck row-eq-height'>
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
              <div className='col-4  mb-4'>
                <div className="card">
                  <Link to={slug} className='card-link'>
                    <Image fluid={thumbnail_image} className="card-img-top" />
                  </Link>
                  <div className="card-body" >
                    <Link to={slug} className='card-link' >
                      <h5 className="card-title" > {_title}</h5 >
                      <h6 className="card-subtitle text-muted" > {_date}</h6 >
                      <p className="card-text" > {_description}</p >
                    </Link >
                  </div >
                </div >
              </div >

            )
          })}
        </div >
      </div >
      <Bio />

    </Layout >
  )
}


export default BlogIndex

export const pageQuery = graphql`
{
  def_image: file(absolutePath: {regex: "./default.png/"}) {
    childImageSharp {
      fluid(maxHeight: 1000) {
        ...GatsbyImageSharpFluid
      }
    }
  }
  allMarkdownRemark(limit: 2000, sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {tags: {in: "pickup"}}}) {
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
              fluid(maxHeight: 1000) {
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
