import React, { useState } from 'react'
import Loader from './Loader'
import Message from './Message'
import { Badge, Box, Image } from '@chakra-ui/react'

const MainPicture = () => {

    const [loading] = useState(false)
    const [error] = useState(false)

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Box >
            <Image
            loading='lazy'
            src='/images/blue_moon.jpg'
            alt='Burger'
            borderRadius='lg'
            objectFit='cover'
            maxWidth='1024px'
            margin='0 auto'
            fluid='true'
          />
          <Badge ml='1' fontSize='2rem' variant='subtle' colorScheme='red'>New</Badge>
          <h1 className='main-text'>Artisan</h1>
          <h2 className='main-text2'>Burgers</h2>
        </Box>
        //    {/* <Badge ml='1' fontSize='2rem' variant='subtle' colorScheme='red'>New</Badge> */}
        //    {/* <h1 className='main-text'>Artisan</h1> */}
        //    {/* <h2 className='main-text2'>Burgers</h2> */}
    )
}

export default MainPicture
