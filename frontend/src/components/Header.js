import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button, Img, Badge } from 'react-bootstrap'
import { logout } from '../actions/userActions'


const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
  
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const [date, setDate] = useState(new Date())

    useEffect(() => {
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
          }
       })
         function tick() {setDate(new Date())}

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header>
           <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               <Container>
                   <h6>{date.toLocaleTimeString()}</h6>
                   <LinkContainer to='/' className='mr-auto ml-4'>
                       <img src='/images/109_Logo.png' variant='top' width='6%' height='6%' />
                   </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        {userInfo ? (
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) :  (
                            <>
                            <LinkContainer to='/login' >
                            <Nav.Link><i className="fas fa-sign-in-alt"></i> Log In</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register' >
                            <Nav.Link><i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
                            </LinkContainer>
                           </>)}
                    {userInfo && userInfo.isAdmin && (
                               <NavDropdown title='Admin' id='adminmenu'>
                               <LinkContainer to='/admin/userlist'>
                                   <NavDropdown.Item>Users</NavDropdown.Item>
                               </LinkContainer>
                               <LinkContainer to='/admin/productlist'>
                                   <NavDropdown.Item>Products</NavDropdown.Item>
                               </LinkContainer>
                               <LinkContainer to='/admin/orderlist'>
                                   <NavDropdown.Item>Orders</NavDropdown.Item>
                               </LinkContainer>
                           </NavDropdown>
                    )}
                        </Nav>
                    </Navbar.Collapse>
               </Container>
            </Navbar>
            <Navbar bg="light" variant="light">
                <Nav className="mr-auto ml-5">
                <Nav.Link id='navItem' href='/'>HOME</Nav.Link>
                <Nav.Link id='navItem' href='/menu'>MENU</Nav.Link>
                <Nav.Link id='navItem' href='#'>109 REWARDS</Nav.Link>
                <Nav.Link id='navItem' href='#'>DELIVERY</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder='Enter a promo code' className="mr-sm-2" />
                <Button variant="success" size='sm'>Apply</Button>
                </Form>
                <LinkContainer to='/cart' className='ml-2' style={{color: '#000'}}>
                    <Nav.Link><i className="fas fa-shopping-cart"></i>{' '}{cartItems.length > 0 ? <Badge pill variant='success'>{cartItems.length}</Badge> : ''}</Nav.Link>
                </LinkContainer>
            </Navbar>
        </header>
    )
}

export default Header
