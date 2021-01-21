import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const ForkandKnife = ({ forkandknifes }) => {


    return (
        <>
            <h3>Fork and Knife</h3>
               <Row>
                    {forkandknifes.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}

export default ForkandKnife