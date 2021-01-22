import React from 'react'
import { Row, CardDeck } from 'react-bootstrap'
import Product from '../components/Product'

const Sandwich = ({ sandwiches }) => {


    return (
        <>
            <h3>Sandwiches</h3>
               <Row>
                    {sandwiches.map(product => (
                        <CardDeck key={product._id} sm={12} md={6} lg={4} style={{margin: '0 .25rem'}}>
                            <Product product={product} />
                        </CardDeck>
                    ))}
                </Row>
        </>
    )
}

export default Sandwich