import React from 'react'
import Product from '../Product'

const ForkandKnife = ({ forkandknifes }) => {


    return (
        <>
               <div className='menu-item-container'>
                    {forkandknifes.map(product => (
                            <Product product={product} />
                    ))}
                </div>
        </>
    )
}

export default ForkandKnife