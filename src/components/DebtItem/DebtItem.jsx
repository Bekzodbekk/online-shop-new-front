import React from 'react'
import "./DebtItem.scss"
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const DebtItem = ({id}) => {
  const navigate = useNavigate()
  const openInfoPageHandle = () => {
    navigate(`/debt-info/${id}`)
  }
  return (
    <div className='debt_item'>
        <CardActionArea onClick={openInfoPageHandle}>
        <div className="debt_item_con">
            <h1>First Name: <span>Bekzod</span></h1>
            <h1>Last Name: <span>Nematov</span></h1>
            <h1>Phone Number: <span>+998 93 310 5234</span></h1>
            <h1>JSHSHIR: <span>11223344556677</span></h1>
            <h1>Price: <span>120.000 so'm</span></h1>
            <h1>Deadline: <span>02-07-2024</span></h1>
        </div>
        </CardActionArea>
    </div>
  )
}

export default DebtItem