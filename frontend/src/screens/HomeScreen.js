import React from 'react'
import Banner from '../components/Banner'
import MainPicture from '../components/MainPicture'
import Meta from '../components/Meta'




const HomeScreen = () => {
    
    
    return (
        <>
            <Meta />
            <div style={{paddingBottom: '6rem'}}></div>
            <MainPicture />
            <Banner/>
        </>
    )
}

export default HomeScreen
