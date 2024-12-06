import React from 'react'
import "./card.scss"


const Card = ({title, label}) => {
  return (
    <div className='card'>
        <div className="card_cont">
            <h1>{title}</h1>
            <h3>{label}</h3>
        </div>
    </div>
  )
}

export default Card