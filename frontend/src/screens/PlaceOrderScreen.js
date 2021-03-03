import React, { useEffect } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Row, Col, ListGroup, Card, Button, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const user = useSelector(state => state.userLogin.userInfo)
    const { name, email } = user

    const subtotal = cart.cartItems.reduce((acc, item) => acc + item.price, 0)
    const tax = Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))
    const totalprice = Number(cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2))  + Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        //eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = async () => {

        const cardElement = elements.getElement(CardElement)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        })
        if (error) {
            console.log('[error]', error)
        } else {
            console.log('[PaymentMethod]', paymentMethod)
            dispatch(createOrder({
                orderItems: cart.cartItems,
                subtotal,
                tax,
                totalprice,
                isPaid: true
            }))
        }
        }

        const CARD_OPTIONS = {
            iconStyle: 'solid',
            style: {
              base: {
                iconColor: '#c4f0ff',
                color: '#fff',
                fontWeight: 500,
                fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                fontSize: '16px',
                fontSmoothing: 'antialiased',
                ':-webkit-autofill': {color: '#fce883'},
                '::placeholder': {color: '#87bbfd'},
              },
              invalid: {
                iconColor: '#ffc7ee',
                color: '#ffc7ee',
              },
            },
          };

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
                                                   Price: ${item.price}
                                                </Col>
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
                                    <Col>Subtotal</Col>
                                    <Col>${subtotal}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col> ${tax}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${totalprice}</Col>
                                </Row>
                            </ListGroup.Item>
                                {error && <ListGroup.Item><Message variant='danger'>{error}</Message></ListGroup.Item> }
                            <ListGroup.Item>
                                <form onSubmit={placeOrderHandler}>
                                <h5>Billing Information</h5>
                                <CardElement options={CARD_OPTIONS} />
                                
                                <Button type='submit' disabled={cart.cartItems === 0 || !stripe}> PLACE ORDER </Button>
                                </form>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
