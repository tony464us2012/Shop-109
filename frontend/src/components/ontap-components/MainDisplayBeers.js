import React, {useState} from 'react';
import { Card,  CardBody, CardFooter, Text, Divider, Image, Stack, Flex, Box } from '@chakra-ui/react'
import PropTypes from 'prop-types';

const MainDisplayBeers = ({ name, logo, abv, ibu, beerstyle, brewery, ratingCount, ratingScore, description, logo2 }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    return (
    <>
       <div
      className={`card-container ${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className='card'  >
        <div className="face card-front main-section">
            <Image
                    src= {logo}
                    alt={name}
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
                        <Box p='1.5'>
                        {abv}
                        </Box>
                        <Box p='1.5'>
                        {ibu}
                        </Box>
                        <Box p='1.5'>
                        {ratingCount}
                        </Box>
                        <Box p='1.5'>
                        {ratingScore.toPrecision(2)}/4 
                        </Box>
                    </Flex>
                    <Flex justifyContent='center'>
                        <Box p='1' borderTop='1px solid lightgrey'>
                        ABV
                        </Box>
                        <Box p='1' borderTop='1px solid lightgrey'>
                        IBU
                        </Box>
                        <Box p='1' borderTop='1px solid lightgrey'>
                        Rating
                        </Box>
                        <Box p='1' borderTop='1px solid lightgrey'>
                        Score
                        </Box>
                    </Flex>
        </div>
        <div className="face card-back">
        <div className="main-description" >
                    <p>{description}</p>
                </div>
        </div>
      </div>
    </div>
        {/* <Flippy  flipOnClick={true}>
            <FrontSide className='front main-section' >
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
                    <Box p='1.5'>
                    {abv}
                    </Box>
                    <Box p='1.5'>
                    {ibu}
                    </Box>
                    <Box p='1.5'>
                    {ratingCount}
                    </Box>
                    <Box p='1.5'>
                    {ratingScore.toPrecision(2)}/4 
                    </Box>
                </Flex>
                <Flex justifyContent='center'>
                    <Box p='1' borderTop='1px solid lightgrey'>
                    ABV
                    </Box>
                    <Box p='1' borderTop='1px solid lightgrey'>
                    IBU
                    </Box>
                    <Box p='1' borderTop='1px solid lightgrey'>
                    Rating
                    </Box>
                    <Box p='1' borderTop='1px solid lightgrey'>
                    Score
                    </Box>
                </Flex>
            </FrontSide>
            <BackSide className='back'>
                <div className="main-description" >
                    <p>{description}</p>
                </div>
            </BackSide>
        </Flippy> */}
    </>
)};
    MainDisplayBeers.propTypes = {
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    abv: PropTypes.number.isRequired,
    ibu: PropTypes.number.isRequired,
    beerstyle: PropTypes.string.isRequired,
    brewery: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    ratingScore: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    }

    export default MainDisplayBeers
