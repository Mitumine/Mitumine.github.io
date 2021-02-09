import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from '../components/layout'
import Bio from "../components/bio"




const ContactPage = () => {
  const data = useStaticQuery(graphql`
  {
    site {
      siteMetadata {
        social {
          twitter
        }
      }
    }
  }
  `)


  const social = data.site.siteMetadata?.social
  const twitter_link = social?.twitter

  return (
    < Layout >

      <div className='container'>
        <div className='row my-4'>
          <div className='col'>
            <h2>SNS</h2>
            <a href={twitter_link} >Twitter</a>
          </div>
        </div >
        <div className='row my-4' >
          <div className='col' >
            <h2>Contact Form</h2>
            <form name="contact" method="POST" netlify>
              <div className="col-auto mb-4">
                <label htmlFor='name'>
                  お名前
        </label>

                <input type="text" className="form-control mb-2" id="name" placeholder="First Name" />
              </div>

              <div className="col-auto mb-4">
                <label htmlFor='mail'>
                  メールアドレス
        </label>
                <input type="text" className="form-control mb-2" id="mail" placeholder="Mail Address" />

              </div>

              <div className="col-auto mb-4">
                <label htmlFor='inquiry'>
                  内容
        </label>

                <textarea type="text" className="form-control mb-2" id="inquiry" placeholder="Inquiry" />
              </div>

              <div className="col-auto mb-4">
                <button type="submit" className="btn btn-primary mb-2">送信</button>

              </div >

            </form >
          </div >
        </div >
        <div className='row my-4' >
          <div className='col' >
            <Bio />
          </div >
        </div >
      </div >
    </Layout >
  )
}



export default ContactPage

