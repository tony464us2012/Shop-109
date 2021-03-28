import React from 'react'
import BeerProduct from '../BeerProduct'



const Ale = ({ ale }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {ale.map(product => (
                            <BeerProduct product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Ale