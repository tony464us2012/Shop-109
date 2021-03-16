import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
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
        <>
            <h1>Orders</h1>
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
                                <td>{order._id}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</td>
                                <td>${order.totalprice}</td>
                                <td>{order.isDelivered ? (order.deliveredAt.substring(0, 10)) : (<i className='fas fa-check' style={{color: 'green'}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}/`}>
                                        <Button variant='light' className='btn-sm' onClick={() => orderDetails(order._id)}>
                                           Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default OrderListScreen