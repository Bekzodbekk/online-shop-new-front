import React from 'react'
import "./productItem.scss"
import { CardActionArea } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const ProductItem = ({id, item}) => {
  const navigate = useNavigate()
  const openInfoPageHandle = () => {
    navigate(`/product-info/${id}`)
  }
  return (
    <div className='product_item'>
      <CardActionArea onClick={openInfoPageHandle}>
        <div className="product_item_con">
          <img src={item.image_url} alt="" />
          <div className="content">
            <h1 className="title">{item.name}</h1>
            <h3>Uniq Number: {item.unique_number}</h3>
            <h3>Code: {item.bag_id}</h3>
            <h3>Razmer: {item.size}</h3>
            <h3>Narxi: {item.price} so'm</h3>
            <h3>Soni: {item.count}</h3>
          </div>
        </div>
      </CardActionArea>
    </div>
  )
}

export default ProductItem