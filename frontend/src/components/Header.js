import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, NavDropdown, Image, Badge } from 'react-bootstrap'
import { logout } from '../actions/userActions'


const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
  
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const [date, setDate] = useState(new Date())
    const [loggedIn, setLoggedIn] = useState(false)

    
    useEffect(() => {
        if (userInfo) {
            setLoggedIn(true)
        } 
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
        }
    }, [userInfo, loggedIn])
    function tick() {setDate(new Date())}
    
    const logoutHandler = () => {
        dispatch(logout())
        setLoggedIn(false)
    }

    return (
        <header>
           <Navbar bg="dark" variant="dark" expand="lg" style={{padding: '0.4rem 0'}} collapseOnSelect>
                   <h6 id='time'>{date.toLocaleTimeString()}</h6>
                   <h6 id='time'>Order Now! We Are Open.</h6>

               <Container>
                   <LinkContainer to='/' className='ml-auto'>
                       <Image alt='109-Logo' src='/images/109_Logo.png' variant='top' width='5%' height='5%' />
                   </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        {loggedIn ? (
                            <NavDropdown title={userInfo.name ? userInfo.name : ''} id='username'>
                                <LinkContainer to='/profile'>
                                    <NavDropdown.Item>Profile</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/'>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        ) :  (
                            <>
                            <LinkContainer to='/login' id='username'>
                            <Nav.Link>
                            <i className="fas fa-sign-in-alt"></i> Log In
                            </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register' id='username'>
                            <Nav.Link><i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
                            </LinkContainer>
                           </>)}
                    {loggedIn && userInfo.isAdmin && (
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
               <LinkContainer to='/cart' style={{display: 'flex', marginRight: '1.5rem', border: 'none'}}>
                    <Nav.Link style={{height: '100%'}}><i className="fas fa-shopping-cart"></i>{' '}{cartItems.length > 0 ? <Badge style={{height: '1.2rem', marginLeft: '.2rem', backgroundColor: 'none', color: 'yellow'}}>{cartItems.length}</Badge> : <Badge pill variant='warning' style={{fontSize: '.7rem', height: '50%', color: 'yellow'}}>0</Badge>}</Nav.Link>
                </LinkContainer>
            </Navbar>
            <Navbar collapseOnSelect id='navBar2' expand='lg' bg='light' variant="light">
                <Nav id='navContainer2'>
                <Nav.Item id='navItem'><a href='/'>HOME</a></Nav.Item>
                <Nav.Item id='navItem'><a href='/menu'>MENU</a></Nav.Item>
                <Nav.Item id='navItem'><a href='#'>ABOUT</a></Nav.Item>
                <Nav.Item id='navItem'><a href='#'>DELIVERY</a></Nav.Item>
                </Nav>
            </Navbar>
        </header>
    )
}

export default Header
