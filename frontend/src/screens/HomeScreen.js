import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {!keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light'>Go Back</Link>) }
        </>
    )
}

export default HomeScreen
