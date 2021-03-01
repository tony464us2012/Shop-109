import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const user = useSelector(state => state.userLogin.userInfo)
    const { name, email } = user

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice

        }))
    }

    return (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Contact Info</h2>
                            <p>
                              Name: {name}
                            </p>
                            <p>
                              Email: {email}
                            </p>
                            <p>
                              Phone: 123-456-7890
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                <h5>{item.name}</h5>
                                                </Col>
                                                <Col md={4}>
                                                   ${item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>{cart.cartItems.length}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> ${(cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2)}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${Number(cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2))  + Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrderHandler}>PLACE ORDER</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
