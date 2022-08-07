import React, { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const MainPicture = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <div className='MainPicture'>
           <p>Carousel goes here</p>
           <p>Carousel goes here2</p>
        </div>
    )
}

export default MainPicture
