import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { getMainBeers } from '../actions/beerActions'
import MainPicture from '../components/MainPicture'
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
            <MainPicture />
            {/* {!keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light'>Go Back</Link>) } */}
        </>
    )
}

export default HomeScreen
