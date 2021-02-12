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
