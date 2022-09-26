import React, { useEffect, useState } from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { Row, Col, ListGroup, Button, Form, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../actions/userActions'
import {createOrder} from '../actions/orderActions'
import Message from '../components/Message'
import CardSection from '../components/CardSection'

const PlaceOrderScreen = ({ history }) => {

    const [day, setDay] = useState(new Date().getDay())
    const [hour, setHour] = useState(new Date().getHours())
    const [open, setOpen] = useState(null)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const stripe = useStripe();
    const elements = useElements();

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetail = useSelector(state => state.userDetails)
    const { user } = userDetail

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    

    const [processing, setProcessing] = useState(false);

    const [billingDetails, setBillingDetails] = useState({
        name: '',
      });

    const subtotal = cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)
    const tax = Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))
    const totalprice = Number(cart.cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2))  + Number((cart.cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))

    useEffect(() => {
        if(userInfo) {
            dispatch(getUserDetails(userInfo._id))
            setFirstName(user.firstName)
            setLastName(user.lastName)
            setPhone(user.phone)
            setEmail(user.email)
        }
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
    }, [history, success, userInfo])
   
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
            setProcessing(false);
            console.log(token.error)
            return;
        } else {
      
            dispatch(createOrder({
                name: billingDetails.name,
                // email,
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
        <div className='padding'>
            <Row style={{marginTop: '2rem', justifyContent: 'center'}}>
                <Col md={7}>
                    <ListGroup className='black'>
                    <ListGroup.Item variant='light'>
                        <div className="material-icons basket text-center">shopping_basket</div>
                        <div className='place-order-title black text-center'>Submit Your Order</div>
                    </ListGroup.Item>
                    {error ? <Message>{error}</Message> : ''}
                        <ListGroup.Item variant='light' className='black'>
                            <h5 style={{margin: '1.1rem 0', fontWeight: '200' }}>Order Type: Takeout</h5>
                        <Form onSubmit={placeOrderHandler}>
                            <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} size='sm' required />
                            </Form.Group>
                            <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} size='sm' required />
                            </Form.Group>
                            <Form.Group className="mb-3 order-info" controlId="formGroupPassword">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} size='sm' required />
                            </Form.Group>
                            <Form.Group className="mb-3 order-info" controlId="formGroupEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} size='sm' required />
                            </Form.Group>
                            <Form.Group className="mb-3 payment-cont" >
                                <div className="secure-payment">
                                   <div className="material-icons security">security</div> 
                                   <div className="secure-payment-text">
                                        <div>Secure Payment</div>
                                        <p>This is a secure, SSL-encrypted payment.</p>
                                   </div>
                                </div>
                                <div className="order-pay">
                                    <Form.Label>Name on Card</Form.Label>
                                    <Form.Control type="text" className='cardInfo' variant='light' size='sm' name='name' onChange={(e) => setBillingDetails({name: e.target.value})} placeholder="Enter name" required />
                                    <CardSection />
                                </div>
                            </Form.Group>
                                <Button type='submit' className='pay-btn' variant='success' size='sm' disabled={cart.cartItems === 0 || !stripe || !open}>{processing? 'Processing...' : 'PLACE ORDER'} </Button>
                                {!open ? <h5 style={{textAlign: 'center', marginTop: '.5rem'}}>We are currently closed</h5> : ''}
                        </Form>
                        </ListGroup.Item>
                       
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Table striped bordered responsive id='table' className='table-sm'>
                    <thead>
                        <tr style={{backgroundColor: '#e9ecef'}}>
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.cartItems.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <p>{item.name}</p>
                                        {item.large ? <p>Large</p> : ''}
                                        {item.sauce ? <p> {item.sauce}</p> : ''}
                                        {item.burger ? <p>Burger: {item.burger}</p> : ''}
                                        {item.extraPatty ? <p>{item.extraPatty}</p> : ''}
                                        {item.pattySwap ? <p>{item.pattySwap}</p> : ''}
                                        {item.extras ? <p>{item.extras.map(extra => <div>{extra}</div>)}</p> : ''}
                                        {item.sideSwap ? <p>Side: {item.sideSwap}</p> : ''}
                                        {item.upgradeSide ? <p>Side: {item.upgradeSide}</p> : ''}
                                        {item.fryAddOn ? <p>Side Add: {item.fryAddOn}</p> : ''}
                                        {item.tacoText ? <p>Taco Type: {item.tacoText}</p> : ''}
                                        {item.taco ? <p>{item.taco}</p> : ''}
                                        {item.instructions ? <p style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</p> : '' }
                                </td>
                                <td><p>${item.price}</p></td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <p>Subtotal</p>
                            </td>
                            <td>
                                <p>{subtotal}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Tax</p>
                            </td>
                            <td>
                                <p>{tax}</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p>Total</p>
                            </td>
                            <td>
                                <p>{totalprice}</p>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
