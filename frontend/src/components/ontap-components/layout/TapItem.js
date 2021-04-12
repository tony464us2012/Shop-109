import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { removeBeer } from '../../../actions/beerActions'
import { Button } from 'react-bootstrap'
import '../../../tap.css'



const TapItem = ({name, logo, abv, ibu, beerstyle, brewery, ratingCount, ratingScore, id, logo2}) => {
  
    const dispatch = useDispatch()

    return (
        <div variant='dark' className="beer-section beer-section1">
            { logo ?  <div className="logo-container">
                <img src= {logo} alt='beer-logo' />
            </div> : 
            <div className="logo-container">
            <img src= {logo2} alt='beer-logo' />
        </div>
            }
            <div className="details details1">
                <h1>{ name }</h1>
                <h3>{ brewery }</h3>
                <p style={{color: 'white'}}>{ beerstyle }</p>
            </div>
            <div className="bottom bottom1" style={{marginTop: '2%', marginLeft: '2%', marginBottom:'1rem'}}>
                <p>{ abv }<br/> ABV</p>
                <p>{ ibu } <br/> IBU</p>
                <p>{ ratingCount } <br/>Rating Count</p>
                <p>{ ratingScore.toPrecision(2) }/4 <br/>Rating Score</p>
            </div>
            <Button className="remove-btn" variant='dark' onClick={()=> {dispatch(removeBeer(id))}}>Remove</Button>
        </div>
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