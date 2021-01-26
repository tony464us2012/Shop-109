import React from 'react'
import { Row, CardDeck } from 'react-bootstrap'
import BeerHeader from './BeerHeader'
import Product from '../components/Product'

const Beer = ({ beers }) => {


    return (
        <>
            <BeerHeader />
               <Row>
                    {beers.map(product => (
                        <CardDeck key={product._id} sm={12} md={6} lg={4} style={{margin: '0 .25rem'}}>
                            <Product product={product} />
                        </CardDeck>
                    ))}
                </Row>
        </>
    )
}

export default Beer