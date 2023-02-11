import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, getOrders, updateSetup } from '../actions/orderActions'
import dateFormat from 'dateformat'
import Pagination from '../components/Pagination'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = () => {

    const [time, setTime] = useState(0)
    const [store, setStore] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [ordersPerPage] = useState(10)
    
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orders)
    const { loading, error, orders } = orderList
  
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const setupstate = useSelector(state => state.setup)
    const { success, setup } = setupstate

    useEffect(() => {
        if(userInfo.isAdmin){
            dispatch(getOrders())
        }
            if (success) {
                setTime(setup.minutes)
                setStore(setup.cart)
            }
    }, [setup, dispatch, success, userInfo.isAdmin])

    const orderDetails = (id) => {
        dispatch(getOrderDetails(id))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateSetup({
            minutes: time,
             cart: store
        }))}

        const indexOfLastOrder = currentPage * ordersPerPage;
        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

        const paginate = pageNumber => setCurrentPage(pageNumber);

      

    return (
        <div className='padding'>
            {loading  ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : success ? 
            (
            <>
                <div className='operations-cont'>
                <Form onSubmit={submitHandler}>
                <Form.Group controlId='price'>
                    <Form.Label>Wait Time</Form.Label>
                    <Form.Control type='text' value={time}  onChange={(e) => setTime(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Cart</Form.Label>
                    <Form.Control as='select' value={store} onChange={(e) => setStore(e.target.value)}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
           </div>
                <h1 className='text-center fs-4'>Orders</h1>
                
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>CUSTOMER</th>
                            <th>PHONE</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.slice(indexOfFirstOrder, indexOfLastOrder).map(order => (
                            <tr key={order._id}>
                                <td><button>{`${order.firstName} ${order.lastName}`}</button></td>
                                <td><button>{order.phone}</button></td>
                                <td><button>{dateFormat(order.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</button></td>
                                <td><button>${order.totalprice}</button></td>
                                <td style={{textAlign:'center'}}><button>{order.refunded ? 'Refund Issued' : (<i className='fas fa-check' style={{color: 'green'}}></i>)}</button></td>
                                <td style={{display: 'flex'}}>
                                    <LinkContainer to={`/order/${order._id}/`} style={{margin: '0 auto'}}>
                                        <Button variant='light' className='btn-sm' onClick={() => orderDetails(order._id)}>
                                           Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination
                    ordersPerPage={ordersPerPage}
                    totalPosts={orders.length}
                    paginate={paginate}
                />
            </>
            ) : ''}
        </div>
    )
}

export default OrderListScreen