import React from 'react'
import Banner from '../components/Banner'
import MainPicture from '../components/MainPicture'
import Meta from '../components/Meta'




const HomeScreen = () => {
    
    
    return (
        <>
            <Meta />
            <div style={{paddingBottom: '4rem'}}></div>
            <MainPicture />
            <Banner/>
            {/* {!keyword ? (<ProductCarousel />) : (<Link to='/' className='btn btn-light'>Go Back</Link>) } */}
        </>
    )
}

export default HomeScreen
