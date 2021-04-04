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

    const logoutHandler = () => {
        dispatch(logout())
        setLoggedIn(false)
    }
    
    useEffect(() => {
        if (userInfo) {
            setLoggedIn(true)
        } 
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
        }
    }, [userInfo, loggedIn, logoutHandler])
    
    function tick() {setDate(new Date())}
    

    const pillStyle = {
    fontSize: '.7rem', height: '50%', marginLeft: '-14px'
    }

    return (
        <header>
           <Navbar bg="dark" variant="dark" expand="lg" style={{padding: '0.4rem 0 .1rem'}} collapseOnSelect>
                   {/* <h6 id='time'>{date.toLocaleTimeString()}</h6>
                   <h6 id='time'>Order Now! We Are Open.</h6> */}

               <Container>
                       <Image id='Logo' alt='109-Logo' src='/images/109_Logo.png' roundedCircle variant='top'/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        {loggedIn && userInfo.name ? (
                            <NavDropdown title={userInfo.name ? `Hi ${userInfo.name.split(' ')[0]}` : ''} id='username'>
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
                               <LinkContainer to='/admin/beerlist'>
                                   <NavDropdown.Item>Beers</NavDropdown.Item>
                               </LinkContainer>
                               <LinkContainer to='/admin/orderlist'>
                                   <NavDropdown.Item>Orders</NavDropdown.Item>
                               </LinkContainer>
                           </NavDropdown>
                    )}
                        </Nav>
                    </Navbar.Collapse>
               <LinkContainer to='/cart' style={{display: 'flex', marginRight: '1.5rem', border: 'none'}}>
                    <Nav.Link style={{height: '100%'}}><i className="fas fa-shopping-cart"></i>{' '}{cartItems.length > 0 ? <Badge pill variant='danger' style={pillStyle}>{cartItems.length}</Badge> : ''}</Nav.Link>
                </LinkContainer>
               </Container>
            </Navbar>
            <Navbar collapseOnSelect id='navBar2' expand='lg' bg='light' variant="light">
                <Nav id='navContainer2'>
                <Nav.Item id='navItem'><a href='/'>HOME</a></Nav.Item>
                <Nav.Item id='navItem'><a href='/menu'>MENU</a></Nav.Item>
                <Nav.Item id='navItem'><a href='/beers'>BEERS</a></Nav.Item>
                <Nav.Item id='navItem'><a href='/about'>ABOUT</a></Nav.Item>
                <Nav.Item id='navItem'><a href='https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true'>DELIVERY</a></Nav.Item>
                </Nav>
            </Navbar>
        </header>
    )
}

export default Header
