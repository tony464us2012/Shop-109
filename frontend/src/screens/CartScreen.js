import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Button, Card, Nav, Form } from 'react-bootstrap'
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
               },[dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
            history.push('/placeorder')
    }

    return (
    <>
       <Nav as="ul" className='menu-container' style={{marginBottom: '2rem'}}>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={{ backgroundColor: 'black', color: '#fff'}}>Your Order</Nav.Link>
          </Nav.Item>
        </Nav>
       <div className='cart-item-container'>
               {cartItems.length === 0 ? <Message>Your cart is empty.</Message> : (
                       cartItems.map(item => (
                           <Card variant='light'>
                                <Card.Body className='productInfo'>
                                    <Card.Title>{item.name}</Card.Title>
                                    <Card.Text className='text'>{item.description}</Card.Text>
                                        {item.large ? <div>Large</div> : ''}
                                        {item.sauce ? <div> {item.sauce}</div> : ''}
                                        {item.burger ? <div>Burger: {item.burger}</div> : ''}
                                        {item.extraPatty ? <div>{item.extraPatty}</div> : ''}
                                        {item.pattySwap ? <div>{item.pattySwap}</div> : ''}
                                        {item.extras ? <div>{item.extras.map(extra => <p>{extra}</p>)}</div> : ''}
                                        {item.sideSwap ? <div>Side: {item.sideSwap}</div> : ''}
                                        {item.upgradeSide ? <div>Side: {item.upgradeSide}</div> : ''}
                                        {item.fryAddOn ? <div>Side Add: {item.fryAddOn}</div> : ''}
                                        {item.tacoText ? <div>Taco Type: {item.tacoText}</div> : ''}
                                        {item.taco ? <div>{item.taco}</div> : ''}
                                        {item.instructions ? <div style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</div> : '' }
                                        <Card.Text className='text'><div>${item.price}</div></Card.Text>
                                </Card.Body>
                               <button variant='danger' size='sm' style={{width: '30%', marginLeft: 'auto'}} onClick={() => removeFromCartHandler(item.id)}>
                                            delete
                                        </button>
                           </Card>
                       )))}
                    </div>
            <Col className="checkout-btn" >
                    <Button type='button' variant='success' className='btn' onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
            </Col>
      </>
    )
}

export default CartScreen
