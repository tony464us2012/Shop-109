import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap'
import { getUserDetails, logout } from '../actions/userActions'
import { render } from 'react-dom'
import { getSetup, myOrders } from '../actions/orderActions'
import { listProducts } from '../actions/productActions'
import { getMainBeers } from '../actions/beerActions'

const Header = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { userInfo } = useSelector(state => state.userLogin)
   
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const logoutHandler = () => {
        dispatch(logout())
        navigate('/')
        render()
    }
    
    useEffect(() => {

        dispatch(getSetup())
        dispatch(listProducts())
        dispatch(getMainBeers())

    setTimeout(() => {
            if (userInfo) {
                dispatch(getUserDetails(userInfo._id))
                dispatch(myOrders(userInfo._id))
                }
        }, 1000)
    }, [userInfo])
    
    const noborder = {border: 'none'}

    return (
        <>
         <Navbar>
            <Container>
                <Navbar.Brand href="#home" bg="light" style={noborder}><Image id='Logo' className="align-top" alt='109-Logo' src='/images/109_Logo.png' roundedCircle variant='top'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="me-auto justify-content-end">
                <Nav.Item id='navItem' className='borderbottom'><a href="/">Home</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href= "/menu">Menu</a ></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href="/beers">Beers</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href="/about">About</a></Nav.Item>
                <Nav.Item id='navItem' ><a href="https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true" rel="noopener noreferrer" target="_blank">Delivery</a></Nav.Item>
                {userInfo ? (
                                <NavDropdown title={userInfo.firstName ? `Hi ${userInfo.firstName.split(' ')[0]}` : ''} id='username'>
                                        <NavDropdown.Item id='navItem'><a href="/profile">Profile</a></NavDropdown.Item>
                                        <NavDropdown.Item onClick={logoutHandler}><a href="/">Log Out</a></NavDropdown.Item>
                                    </NavDropdown>
                        ) : (
                            <>
                                <Nav.Item id='navItem' className='borderbottom'>
                                    <i className="fas fa-sign-in-alt"></i>&nbsp;
                                    <a href="/login">Login</a>
                                </Nav.Item>
                                <Nav.Item id='navItem' className='borderbottom'>
                                    <i className="fas fa-user-plus"></i>&nbsp;
                                    <a href="/register">Sign Up</a>
                                </Nav.Item>
                            </>
                           )}
                {userInfo && userInfo.isAdmin && (
                               <NavDropdown title='Admin' id='adminmenu'>
                                   <NavDropdown.Item><a href="/admin/userlist">Accounts</a></NavDropdown.Item>
                                   <NavDropdown.Item><a href="/admin/productlist">Products</a></NavDropdown.Item>
                                   <NavDropdown.Item><a href="/admin/beerlist">Beers</a></NavDropdown.Item>
                                   <NavDropdown.Item><a href="/admin/orderlist">Orders</a></NavDropdown.Item>
                            </NavDropdown>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
           
            <Navbar bg="light" variant="light" expand="lg" style={{display: 'flex', borderTop: '1px solid lightgrey', borderBottom: 'none', padding: '0 2rem 0 45%'}} collapseOnSelect>
            <div id='navContainer2'>
            <Nav.Link eventKey="disabled" style={{textAlign:'center'}} className='address' disabled>
                            <span className="material-icons pindrop">pin_drop</span>   
                           646 SW 109 Avenue  Miami, FL
                            </Nav.Link>
                {cartItems.length === 0 ? 
                 <a href="/cart" className="material-icons cart" style={{marginRight: '2rem'}}>shopping_cart_checkout</a> : 
                <>
                     <a href="/cart" className="material-icons cart" style={{ color: 'green'}}>shopping_cart_checkout</a>
                     {/* <a href="/cart" className="material-symbols-outlined cart">shopping_cart_checkout</a> */}
                    <a className="price" href="/cart">&#36;{Number(cartItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2) }</a>
                </>}
                </div>
            </Navbar>
        </>
    )
}

export default Header
