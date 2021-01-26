import React from 'react'
import { Nav } from 'react-bootstrap'

const BeerHeader = ({tabHandler, tab}) => {

  const selectHandler = (selected) =>  {
    if (tab === selected) {
      return { backgroundColor: 'grey', color: '#fff'}
    }
  }
    return (
        <Nav as="ul" className='menu-container'>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Appetizer')} onClick={() => tabHandler('Appetizer')}>IPA</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Burger')}  onClick={() => tabHandler('Burger')}>Lager</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Salad')}  onClick={() => tabHandler('Salad')}>Sour</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('ForkandKnife')}  onClick={() => tabHandler('ForkandKnife')}>Porter and Stout</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Sandwich')}  onClick={() => tabHandler('Sandwich')}>Ale</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Slider')}  onClick={() => tabHandler('Slider')}>Ciders</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Side')}  onClick={() => tabHandler('Side')}>Specials</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}

export default BeerHeader
