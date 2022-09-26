import React from 'react'
import { Col, ListGroup, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ConfirmationScreen = ({match}) => {

    const orderId = match.params.id
   
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, loading, error } = orderCreate

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
    <div className='padding' style={{paddingTop: '3rem', justifyContent: 'center'}}>
                <Col className='center'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item variant='light' className='confirmation-text'>
                            <h2 style={{color: 'black'}}>Order Confirmation</h2>
                            <div>Thank you for ordering at 109 Burger Joint. Confirmation #{orderId.slice(20)}. Your order will be ready for pickup in about 40 minutes.
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Table striped bordered responsive id='table' className='table-sm'>
                    <thead>
                        <tr style={{backgroundColor: '#e9ecef'}}>
                            <th>Order Summary</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>Subtotal</p>
                            </td>
                            <td>
                                <p>{order.subtotal}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Tax</p>
                            </td>
                            <td>
                                <p>{order.tax}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Total</p>
                            </td>
                            <td>
                                <p>{order.totalprice}</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
    </div>
}

export default ConfirmationScreen
