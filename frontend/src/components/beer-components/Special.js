import React from 'react'
import BeerProduct from '../BeerProduct'



const Special = ({ special }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {special.map(product => (
                            <BeerProduct product={product} key={product._id}/>
                    ))}
                </div>
        </>
    )
}

export default Special