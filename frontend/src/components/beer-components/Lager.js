import React from 'react'
import BeerProduct from '../BeerProduct'



const Lager = ({ lager }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {lager.map(product => (
                            <BeerProduct product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Lager