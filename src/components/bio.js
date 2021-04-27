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
            tiktok
            youtube
          }
        }
      }
    }
  `)

  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  const avatar = data?.avatar?.childImageSharp?.fixed

  const twitter_link = social?.twitter
  const tiktok_link = social?.tiktok
  const youtube_link = social?.youtube

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
      <div className="bio">
        {avatar_img}

        <p>
          <h3>{author.name}</h3>
          音楽と絵とデザイン、本業無職。<br></br>
          元プリパラアイドルの女子中学生(自称)です<br></br>
          <br></br>
          <h3>Link</h3>
          {/* <a href={twitter_link}>Twitter</a>,&nbsp; */}
          <a href={tiktok_link}>Tiktok</a>,&nbsp;
          <a href={youtube_link}>Youtube</a>,&nbsp;
        </p>
      </div>
    </div>
  )
}

export default Bio
