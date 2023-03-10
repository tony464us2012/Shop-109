import React from 'react'
// import { Card, Button } from 'react-bootstrap'
import { Card, Image, CardBody, Text, Stack, Flex, } from '@chakra-ui/react'

const Banner = () => {
  return (
    
    <Flex className='banner-container' justifyContent='space-evenly' margin='2rem auto' flexWrap='wrap'>
      <Card className='banner' maxW='sm' marginBottom='2rem'>
        <Image
            src='/images/nica_burger.jpg'
            alt='Nica Burger'
            borderRadius='lg'
            objectFit='cover'
          />
        <CardBody id='cardBody'>
          <Stack mt='3' spacing='5'>
          <Text as='b' fontSize='2rem' textAlign='center'>Artisan Burgers</Text>
            <Text textAlign='center'>
              One of the best burgers you'll try. 
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Card className='banner' maxW='sm' marginBottom='2rem'>
          <Image
            src='/images/beer-tap2.jpg'
            alt='Tap Beers'
            borderRadius='lg'
            objectFit='cover'
          />
        <CardBody id='cardBody'>
          <Stack mt='1' spacing='5'>
          <Text as='b' fontSize='2rem' textAlign='center'>Craft Beers</Text>
            <Text textAlign='center'>
              Over 100 different types of craft beers. Come try a few.
            </Text>
          </Stack>
        </CardBody>
      </Card>
    </Flex>
  )
}

export default Banner