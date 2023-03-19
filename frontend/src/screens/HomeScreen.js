import React from 'react'
import Banner from '../components/Banner'
import MainPicture from '../components/MainPicture'
import Meta from '../components/Meta'




const HomeScreen = () => {
    
    
    return (
        <>
            <Meta />
            {/* <div style={{paddingBottom: '3rem'}}></div> */}
            <MainPicture />
            <div style={{display: 'block', margin: '3rem auto', width:'75%', borderBottom: '1px solid lightgrey'}}></div>
            <Banner/>
        </>
    )
}

export default HomeScreen
