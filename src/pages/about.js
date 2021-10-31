import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About me" />
      <div className="container">
        <div className="row my-4">
          <div className="col">
            <h2>Sotono</h2>
            1994/01/04 新潟生まれ。
            <br />
            <br />
            中学生の時より絵を描き、ギターを始め、それらを中心とした様々な文化に触れていく。
            <br />
            高校大学とイラスト・グラフィックを学びつつ音楽制作を続けていくが、様々な理由により発表を頓挫する。
            <br />
            大学卒業後、無職になり病気に苦しむが、そんな渦中音楽を発表し始める。
            <br />
            コロナが犇めく中、静かに音楽を中心とした創作活動を続けている。
            <br />
            Sotonoの明日はどっちだ。
            <br />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
