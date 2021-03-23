import React from 'react'
import Product from '../Product'



const Appetizer = ({ appetizers }) => {


    return (
        <>
                  <div className='menu-item-container'>
                    {appetizers.map(product => (
                            <Product product={product} />
                    ))}
                  </div>
        </>
    )
}

export default Appetizer