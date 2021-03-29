import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Meta from '../components/Meta'
import MenuHeader from '../components/MenuHeader'
import Burger from '../components/menu-components/Burger'
import Salad from '../components/menu-components/Salad'
import Appetizer from '../components/menu-components/Appetizer'
import ForkandKnife from '../components/menu-components/ForkandKnife'
import Sandwich from '../components/menu-components/Sandwich'
import Slider from '../components/menu-components/Slider'
import Side from '../components/menu-components/Side'
import Beer from '../components/Beer'
import Loader from '../components/Loader'

const MenuScreen = () => {

    const [tab, setTab] = useState('Appetizer')
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    const productList = useSelector(state => state.productList)
    const { products, loading } = productList

    const burgers = products.filter(product => product.category === 'Burger')
    const appetizers = products.filter(appetizer => appetizer.category === 'Appetizer')
    const salads = products.filter(salad => salad.category === 'Salad')
    const forkandknifes = products.filter(forkandknife => forkandknife.category === 'ForkandKnife')
    const sandwiches = products.filter(sandwich => sandwich.category === 'Sandwich')
    const sliders = products.filter(slider => slider.category === 'Slider')
    const sides = products.filter(side => side.category === 'Side')

    const tabHandler = (tab) => {
        setTab(tab)
    }

    return loading ? <Loader /> : (
        <>
            <Meta />
            <h1 className='menu-title'>Menu</h1>
            <MenuHeader tabHandler={tabHandler} tab={tab} />
            {tab === 'Appetizer' ? <Appetizer appetizers={appetizers} key={appetizers._id} /> :
             tab === 'Salad' ? <Salad salads={salads} key={salads._id}/> :
             tab === 'Burger' ?  <Burger burgers={burgers} key={burgers._id} /> :
             tab === 'ForkandKnife' ?  <ForkandKnife forkandknifes={forkandknifes} key={forkandknifes._id}/> :
             tab === 'Sandwich' ? <Sandwich sandwiches={sandwiches} key={sandwiches._id} /> : 
             tab === 'Slider' ? <Slider sliders={sliders} key={sliders._id} /> :
             tab === 'Side' ? <Side sides={sides} key={sides._id} /> : 
             <Beer />
            }
            <h6 className='advisory'>CONSUMER ADVISORY</h6>
            <p className='advisory-text'>*Consuming raw or undercooked, meats, poultry, seafood, shellfish, or eggs may increase your risk of foodborne illness especially if you have certain medical conditions.</p>
        </>
    )
}

export default MenuScreen