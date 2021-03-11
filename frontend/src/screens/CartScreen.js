import React, { useEffect } from 'react'
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

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/placeorder')
    }

    return (
       <Row>
           <Col md={9}>
               <h1>Shopping Cart</h1>
               {cartItems.length === 0 ? <Message>Your cart is empty<Link to='/'> Go Back</Link></Message> : (
                   <ListGroup variant='flush'>
                       {cartItems.map(item => (
                           <ListGroup.Item style={{paddingRight: '2.5rem'}}>
                               <Row>
                                   <Col md={2}>
                                       <Image src={item.image} alt={item.name} fluid rounded />
                                   </Col>
                                <Col md={3}>
                                   <h5>{item.name}</h5>
                                </Col>
                                <Col md={2}>${item.price}</Col>
                                <Col md={1} style={{marginLeft: 'auto'}}>
                                    <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.id)}>
                                        <i className='fas fa-trash'></i>
                                    </Button>
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
           </Col>
           <Col md={3}>
               <Card>
                   <ListGroup variant='flush'>
                       <ListGroup.Item>
                           <h2>Subtotal</h2>
                           ${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                           <h2>Tax</h2>
                           ${(cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2)}
                           <h2>Total</h2>
                           ${Number(cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2))  + Number((cartItems.reduce((acc, item) => acc + item.price, 0) * .07).toFixed(2))}
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <Button type='button' className='btn-block' disabled={cartItems.length === 0} onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
                       </ListGroup.Item>
                   </ListGroup>
               </Card>
           </Col>
       </Row>
    )
}

export default CartScreen
