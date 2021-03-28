import React from 'react'
import BeerProduct from '../BeerProduct'



const PorterandStout = ({ porterandstout }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {porterandstout.map(product => (
                            <BeerProduct product={product} key={product._id}/>
                    ))}
                </div>
        </>
    )
}

export default PorterandStout