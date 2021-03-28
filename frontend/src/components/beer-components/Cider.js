import React from 'react'
import BeerProduct from '../BeerProduct'



const Cider = ({ cider }) => {


    return (
        <>
               <div className='beer-item-container'>
                    {cider.map(product => (
                            <BeerProduct product={product} key={product._id} />
                    ))}
                </div>
        </>
    )
}

export default Cider