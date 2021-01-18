import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const ProductCarousel = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
           <p>Carousel goes here</p>
           <p>Carousel goes here2</p>
        </Carousel>
    )
}

export default ProductCarousel
