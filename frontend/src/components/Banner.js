import React from 'react'

const Banner = () => {
  return (
    <div className='banner-item-container'>
         <div className='banner-item'>
           <div className='ban-pic ban-pic1'></div>
                <div className='ban-title'>Artisan Burgers</div>
        </div>
         <div className='banner-item'>
         <div className='ban-pic ban-pic2'></div>
                <div className='ban-title'>Craft Beers</div>
        </div>
         <div className='banner-item'>
         <div className='ban-pic ban-pic3'></div>
                <div className='ban-title'>Taco Rico</div>
        </div>
    </div>
  )
}

export default Banner