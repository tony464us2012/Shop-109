import React, { useEffect } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import MenuHeader from '../components/MenuHeader'
import Burger from '../components/Burger'
import Salad from '../components/Salad'
import Appetizer from '../components/Appetizer'

const MenuScreen = ({ match }) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            <MenuHeader />
            <h1>Menu</h1>
            <Appetizer />
            <Salad />
            <Burger />
        </>
    )
}

export default MenuScreen