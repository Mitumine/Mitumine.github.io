//components/seo.js

import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ title, description, image, lang }) {
  const { pathname } = useLocation()
  const { site, file } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            twitterUsername
          }
        }
        file(absolutePath: { regex: "/icon_card.png/" }) {
          childImageSharp {
            fluid {
              src
            }
          }
        }
      }
    `
  )

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    twitterUsername,
  } = site.siteMetadata

  const seo = {
    title: `${title || defaultTitle}`,
    description: description || defaultDescription,
    image: `${siteUrl}${file.childImageSharp.fluid.src}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <Helmet>
      <title>{seo.title} | Sotono.tk</title>
      <html lang="ja" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
    </Helmet>
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  lang: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
  lang: null,
}

export default SEO
