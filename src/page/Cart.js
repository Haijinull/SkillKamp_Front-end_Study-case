import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Carts = (props) => {
  const [num, setNum] = useState(props.item.qty)
  const onAdd = async (event) => {
    const formData = {
      sku: props.item.sku,
      name: props.item.name,
      price: props.item.price,
      discountedPrice: props.item.discountedPrice,
      color: props.item.color,
      size: props.item.size,
      qty: props.item.qty + 1
    }
    try {
      const response = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line quote-props
          'accept': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData
        )
      })
      const data = await response.json()
      console.log(data)
      setNum(num + 1)
    } catch (error) {
      console.error(error)
    }
  }
  const ondec = async (event) => {
    const formData = {
      sku: props.item.sku,
      name: props.item.name,
      price: props.item.price,
      discountedPrice: props.item.discountedPrice,
      color: props.item.color,
      size: props.item.size,
      qty: props.item.qty - 1
    }
    try {
      const response = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line quote-props
          'accept': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData
        )
      })
      const data = await response.json()
      console.log(data)
      setNum(num - 1)
    } catch (error) {
      console.error(error)
    }
  }
  const ondel = async (event) => {
    const formData = {
      sku: props.item.sku,
      name: props.item.name,
      price: props.item.price,
      discountedPrice: props.item.discountedPrice,
      color: props.item.color,
      size: props.item.size,
      qty: props.item.qty
    }
    try {
      const response = await fetch('https://skillkamp-api.com/v1/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // eslint-disable-next-line quote-props
          'accept': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData
        )
      })
      const data = await response.json()
      console.log(data)
      props.reRender()
    } catch (error) {
      console.error(error)
    }
  }
  return (
        <div style={{ display: 'flex', marginBottom: '30px', justifyContent: 'space-around' }}>
            <img width='10%' height = '30%' src={props.item.fullUrl} style={{ border: '1px solid #282828' }} />
            <div style={{ margin: '0', marginLeft: '20px', marginRight: '200px' }}>
                <p style={{ margin: '0.3rem' }}>{props.item.name}</p>
                <p style={{ margin: '0.3rem' }}>{props.item.price}$</p>
                <p style={{ margin: '0.3rem' }}>Color: {props.item.color}</p>
                <p style={{ margin: '0.3rem' }}>Size: {props.item.size}</p>

            </div>
            <div style={{ display: 'flex', margin: '0', border: '1px solid #282828', width: '65px', height: '30px', marginRight: '50px' }}>
                    <p onClick={ondec} style={{ margin: '0', marginLeft: '5px', marginBottom: '5px', cursor: 'pointer' }}>-</p>
                    <p style={{ margin: ' auto 1rem' }}> {num}</p>
                    <p onClick={onAdd} style={{ margin: '0', cursor: 'pointer' }}>+</p>
                </div>
                <p style={{ margin: '0.3rem' }}>{props.item.price}$</p>
                <p onClick={() => {
                  ondel()
                  location.reload()
                }} style={{ margin: '0', cursor: 'pointer' }}>x</p>
        </div>
  )
}
Carts.propTypes = {
  mediaUrl: PropTypes.string,
  name: PropTypes.string,
  qty: PropTypes.number,
  formattedPrice: PropTypes.string,
  item: PropTypes.array,
  reRender: PropTypes.func
}
export default Carts
