import React from 'react'
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar bg='light' variant='light' expand='lg' className='footer' >
                {/* <Nav className="social-container"> */}
                    <Nav.Item className="text-center">
                        <Nav.Link href='/' style={{borderRight: 'none'}}>Copyright &copy; Shop 109</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="text-center">
                        <Nav.Link href="/accessibility">Accessibility</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="text-center">
                        <Nav.Link href="/terms">Term and Conditions</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="text-center" style={{display: 'flex'}}>
                        <Nav.Link href="https://twitter.com/109burgerjoint?lang=en" target='_blank' rel='noreferrer'><i className="fab fa-twitter socials"></i></Nav.Link>
                        <Nav.Link href="https://www.facebook.com/109burgerjoint/"><i className="fab fa-facebook-f socials"></i></Nav.Link>
                        <Nav.Link href="https://www.facebook.com/109burgerjoint/"><i className="fab fa-instagram socials"></i></Nav.Link>
                    </Nav.Item>
                {/* </Nav> */}
        </Navbar>
    )
}

export default Footer
