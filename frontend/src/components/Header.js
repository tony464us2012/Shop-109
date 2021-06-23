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

    const [day, setDay] = useState(new Date().getDay())
    const [hour, setHour] = useState(new Date().getHours())
    const [date, setDate] = useState(new Date())
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
    
    function tick() {setDate(new Date()); setDay(new Date().getDay()); setHour(new Date().getHours())}

    const pillStyle = {
    fontSize: '.7rem', height: '50%', marginLeft: '-14px'
    }

    return (
        <header>
           <Navbar bg="dark"  variant="dark" expand="lg" style={{padding: '0.4rem 1rem .1rem'}} collapseOnSelect>
                <Navbar.Brand href="#home"> <Image id='Logo' className="d-inline-block align-top" alt='109-Logo' src='/images/109_Logo.png' roundedCircle variant='top'/></Navbar.Brand>
                   {/* <div id='time'>{open ? <h2><Badge variant='success' >Open</Badge></h2> : <h2><Badge variant='danger' >Closed</Badge></h2>}</div>
                   <div id='time2'><p>{day === 0 ? 'Sunday' : day === 1 ? 'Monday' : day === 2 ? 'Tuesday' : day === 3 ? 'Wednesday' : day === 4 ? 'Thursday' : day === 5 ? 'Friday' : 'Saturday'}</p><br/>
                   <p>{day === 0 ? '12:00pm - 8pm' : day === 1 ? '12:00pm - 10pm' : day === 2 ? '12:00pm - 10pm' : day === 3 ? '12:00pm - 10pm' : day === 4 ? '12:00pm - 10pm' : day === 5 ? '12:00pm - 12am' : '12:00pm - 12pm'}</p><br/> */}
                   {/* <div>{date.toLocaleTimeString()} </div> */}
                   {/* </div> */}
                   <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                   <Navbar.Collapse id="responsive-navbar-nav" className="nav-collapse">
                        <Nav className="ml-auto first-nav">
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
                        <LinkContainer to='/cart' style={{display: 'flex', marginRight: '5%', border: 'none'}}>
                                <Nav.Link><i className="fas fa-shopping-cart"></i>{' '}{cartItems.length > 0 ? <Badge pill variant='danger' style={pillStyle}>{cartItems.length}</Badge> : ''}</Nav.Link>
                            </LinkContainer>
                        </Nav>
                   </Navbar.Collapse>
            </Navbar>
            <Navbar bg="light" variant="light" expand="lg" style={{padding: '0.4rem 0 .1rem', marginBottom: '1rem'}} collapseOnSelect>
            <Navbar.Toggle aria-controls="responsive-navbar-nav2" />
            <Navbar.Collapse id="responsive-navbar-nav2" className="nav-collapse2">
            <Nav className='m-auto'>
                <Nav.Item id='navItem'><a href="/">HOME</a></Nav.Item>
                <Nav.Item id='navItem'><a href= "/menu">MENU</a ></Nav.Item>
                <Nav.Item id='navItem'><a href="/beers">BEERS</a></Nav.Item>
                <Nav.Item id='navItem'><a href="/about">ABOUT</a></Nav.Item>
                <Nav.Item id='navItem'><a href="https://order.online/store/109BurgerJoint-73844/en-US/?hideModal=true&pickup=true" rel="noreferrer" target="_blank">DELIVERY</a></Nav.Item>
                </Nav>
            </Navbar.Collapse>
                {/* <Nav id='navContainer3'>
                  <Nav.Item id='navItem'><a href="https://twitter.com/109burgerjoint?lang=en" target='_blank' rel='noreferrer'><i className="fab fa-twitter"></i></a></Nav.Item>
                  <Nav.Item id='navItem'><a href="https://www.facebook.com/109burgerjoint/"><i className="fab fa-facebook-f"></i></a></Nav.Item>
                  <Nav.Item id='navItem'><a href="https://www.facebook.com/109burgerjoint/"><i className="fab fa-instagram"></i></a></Nav.Item>
                </Nav> */}
            </Navbar>
        </header>
    )
}

export default Header
