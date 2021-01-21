import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const Slider = ({ sliders }) => {


    return (
        <>
            <h3>Sliders</h3>
               <Row>
                    {sliders.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}

export default Slider