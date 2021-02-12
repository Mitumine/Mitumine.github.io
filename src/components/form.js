import React from "react"

const ContactPage = () => (
  <div className="container">
    <div className="row">
      <div className="col-6">
        <form
          name="contact"
          method="POST"
          action="/thanks"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <input
            name="bot-field"
            type="hidden"
            className="form-control mb-2"
            placeholder="Don't fill"
          />

          <label htmlFor="name">お名前</label>
          <input
            type="text"
            className="form-control mb-2"
            name="name"
            placeholder="First Name"
          />

          <label htmlFor="email">メールアドレス</label>
          <input
            type="text"
            className="form-control mb-2"
            name="email"
            placeholder="Mail Address"
          />

          <label htmlFor="inquiry">内容</label>
          <textarea
            type="text"
            className="form-control mb-2"
            name="inquiry"
            placeholder="Inquiry"
          />

          <button type="submit" className="btn btn-primary mb-2">
            送信
          </button>
        </form>
      </div>
    </div>
  </div>
)

export default ContactPage
