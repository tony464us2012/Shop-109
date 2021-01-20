import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const Burger = ({ burgers }) => {


    return (
        <>
            <h3>Burgers</h3>
               <Row>
                    {burgers.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}

export default Burger