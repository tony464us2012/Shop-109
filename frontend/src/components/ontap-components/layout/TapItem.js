import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeBeer } from '../../../actions/beerActions'
import { Button } from 'react-bootstrap'
import '../../../tap.css'
import { Card,  CardBody, CardFooter, Text, Divider, Image, Stack, Flex, Box } from '@chakra-ui/react'




const TapItem = ({name, logo, abv, ibu, beerstyle, brewery, ratingCount, ratingScore, id, logo2}) => {
  
    const dispatch = useDispatch()

    return (
        <Card maxW='sm' boxShadow='5px 5px 10px grey'>
            <CardBody>
                <Image
                src= {logo}
                alt='Beer Tap'
                borderRadius='lg'
                boxSize='150px'
                margin='0 auto'
                />
                <Stack mt='6' spacing='3'>
                    <Text fontSize='1.5rem' textAlign='center'>{name}</Text>
                    <Text textAlign='center'>{brewery}</Text>
                    <Text textAlign='center'>{beerstyle}</Text>
                </Stack>
                <Flex justifyContent='center' marginTop='1rem'>
                    <Box p='2.5'>
                    {abv}
                    </Box>
                    <Box p='2.5'>
                    {ibu}
                    </Box>
                    <Box p='2.5'>
                    {ratingCount}
                    </Box>
                    <Box p='2.5'>
                    {ratingScore.toPrecision(2)}/4 
                    </Box>
                </Flex>
                <Flex justifyContent='center'>
                    <Box p='2' borderTop='1px solid lightgrey'>
                    ABV
                    </Box>
                    <Box p='2' borderTop='1px solid lightgrey'>
                    IBU
                    </Box>
                    <Box p='2' borderTop='1px solid lightgrey'>
                    Rating
                    </Box>
                    <Box p='2' borderTop='1px solid lightgrey'>
                    Score
                    </Box>
                </Flex>
            </CardBody>
            <Divider />
            <CardFooter justifyContent='center'>
                <Button variant='danger' onClick={()=> {dispatch(removeBeer(id))}}>
                    Remove
                </Button>
            </CardFooter>
        </Card>
        // <div variant='light' className="main-section">
        //     { logo ?  <div className="logo-container">
        //         <img src= {logo} alt='beer-logo' />
        //     </div> : 
        //     ''
        //     }
        //     <div className="main-details">
        //         <h1>{ name }</h1>
        //         <h3>{ brewery }</h3>
        //         <p style={{color: 'white'}}>{ beerstyle }</p>
        //     </div>
        //     <div className="main-bottom" style={{marginTop: '2%', marginLeft: '2%', marginBottom:'1rem'}}>
        //         <p>{ abv }<br/> ABV</p>
        //         <p>{ ibu } <br/> IBU</p>
        //         <p>{ ratingCount } <br/>Rating Count</p>
        //         <p>{ ratingScore.toPrecision(2) }/4 <br/>Rating Score</p>
        //     </div>
        //     <Button className="remove-btn" size='sm' variant='danger' onClick={()=> {dispatch(removeBeer(id))}}>Remove</Button>
        // </div>
        )
    }

    TapItem.propTypes = {
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
        abv: PropTypes.number.isRequired,
        ibu: PropTypes.number.isRequired,
        beerstyle: PropTypes.string.isRequired,
        brewery: PropTypes.string.isRequired,
        ratingCount: PropTypes.number.isRequired,
        ratingScore: PropTypes.number.isRequired,
        id: PropTypes.string.isRequired,
        }

    export default TapItem