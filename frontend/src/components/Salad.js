import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'


const Salad = ({ salads }) => {

    return (
        <>
            <h3>Salads</h3>
               <Row>
                    {salads.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}

export default Salad