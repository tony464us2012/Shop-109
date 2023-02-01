import React from 'react'
// import { Card, Button } from 'react-bootstrap'
import { Card, Image, CardBody, Text, Stack, Flex, } from '@chakra-ui/react'

const Banner = () => {
  return (
    
    <Flex justifyContent='space-around' margin='6rem auto' flexWrap='wrap'>
      <Card maxW='sm'>
        <Image
            src='/images/nica_burger.jpg'
            alt='Nica Burger'
            borderRadius='lg'
            objectFit='cover'
           
          />
        <CardBody>
          <Stack mt='3' spacing='5'>
          <Text as='b' fontSize='2rem' textAlign='center'>Artisan Burgers</Text>
            <Text textAlign='center'>
              Creative and great tasting artisan burgers.
            </Text>
          </Stack>
        </CardBody>
      </Card>
      <Card maxW='sm'>
          <Image
            src='/images/beer-tap2.jpg'
            alt='Tap Beers'
            borderRadius='lg'
            objectFit='cover'
        

          />
        <CardBody>
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