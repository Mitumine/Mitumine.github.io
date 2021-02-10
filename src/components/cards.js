import PropTypes from "prop-types"
import React from "react"
import Card from "../components/Card"

const Cards = ({ items }) => {
  console.log(`items ${items}`)

  return (
    <div className="container">
      <div className="row my-3">
        {items.map(item => (
          <div className="col-12 col-sm-6 col-xl-4 mb-4">
            <div className="card">
              <Card {...item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Cards
