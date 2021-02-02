import React from 'react'
import { Nav } from 'react-bootstrap'

const BeerHeader = ({beerTabHandler, beerTab}) => {

  const selectHandler = (selected) =>  {
    if (beerTab === selected) {
      return { backgroundColor: 'black', color: '#fff'}
    }
  }
    return (
        <Nav as="ul" className='menu-container'>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('IPA')} onClick={() => beerTabHandler('IPA')}>IPA</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Lager')}  onClick={() => beerTabHandler('Lager')}>Lager</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Sour')}  onClick={() => beerTabHandler('Sour')}>Sour</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('PorterandStout')}  onClick={() => beerTabHandler('PorterandStout')}>Porter and Stout</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Ale')}  onClick={() => beerTabHandler('Ale')}>Ale</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Cider')}  onClick={() => beerTabHandler('Cider')}>Ciders</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link className='menu-link' style={selectHandler('Special')}  onClick={() => beerTabHandler('Special')}>Specials</Nav.Link>
          </Nav.Item>
        </Nav>
    )
}

export default BeerHeader
