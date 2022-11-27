import React, { useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const MainPicture = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <div className='MainPicture'>
           <span>New</span><br></br>
           <span className='main-text'>Unique Burgers</span>
        </div>
    )
}

export default MainPicture
