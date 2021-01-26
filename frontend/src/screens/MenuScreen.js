import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import MenuHeader from '../components/MenuHeader'
import Burger from '../components/Burger'
import Salad from '../components/Salad'
import Appetizer from '../components/Appetizer'
import ForkandKnife from '../components/ForkandKnife'
import Sandwich from '../components/Sandwich'
import Slider from '../components/Slider'
import Side from '../components/Side'
import Beer from '../components/Beer'

const MenuScreen = () => {

    const [tab, setTab] = useState('Appetizer')
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const burgers = products.filter(product => product.category === 'Burger')
    const appetizers = products.filter(appetizer => appetizer.category === 'Appetizer')
    const salads = products.filter(salad => salad.category === 'Salad')
    const forkandknifes = products.filter(forkandknife => forkandknife.category === 'ForkandKnife')
    const sandwiches = products.filter(sandwich => sandwich.category === 'Sandwich')
    const sliders = products.filter(slider => slider.category === 'Slider')
    const sides = products.filter(side => side.category === 'Side')
    const beers = products.filter(beer => beer.category === 'Beer')

    const tabHandler = (tab) => {
        setTab(tab)
    }

    return (
        <>
            <Meta />
            <h1>Menu</h1>
            <MenuHeader tabHandler={tabHandler} tab={tab} />
            {tab === 'Appetizer' ? <Appetizer appetizers={appetizers} /> :
             tab === 'Salad' ? <Salad salads={salads}/> :
             tab === 'Burger' ?  <Burger burgers={burgers} /> :
             tab === 'ForkandKnife' ?  <ForkandKnife forkandknifes={forkandknifes} /> :
             tab === 'Sandwich' ? <Sandwich sandwiches={sandwiches} /> : 
             tab === 'Slider' ? <Slider sliders={sliders} /> :
             tab === 'Side' ? <Side sides={sides} /> : 
             <Beer beers={beers} />
            }
        </>
    )
}

export default MenuScreen