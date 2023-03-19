import React, { useState } from 'react'
import Loader from './Loader'
import Message from './Message'
import { Badge, Box, Image } from '@chakra-ui/react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const MainPicture = () => {

    const [loading] = useState(false)
    const [error] = useState(false)

    const navigate = useNavigate()

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Box style={{position: 'relative', maxWidth:'1000px', margin: '0 auto'}} >
            <Image
            loading='lazy'
            src='/images/blue_moon.jpg'
            alt='Burger'
            objectFit='cover'
            width= '100%'
          />
          <div className='frontpage-text'>
            <Badge ml='1' fontSize='1.5rem' variant='danger' color='red' style={{transform: 'rotate(-10deg)'}}>New</Badge>
            <h1 className='main-text'>Great Tasting Burgers</h1>
            <Button variant='danger' onClick={() => navigate('/menu')} style={{marginTop:'1rem', borderRadius: '2px'}}>Order Now</Button>
          </div>
        </Box>
    )
}

export default MainPicture
