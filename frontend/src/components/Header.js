import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Image, Container } from 'react-bootstrap'
import { getUserDetails, logout } from '../actions/userActions'
import { getSetup, myOrders } from '../actions/orderActions'
import { listProducts } from '../actions/productActions'
import { getMainBeers } from '../actions/beerActions'

const Header = () => {

    const dispatch = useDispatch()

    const { userInfo, guest } = useSelector(state => state.userLogin)
   
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const logoutHandler = () => {
        dispatch(logout())
    }
    
    useEffect(() => {

        dispatch(getSetup())
        dispatch(listProducts())
        dispatch(getMainBeers())

    setTimeout(() => {
            if (!guest && userInfo) {
                dispatch(getUserDetails(userInfo._id))
                dispatch(myOrders(userInfo._id))
                }
        }, 1000)
    }, [userInfo, dispatch, guest])
    
    const noborder = {border: 'none'}

    return (
        <>
         <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand href="#home" bg="light" style={noborder}><Image id='Logo' className="align-top" alt='109-Logo' src='/images/109_Logo.png' roundedCircle variant='top'/></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="me-auto justify-content-end">
                <Nav.Item id='navItem' className='borderbottom'><a href='/'>Home</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href='/menu'>Menu</a ></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href='/beers'>Beers</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href='/about'>About</a></Nav.Item>
                <Nav.Item id='navItem' ><a href="https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true" rel="noopener noreferrer" target="_blank">Delivery</a></Nav.Item>
                { !guest && userInfo ? (
                                <NavDropdown id='navItem' title={userInfo.firstName ? `Hi ${userInfo.firstName.split(' ')[0]}` : ''}  >
                                        <a href='/profile'>Profile</a>
                                        <a href='/' onClick={() => logoutHandler()}>Log Out</a>
                                    </NavDropdown>
                        ) : (
                            <>
                                    <a id='navItem' href='/login'> <i className="fas fa-sign-in-alt"></i>&nbsp; Login</a>
                                    <a id='navItem' href='/register'><i className="fas fa-user-plus"></i>&nbsp;Sign Up</a>
                            </>
                           )}
                {!guest && userInfo && userInfo.isAdmin && (
                               <NavDropdown id='navItem' title='Admin'>
                                   <a href='/admin/userlist'>Accounts</a>
                                   <a href='/admin/productlist'>Products</a>
                                   <a href='/admin/beerlist'>Beers</a>
                                  <a href='/admin/orderlist'>Orders</a>
                            </NavDropdown>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect id='navContainer'>
            <Container>
                <Nav.Link eventKey="disabled" style={{textAlign:'center'}} className='address' disabled>
                                <span className="material-icons pindrop">pin_drop</span>   
                            646 SW 109 Avenue  Miami, FL
                                </Nav.Link>
                    {cartItems.length === 0 ? 
                    <a href="/cart" className="cart" style={{marginRight: '2rem'}}><span className="material-symbols-outlined">shopping_cart</span></a> : 
                    <>
                        <a href="/cart" className="cart"><span className="material-symbols-outlined cart">shopping_cart</span></a>
                        <a className="price" href="/cart">&#36;{Number(cartItems.reduce((acc, item) => acc + item.price, 0)).toFixed(2) }</a>
                    </>}
            </Container>
        </Navbar>
        </>
    )
}

export default Header
