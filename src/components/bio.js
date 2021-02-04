/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
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

      <div class='bio'>
        {avatar_img}
        <p>
          {author.name}<br></br>
          うんこ製造機<br></br>
          <Link to={twitter_link} >Twitter</Link>
        </p>
      </div >
    </div>
  )
}

export default Bio
