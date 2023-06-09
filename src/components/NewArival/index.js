import React from 'react'
import './index.css'
import PropTypes from 'prop-types'
import CardSlider from './Cards'
const NewArrival = (props) => {
  return (<React.Fragment>
        <h2 className='headertext'>New Arrival</h2>
        <CardSlider product={props.products} num={4}/>

    </React.Fragment>
  )
}
NewArrival.propTypes = {
  products: PropTypes.array
}
export default NewArrival
