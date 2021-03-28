import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Card, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import dateFormat from 'dateformat'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ORDER_DETAILS_RESET } from '../actions/types'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const dispatch = useDispatch()
   
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    useEffect(() => {
        return () => {
       dispatch({type: ORDER_DETAILS_RESET})
        }
    }, [dispatch])
  

        return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
            <Col md={9}>
                <h1>Order #{orderId}</h1>
                    <ListGroup variant='flush'>
                    <ListGroup.Item>
                            <h2>Ordered By</h2>
                            <p>
                              Name: {order.user.name}
                            </p>
                            <p>
                              Email: {order.user.email}
                            </p>
                            <p>
                              Phone: 123-456-7890
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Placed</h2>
                            <p>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</p>
                        </ListGroup.Item>
                        {order.orderItems.map(item => (
                            <ListGroup.Item style={{paddingRight: '2.5rem'}}>
                                <Row>
                                 <Col md={3}>
                                    <h5>{item.name}</h5>
                                 </Col>
                                 <Col md={2}>${item.price}</Col>
                                </Row>
                                <Row>
                                  <Col md={2}></Col>
                                 {item.large ? <Col md={3}>Large</Col> : ''}
                                 {item.sauce ? <Col md={3}> {item.sauce}</Col> : ''}
                                 {item.burger ? <Col md={3}>Burger: {item.burger}</Col> : ''}
                                 {item.extraPatty ? <Col md={3}>{item.extraPatty}</Col> : ''}
                                 {item.pattySwap ? <Col md={3}>{item.pattySwap}</Col> : ''}
                                 {item.extras ? <Col md={3}>{item.extras.map(extra => <p>{extra}</p>)}</Col> : ''}
                                 {item.sideSwap ? <Col md={3}>Side: {item.sideSwap}</Col> : ''}
                                 {item.upgradeSide ? <Col md={3}>Side: {item.upgradeSide}</Col> : ''}
                                 {item.fryAddOn ? <Col md={3}>Side Add: {item.fryAddOn}</Col> : ''}
                                </Row>
                                <Row>
                                    {item.instructions ? <Col style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</Col> : '' }
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal</h2>
                            ${order.subtotal}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Tax</h2>
                            ${order.tax}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Total</h2>
                            ${order.totalprice}
                        </ListGroup.Item>
                        <ListGroup.Item style={{display: 'flex'}}>
                        <Button type='submit' className='pay-btn' style={{margin: '0 auto'}} variant='light' size='sm' onClick={() => history.push('/admin/orderlist')}>Back To Orders</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
     )
}

export default OrderScreen
