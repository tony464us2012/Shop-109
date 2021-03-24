import React from 'react'
import BeerProduct from '../BeerProduct'



const Sour = ({ sour }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {sour.map(product => (
                            <BeerProduct product={product} />
                    ))}
                </div>
        </>
    )
}

export default Sour