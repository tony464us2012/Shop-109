import React, { useEffect, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {createOrder} from '../actions/orderActions'
import Message from '../components/Message'
import CardSection from '../components/CardSection'

const PlaceOrderScreen = ({ history }) => {

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    const user = useSelector(state => state.userLogin.userInfo)
    const { name, email } = user

    const [processing, setProcessing] = useState(false);

    const [billingDetails, setBillingDetails] = useState({
        name: '',
      });

    const [day, setDay] = useState(new Date().getDay())
    const [hour, setHour] = useState(new Date().getHours())
    const [open, setOpen] = useState(null)

    const subtotal = cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
    const tax = Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))
    const totalprice = Number(cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2))  + Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))

    useEffect(() => {
        if(success) {
            history.push(`/confirmation/${order._id}`)
        }
        if (day >= 1 && day <= 4) {
            if (hour >= 12 && hour < 22 ) {
                setOpen(true)
            } else { setOpen(false) }
        } else if (day === 5 || day === 6) {
            if (hour >= 12 ) {
                setOpen(true)
            } else {setOpen(false)}
         } else {
             if (hour >= 12 && hour < 20) {
                 setOpen(true)
             }
         }
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);}
        //eslint-disable-next-line
    }, [history, success])
   
    function tick() {setDay(new Date().getDay()); setHour(new Date().getHours())}

    const placeOrderHandler = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
          return;
        }
        setProcessing(true)
        const card = elements.getElement(CardElement)
        const token = await stripe.createToken(card);
        if (token.error) {
            console.log(token.error)
        } else {
      
            dispatch(createOrder({
                name: billingDetails.name,
                email,
                orderItems: cart.cartItems,
                subtotal,
                tax,
                totalprice,
                token: token.token.id
            }))
            localStorage.removeItem('cartItems')
            setProcessing(false)
        }
        }

    return (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Contact Info</h2>
                            <h5>
                              Name: {name}
                            </h5>
                            <h5>
                              Email: {email}
                            </h5>
                            <h5>
                              Phone: 123-456-7890
                            </h5>
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
                                                   <p>${item.price}</p>
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
                                    <Col><p>${subtotal}</p></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col><p>${tax}</p></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col><p>${totalprice}</p></Col>
                                </Row>
                            </ListGroup.Item>
                                {error && <ListGroup.Item><Message variant='danger'>{error}</Message></ListGroup.Item> }
                            <ListGroup.Item>
                                <Form onSubmit={placeOrderHandler}>
                                <h5 className='billingTitle'>Billing Information</h5>
                                <Form.Group>
                                    <Form.Label>Name on Card</Form.Label>
                                    <Form.Control type="text" className='cardInfo' size='sm' name='name' onChange={(e) => setBillingDetails({name: e.target.value})} placeholder="Enter name" required />
                                </Form.Group>
                                <CardSection />
                                <Button type='submit' className='pay-btn' variant='light' size='sm' disabled={cart.cartItems === 0 || !stripe}>{processing? 'Processing...' : 'PLACE ORDER'} </Button>
                                {!open ? <h5 style={{textAlign: 'center', marginTop: '.5rem'}}>We are currently closed</h5> : ''}
                                </Form>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
