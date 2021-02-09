/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"




const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/avatar.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  const twitter_link = social?.twitter

  const avatar_img = (
    <Image
      fixed={avatar}
      alt={author?.name || ``}
      className="bio-avatar"
      imgStyle={{
        borderRadius: `50%`,
      }}
    />
  )



  return (
    <div>
      <h2>about me</h2>

      <div className='bio'>
        {avatar_img}
        <p>
          {author.name}<br></br>
          音楽と絵とデザイン、本業無職。<br></br>
          元プリパラアイドルの女子中学生(自称)です<br></br>
          <a href={twitter_link} >Twitter</a>
        </p>
      </div >
    </div >
  )
}

export default Bio
