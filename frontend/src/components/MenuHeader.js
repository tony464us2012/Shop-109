import React from 'react'
import { Nav } from 'react-bootstrap'

const MenuHeader = ({tabHandler}) => {
    return (
        <Nav as="ul">
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('Appetizer')}>Appetizers</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('Burger')}>Burgers</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('Salad')}>Salads</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('ForkandKnife')}>Fork and Knife</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('Sandwich')}>Sandwiches</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('Slider')}>Sliders</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' onClick={() => tabHandler('Side')}>Sides</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}

export default MenuHeader
