import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]) : 1
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart 

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const [day, setDay] = useState(new Date().getDay())
    const [hour, setHour] = useState(new Date().getHours())
    const [open, setOpen] = useState(null)

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
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
               },[dispatch, productId, qty, day, hour])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    function tick() {setDay(new Date().getDay()); setHour(new Date().getHours())}

    const checkoutHandler = () => {
        if (userInfo) {
            history.push('/placeorder')
        } else {
            history.push('/login')
        }
    }

    return (
       <div className='padding'>
               {cartItems.length === 0 ? <Message>Your cart is empty.</Message> : (
            <>
                <Col md={9}>
                  <h1>Shopping Cart</h1>
                   <ListGroup variant='light'>
                       {cartItems.map(item => (
                           <ListGroup.Item variant='light' style={{padding: '1rem 2.5rem'}}>
                               <Row>
                                   <Col md={2}>
                                       <Image src={item.image} alt={item.name} fluid rounded />
                                   </Col>
                                <Col style={{marginLeft: '2rem'}}>
                                    <Row>
                                        <h2>{item.name}</h2>
                                    </Row>
                                    <Row>
                                        <p>${item.price}</p>
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
                                </Col>
                                <Col md={1} style={{marginLeft: 'auto'}}>
                                    <Row>
                                        <button type='button btn-sm' variant='danger' onClick={() => removeFromCartHandler(item.id)}>
                                            {/* <i className='fas fa-trash' style={{fontSize: '1rem'}}></i> */}
                                            Remove
                                        </button>
                                    </Row>
                                </Col>
                               </Row>
                           </ListGroup.Item>
                       ))}
                   </ListGroup>
                </Col>
           <Col className="marginTop" md={3}>
               <Card>
                   <ListGroup>
                       {/* <ListGroup.Item variant='light'>
                           <h2>Take-Out</h2>
                       </ListGroup.Item> */}
                       <ListGroup.Item variant='light' className='cart-price'>
                           <h2>Subtotal</h2>
                           <p>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</p>
                           {/* <h2>Tax</h2>
                           <p>${(cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2)}</p>
                           <h2>Total</h2>
                           <p>${Number(cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2))  + Number((cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))}</p> */}
                       </ListGroup.Item>
                           {!open ? <h5 style={{textAlign: 'center', marginTop: '.5rem'}}>We are currently closed</h5> : ''}
                           <Button type='button' variant='success' className='btn' disabled={cartItems.length === 0 || !open} onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
                   </ListGroup>
               </Card>
           </Col>
        </>
               )}
       </div>
    )
}

export default CartScreen
