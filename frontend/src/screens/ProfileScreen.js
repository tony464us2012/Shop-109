import React, { useState, useEffect } from 'react'
import { Form, Button, Row, Col, Table, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { updateUserProfile, getUserDetails } from '../actions/userActions'
import { myOrders, getOrderDetails } from '../actions/orderActions'
import dateFormat from 'dateformat'
import { MY_ORDERS_RESET, ORDER_DETAILS_RESET } from '../actions/types'

const ProfileScreen = ({ history }) => {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
   
    const userDetail = useSelector(state => state.userDetails)
    const { user } = userDetail

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const myOrdersList = useSelector(state => state.myOrders)
    const { loading:loadingOrders, error:errorOrders, orders } = myOrdersList

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading:loadingDetails, error:errorDetails } = orderDetails
    
    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
              dispatch(myOrders(userInfo._id))
              dispatch(getUserDetails(userInfo._id))
              setFirstName(user.firstName)
              setLastName(user.lastName)
              setPhone(user.phone)
              setEmail(user.email)
            }
              return () => {
                  dispatch({type: MY_ORDERS_RESET})
                  dispatch({type: ORDER_DETAILS_RESET})
              }

    }, [dispatch, history, userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
            dispatch(updateUserProfile({ id: userInfo._id, firstName, lastName, email, phone}))
    }

    const orderDetailsHandler = (id) => {
        dispatch(getOrderDetails(id))
    }

    return (
        <>
        <div className="padding row profile">
            {success && <Message variant='success'>Profile Updated</Message>}
            { message ? <Message variant='danger'>{message}</Message> : ''}
            <Col md={3} >
            <h1>Profile</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='name'>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type='name' value={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='phone'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type='phone' value={phone} onChange={(e) => setPhone(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
                </Form>
            </Col>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> :
             orders.length === 0 ?  <Col md={3}><Message variant='info'>No Orders..</Message></Col> :
                 (<>
            <Col md={7}>
                <h1>My Orders</h1>
              
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ORDER #</th>
                                <th>ORDER DATE</th>
                                <th>TOTAL PRICE</th>
                            </tr>
                        </thead>
                          {orders.map(order => (
                            <tbody>
                                <tr key={order._id}>
                                    <td><button  onClick={() => orderDetailsHandler(order._id)}>{order._id}</button></td>
                                    <td><button onClick={() => orderDetailsHandler(order._id)}>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</button></td>
                                    <td><button onClick={() => orderDetailsHandler(order._id)}>${order.totalprice}</button></td>
                                </tr>
                         </tbody>
                          ))}
                    </Table>
                    </Col>
                  </>
                )}
                </div>
                { loadingDetails ? <Loader/> : errorDetails ? <Message variant='danger'>{errorDetails}</Message> : order.length !== 0 ?  (
                    <div className='padding'>
                     <h2 style={{color: 'black'}}>Order #{order._id}</h2>
                    <ListGroup variant='flush'>
                        {order.orderItems.map(item => (
                            <ListGroup.Item variant='light' style={{paddingRight: '2.5rem'}}>
                                <Row>
                                 <Col md={3}>
                                    <h5>{item.name}</h5>
                                 </Col>
                                 <Col md={2}><p>${item.price}</p></Col>
                                </Row>
                                <Row>
                                  <Col md={2}></Col>
                                 {item.large ? <Col md={3}>Large</Col> : ''}
                                 {item.sauce ? <Col md={3}> {item.sauce}</Col> : ''}
                                 {item.burger ? <Col md={3}>Burger: {item.burger}</Col> : ''}
                                 {item.extraPatty ? <Col md={3}>{item.extraPatty}</Col> : ''}
                                 {item.pattySwap ? <Col md={3}>{item.pattySwap}</Col> : ''}
                                 {item.extras ? <Col md={3}>{item.extras.map(extra => <>{extra}</>)}</Col> : ''}
                                 {item.sideSwap ? <Col md={3}>Side: {item.sideSwap}</Col> : ''}
                                 {item.upgradeSide ? <Col md={3}>Side: {item.upgradeSide}</Col> : ''}
                                 {item.fryAddOn ? <Col md={3}>Side Add: {item.fryAddOn}</Col> : ''}
                                </Row>
                                <Row>
                                    {item.instructions ? <Col style={{marginTop: '1rem'}} md={8}>Instructions: {item.instructions}</Col> : '' }
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item variant='light'>
                            <div className="myOrderTotal">
                            <h2>Subtotal</h2>
                            <p>${order.subtotal}</p>
                            </div>
                            <div className="myOrderTotal">
                            <h2>Tax</h2>
                            <p>${order.tax}</p>
                            </div>
                            <div className="myOrderTotal">
                            <h2>Total</h2>
                            <p>${order.totalprice}</p>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    </div>
                ) : ''}
        </>
    )
}

export default ProfileScreen
