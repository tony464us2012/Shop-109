import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Col, Button, Card, Nav } from 'react-bootstrap'
import Message from '../components/Message'
import { removeFromCart } from '../actions/cartActions'

const CartScreen = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart 

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
            navigate('/placeorder')
    }

    return (
    <>
            <div className='gap'></div>
            <h1 className='text-center title'>Shopping Cart</h1>
               {cartItems.length === 0 ? <div className='empty-cart'>Your cart is empty.</div> : (
                    <div className='cart-item-container'>
                       {cartItems.map(item => (
                           <Card variant='light' key={item.id}>
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
                                        <Button variant='danger' size='sm' style={{width: '25%', marginLeft: 'auto', marginRight: '.3rem', marginBottom:'.3rem', padding: '.1rem .4rem'}} onClick={() => removeFromCartHandler(item.id)}>delete</Button>
                           </Card>
                       ))}
                    </div>
                       )}
            {cartItems.length > 0 ? <Col className="checkout-btn" >
                    <Button type='button' variant='success' className='btn' style={{marginTop: '2rem', padding: '.5rem 1rem'}} onClick={checkoutHandler}>PROCEED TO CHECKOUT</Button>
            </Col> : ''}
      </>
    )
}

export default CartScreen
