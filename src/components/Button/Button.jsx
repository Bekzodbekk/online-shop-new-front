import React from 'react'

const Button = ({label, openModalWindow}) => {
  
  return <button onClick={openModalWindow}>{label}</button>
}

export default Button