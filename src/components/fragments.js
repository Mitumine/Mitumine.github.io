import { graphql } from "gatsby"

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
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        }
      }
    }
  }
`
