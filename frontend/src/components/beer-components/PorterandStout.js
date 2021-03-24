import React from 'react'
import BeerProduct from '../BeerProduct'



const PorterandStout = ({ porterandstout }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {porterandstout.map(product => (
                            <BeerProduct product={product} />
                    ))}
                </div>
        </>
    )
}

export default PorterandStout