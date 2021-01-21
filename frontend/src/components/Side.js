import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const Side = ({ sides }) => {


    return (
        <>
            <h3>Sides</h3>
               <Row>
                    {sides.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}

export default Side