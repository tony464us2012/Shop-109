import React from 'react'
import { useSelector  } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'


const Appetizer = () => {

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const appetizer = products.filter(product => product.category === 'Appetizer')

    return (
        <>
            <h3>Appetizer</h3>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <>  
               <Row>
                    {appetizer.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </>
            }
        </>
    )
}

export default Appetizer