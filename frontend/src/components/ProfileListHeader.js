import React from 'react'
import { Nav } from 'react-bootstrap'

const ProfileListHeader = ({tabHandler, tab}) => {

  const selectHandler = (selected) =>  {
    if (tab === selected) {
      return { backgroundColor: 'black', color: '#fff'}
    }
  }
    return (
        <Nav as="ul" className='menu-container'>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('MenuItems')} onClick={() => tabHandler('MenuItems')}>Menu Items</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Beers')}  onClick={() => tabHandler('Beers')}>Beers</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('AddOns')}  onClick={() => tabHandler('AddOns')}>Add Ons</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}

export default ProfileListHeader