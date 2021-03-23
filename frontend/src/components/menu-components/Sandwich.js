import React from 'react'
import Product from '../Product'

const Sandwich = ({ sandwiches }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {sandwiches.map(product => (
                            <Product product={product} />
                    ))}
                </div>
        </>
    )
}

export default Sandwich