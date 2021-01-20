import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import MenuHeader from '../components/MenuHeader'
import Burger from '../components/Burger'
import Salad from '../components/Salad'
import Appetizer from '../components/Appetizer'

const MenuScreen = () => {


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const burgers = products.filter(product => product.category === 'Burger')
    const appetizers = products.filter(appetizer => appetizer.category === 'Appetizer')
    const salads = products.filter(salad => salad.category === 'Salad')

    console.log(products)

    return (
        <>
            <Meta />
            <MenuHeader />
            <h1>Menu</h1>
            <Appetizer appetizers={appetizers} />
            <Salad salads={salads}/>
            <Burger burgers={burgers} />
        </>
    )
}

export default MenuScreen