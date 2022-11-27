import React from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import PropTypes from 'prop-types';

const MainDisplayBeers = ({ name, logo, abv, ibu, beerstyle, brewery, ratingCount, ratingScore, description, logo2 }) => {

    return (
    <>
        <Flippy  flipOnClick={true}>
            <FrontSide className='front main-section' >
                { logo ?  <div className="logo-container">
                    <img src= {logo} alt='beer-logo' />
                </div> : 
                <div className="logo-container">
                <img src= {logo2} alt='beer-logo' />
                </div>
                }
                <div className="main-details">
                    <h1>{name}</h1>
                    <h3>{brewery}</h3>
                    <p>{beerstyle}</p>
                </div>
                <div className="main-bottom">
                    <p>{abv}<br/> ABV</p>
                    <p>{ibu} <br/> IBU</p>
                    <p>{ratingCount} <br/>Rating Count</p>
                    <p>{ratingScore.toPrecision(2)}/4 <br/>Rating Score</p>
                </div>
            </FrontSide>
            <BackSide className='back'>
                <div className="main-description" >
                    <p>{description}</p>
                </div>
            </BackSide>
        </Flippy>
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
