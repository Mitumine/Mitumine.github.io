import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

function Layout({ children }) {
  // const data = useStaticQuery(graphql`
  //   {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  // const sitetitle = data.site.siteMetadata?.title

  const header = (
    <header className="global-header">
      <div className="container">
        <div className="row my-4">
          <div className="col">
            <Link className="logo" to="/">
              <StaticImage
                src="../images/mr_black.png"
                alt="Mushroom Records"
                layout="constrained"
              />
            </Link>
          </div>
          <div className="col">
            &nbsp;/&nbsp;
            <Link to="/">home</Link>
            &nbsp;/&nbsp;
            <Link to="/about">about me</Link>
            &nbsp;/&nbsp;
            <br />
            &nbsp;/&nbsp;
            <Link to="/contents/music">music video</Link>
            &nbsp;/&nbsp;
            <Link to="/contents/discography">discography</Link>
            &nbsp;/&nbsp;
            <Link to="/contents/graphic">graphic</Link>
            &nbsp;/&nbsp;
            <br />
            &nbsp;/&nbsp;
            <Link to="/contact">contact</Link>
            &nbsp;/&nbsp;
          </div>
        </div>
      </div>
    </header>
  )

  const footer = <footer>© Sotono {new Date().getFullYear()}.</footer>

  return (
    <div className="global-wrapper">
      {header}
      <main>{children}</main>
      {footer}
    </div>
  )
}

export default Layout
