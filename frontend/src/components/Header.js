import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Image } from 'react-bootstrap'
import { logout } from '../actions/userActions'


const Header = () => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
  
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const [day, setDay] = useState(new Date().getDay())
    const [hour, setHour] = useState(new Date().getHours())
    const [loggedIn, setLoggedIn] = useState(false)
    const [open, setOpen] = useState(null)

    const logoutHandler = () => {
        dispatch(logout())
        setLoggedIn(false)
    }
    
    useEffect(() => {
        if (userInfo) {
            setLoggedIn(true)
        } 
        
        if (day >= 1 && day <= 4) {
            if (hour >= 12 && hour < 22 ) {
                setOpen(true)
            } else { setOpen(false) }
        } else if (day === 5 || day === 6) {
            if (hour >= 12 ) {
                setOpen(true)
            } else {setOpen(false)}
         } else {
             if (hour >= 12 && hour < 20) {
                 setOpen(true)
             }
         }
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
        }
    }, [userInfo, loggedIn, open, logoutHandler, day, hour])
    
    function tick() { setDay(new Date().getDay()); setHour(new Date().getHours())}

    const noborder = {border: 'none'}

    return (
        <div>
           <Navbar id='navContainer' bg="light"  variant="light" expand="lg" style={{padding: '0 2%', display: 'flex', border: 'none', }}>
                <Navbar.Brand href="#home" style={noborder}> <Image id='Logo' className="align-top" alt='109-Logo' src='/images/109_Logo.png' roundedCircle variant='top'/></Navbar.Brand>
                   <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                   <Navbar.Collapse  className='me-auto justify-content-end'>
                        <Nav.Item>
                          
                            <Nav.Link eventKey="disabled" style={noborder} className='address' disabled>
                            <span className="material-symbols-outlined pindrop">pin_drop</span>   
                            CARRYOUT FROM 646 SW 109 Avenue
                            </Nav.Link>
                        </Nav.Item>
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
                            <LinkContainer to='/login' id='username' className='login'>
                            <Nav.Link>
                            <i className="fas fa-sign-in-alt"></i> Log In
                            </Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/register' id='username' className='register'>
                            <Nav.Link><i className="fas fa-user-plus"></i> Sign Up</Nav.Link>
                            </LinkContainer>
                            </>
                           )}
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
                   </Navbar.Collapse>
            </Navbar>
            <Navbar bg="light" variant="light" expand="lg" style={{display: 'flex', borderTop: '1px solid lightgrey', borderBottom: 'none'}} collapseOnSelect>
            {/* <Navbar.Toggle aria-controls="responsive-navbar-nav2" /> */}
            {/* <Navbar.Collapse id="responsive-navbar-nav2" className="nav-collapse2"> */}
            <div id='navContainer2'>
                <Nav.Item id='navItem' className='borderbottom'><a href="/">HOME</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href= "/menu">MENU</a ></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href="/beers">BEERS</a></Nav.Item>
                <Nav.Item id='navItem' className='borderbottom'><a href="/about">ABOUT</a></Nav.Item>
                <Nav.Item id='navItem' ><a href="https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true" rel="noreferrer" target="_blank">DELIVERY</a></Nav.Item>
                {cartItems.length == 0 ? 
                 <a href="/cart" className="material-symbols-outlined cart" style={{marginRight: '2rem'}}>shopping_cart_checkout</a> : 
                <>
                     <a href="/cart" className="material-symbols-outlined cart">shopping_cart_checkout</a>
                    <a className="price" href="/cart">&#36;{Number(cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)) }</a>
                </>}


                </div>
            {/* </Navbar.Collapse> */}
            </Navbar>
        </div>
    )
}

export default Header
