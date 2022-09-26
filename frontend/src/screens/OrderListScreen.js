import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, ButtonGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, getOrders } from '../actions/orderActions'
import dateFormat from 'dateformat'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orders)
    const { loading, error, orders } = orderList
  
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(getOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    const orderDetails = (id) => {
        dispatch(getOrderDetails(id))
    }

    return (
        <div className='padding'>
            <h1 style={{textAlign:'center'}}>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ORDER #</th>
                            <th>CUSTOMER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td><button>{order._id}</button></td>
                                <td><button>{order.user && order.user.name}</button></td>
                                <td><button>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</button></td>
                                <td><button>${order.totalprice}</button></td>
                                <td style={{textAlign:'center'}}><button>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<i className='fas fa-check' style={{color: 'green'}}></i>)}</button></td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}/`}>
                                        <Button variant='light' className='btn-sm' style={{display:'flex', margin: '0 auto'}} onClick={() => orderDetails(order._id)}>
                                           Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
             <div className='operations-cont'>
                <Card style={{ width: '35%' }}>
                <Card.Title>Operations</Card.Title>
                <Card.Body>
                    <Card.Text>Cart?</Card.Text>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="success">ON</Button>
                    <Button variant="danger">OFF</Button>
                </ButtonGroup>
                <Card.Text>Wait Time</Card.Text>
                </Card.Body>
                </Card>
           </div>
        </div>
    )
}

export default OrderListScreen