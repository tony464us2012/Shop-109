import React from 'react'
import BeerProduct from '../BeerProduct'



const Sour = ({ sour }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {sour.map(product => (
                            <BeerProduct product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Sour