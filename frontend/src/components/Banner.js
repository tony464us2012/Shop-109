import React from 'react'
// import { Card, Button } from 'react-bootstrap'
import { Card, Image, CardBody, Text, Stack, Flex, } from '@chakra-ui/react'

const Banner = () => {
  return (
    
    <Flex className='banner-container' justifyContent='space-evenly' margin='1.5rem auto' flexWrap='wrap'>
      <Card className='banner' maxW='sm' marginBottom='2rem'>
        <Image
            src='/images/nica_burger.jpg'
            alt='Nica Burger'
            objectFit='cover'
          />
        <CardBody id='cardBody'>
          <Stack mt='1' spacing='1'>
          <Text as='b' fontSize='1.5rem'>Artisan Burgers</Text>
            <Text>
              One of the best burgers you'll try. 
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Card className='banner' maxW='sm' marginBottom='2rem'>
          <Image
            src='/images/beer-tap2.jpg'
            alt='Tap Beers'
            objectFit='cover'
          />
        <CardBody id='cardBody'>
          <Stack mt='1' spacing='1'>
          <Text as='b' fontSize='1.5rem'>Craft Beers</Text>
            <Text>
              Over 100 different types of craft beers. Come try a few.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}

export default Banner