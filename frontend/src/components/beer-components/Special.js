import React from 'react'
import BeerProduct from '../BeerProduct'



const Special = ({ special }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {special.map(product => (
                            <BeerProduct product={product} />
                    ))}
                </div>
        </>
    )
}

export default Special