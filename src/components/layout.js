import React from "react"
import { Link } from "gatsby"

function Layout({ title, children }) {
  // const rootPath = `${__PATH_PREFIX__}/`
  const header = (
    <header className="global-header">
      <h1 className="main-heading">
        <Link to="/">Sotono.works</Link>
      </h1>
      <div className='container'>
        <div className='row my-4'>
          <div className='col'>
            &nbsp;/&nbsp;
      <Link to="/">Home</Link>
            &nbsp;/&nbsp;
      <Link to="/tags/graphic">Graphics</Link>
            &nbsp;/&nbsp;
      <Link to="/tags/music">Musics</Link>
            &nbsp;/&nbsp;
      <Link to="/tags/program">Programs</Link>
            &nbsp;/&nbsp;
      <Link to="/tags/log">log</Link>
            &nbsp;/&nbsp;
      <Link to="/contact">Contact</Link>
            &nbsp;/&nbsp;
          </div>
        </div >
      </div >
    </header >
  )

  const footer = (
    <footer>
      © Sotono {new Date().getFullYear()}.
    </footer>
  )


  return (
    <div className="global-wrapper">
      {header}
      <main>{children}</main>
      {footer}
    </div>
  )
}

export default Layout
