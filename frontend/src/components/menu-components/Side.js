import React from 'react'
import Product from '../Product'

const Side = ({ sides }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {sides.map(product => (
                            <Product product={product} />
                    ))}
                </div>
        </>
    )
}

export default Side