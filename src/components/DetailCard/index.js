import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from '../UI/Modal/Modal'
import PropTypes from 'prop-types'
import './index.css'
import Button from '../UI/Button'
import { NavLink } from 'react-router-dom'
const DetailCard = (props) => {
  const [data, setData] = useState({})
  const [colorlist, setColorlist] = useState([])
  const [sizelist, setSizelist] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [colorSelected, setColorSelected] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState('')
  useEffect(() => {
    axios
      .get(`https://skillkamp-api.com/v1/api/products/details/${props.sku}`)
      .then((response) => {
        const detail = response.data.detail.data.catalog.product
        const initcolor = detail.options[0].selections.map(color => { return (color.key.toLowerCase()).replace(/ /g, '') })
        setData(detail)
        setColorlist(detail.options[0].selections.map(color => { return (color.key.toLowerCase()).replace(/ /g, '') }))
        setSizelist(detail.options[1].selections.map(size => { return (size.value) }))
        console.log(detail.options[0].selections)
        console.log(initcolor[0])
        const selected = detail.options[0].selections.filter(element => element.key.toLowerCase().replace(/ /g, '') === initcolor[0])
        const imageURL = selected[0].linkedMediaItems[0].fullUrl
        setImage(imageURL)
        setColorSelected(selected[0].key.toLowerCase().replace(/ /g, ''))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  const onChangeColor = (color) => {
    const selected = data.options[0].selections.filter(element => element.key.toLowerCase().replace(/ /g, '') === color)
    setColorSelected(selected[0].key.toLowerCase().replace(/ /g, ''))
    const imageURL = selected[0].linkedMediaItems[0].fullUrl
    setImage(imageURL)
  }
  return (
        <Modal onClose={props.onClose}>
            <div className='detail-container'>
                <img style={{ width: '500px' }} src={image}/>
                <div ><p>{data.name}</p>
                <p>{data.formattedDiscountedPrice}</p>
                <p>sku: {data.sku} </p>
                <p>color</p>
                <ul className='color-container'>{colorlist.map(color => {
                  return (<li key={color.id} ><button onClick={() => {
                    onChangeColor(color)
                    console.log(colorSelected, color)
                  }} className={`color ${colorSelected === color && 'selected'} ${color}`}/></li>)
                })} </ul>
                <div>
                    <div>size</div>
                    <select id="fruits">
                        <option>Select</option>
                        {sizelist.map(size => { return (<option key={size}>{size}</option>) })}
                    </select>
                </div>
                <div>
                    <p>Quantity</p>
                    <input type="text" value={1} />
                </div>
                <Button text='Add to Cart' color='#282828' icon='none' width='350px' />
                <NavLink>View More Detail</NavLink>
                </div>
            </div>
        </Modal>
  )
}
DetailCard.propTypes = {
  onClose: PropTypes.func,
  sku: PropTypes.string,
  mediaUrl: PropTypes.string,
  price: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string,
  formattedPrice: PropTypes.string
}
export default DetailCard