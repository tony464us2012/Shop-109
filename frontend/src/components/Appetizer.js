import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'



const Appetizer = ({ appetizers }) => {


    return (
        <>
            <h3>Appetizer</h3>
               <Row>
                    {appetizers.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}

export default Appetizer