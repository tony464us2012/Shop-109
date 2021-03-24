import React from 'react'
import BeerProduct from '../BeerProduct'



const Lager = ({ lager }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {lager.map(product => (
                            <BeerProduct product={product} />
                    ))}
                </div>
        </>
    )
}

export default Lager