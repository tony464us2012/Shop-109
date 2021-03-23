import React from 'react'
import Product from '../Product'

const Burger = ({ burgers }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {burgers.map(product => (
                            <Product product={product} />
                    ))}
                </div>
        </>
    )
}

export default Burger