import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
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
           <Navbar id='navContainer' bg="light"  variant="light" expand="lg" style={{padding: '0 2rem', display: 'flex', border: 'none', }}>
                <Navbar.Brand href="#home" style={noborder}> <Image id='Logo' className="align-top" alt='109-Logo' src='/images/109_Logo.png' roundedCircle variant='top'/></Navbar.Brand>
                   <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                   <Navbar.Collapse  className='me-auto justify-content-end'>
                            <Nav.Link eventKey="disabled" style={noborder} className='address mb-2' disabled>
                            <span className="material-icons pindrop">pin_drop</span>   
                           646 SW 109 Avenue  Miami, FL
                            </Nav.Link>
                        {userInfo ? (
                                <NavDropdown title={userInfo.firstName ? `Hi ${userInfo.firstName.split(' ')[0]}` : ''} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/'>
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    </LinkContainer> 
                                    </NavDropdown>
                        ) : (
                            <>
                                <LinkContainer to='/login' id='username' className='login mb-2'>
                                    <Nav.Link>
                                        <i className="fas fa-sign-in-alt"></i> Log In
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer to='/register' id='username' className='register mb-2'>
                                    <Nav.Link><i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
                                </LinkContainer>
                            </>
                           )}
                    {userInfo && userInfo.isAdmin && (
                               <NavDropdown title='Admin' id='adminmenu'>
                               <LinkContainer to='/admin/userlist'>
                                   <NavDropdown.Item>Accounts</NavDropdown.Item>
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
                   </Navbar.Collapse>
            </Navbar>
            <Navbar bg="light" variant="light" expand="lg" style={{display: 'flex', borderTop: '1px solid lightgrey', borderBottom: 'none', padding: '0 2rem'}} collapseOnSelect>
            <div id='navContainer2'>
                <Nav.Item id='navItem' className='borderbottom'><a href="/">HOME</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href= "/menu">MENU</a ></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href="/beers">BEERS</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href="/about">ABOUT</a></Nav.Item>
                <Nav.Item id='navItem' ><a href="https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true" rel="noopener noreferrer" target="_blank">DELIVERY</a></Nav.Item>
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
