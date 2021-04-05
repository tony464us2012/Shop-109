import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { getMainBeers } from '../actions/beerActions'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
    
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(listProducts())
        dispatch(getMainBeers())
    }, [dispatch])

    return (
        <>
            <Meta />
            <ProductCarousel />
            {/* {!keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light'>Go Back</Link>) } */}
        </>
    )
}

export default HomeScreen
