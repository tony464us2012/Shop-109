import React from 'react'
import { Nav } from 'react-bootstrap'

const MenuHeader = () => {
    return (
        <Nav defaultActiveKey="/home" as="ul">
  <Nav.Item as="li">
    <Nav.Link className='menu-link
    
    .' href="#">Appetizers</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link className='menu-link'>Burgers</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link className='menu-link'>Salads</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link className='menu-link'>Fork and Knife</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link className='menu-link'>Sandwiches</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link className='menu-link'>Sliders</Nav.Link>
  </Nav.Item>
  <Nav.Item as="li">
    <Nav.Link className='menu-link'>Sides</Nav.Link>
  </Nav.Item>
</Nav>
    )
}

export default MenuHeader
