import React, { useState, useEffect, Fragment } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Image, Col, Form, Row } from 'react-bootstrap'
import { PRODUCT_DETAILS_RESET } from '../actions/types'
import Loader from './Loader'



const ProductModal = ({show, onHide, productId}) => {
   
    const productDetail = useSelector(state => state.productDetails)
    const { loading, error, product:productInfo } = productDetail
    
      const productList = useSelector(state => state.productList)
      const { products } = productList

    const { name, image, description, price, category, available } = productInfo

    
    const dispatch = useDispatch()
    
    useEffect(() => {
      dispatch(listProductDetails(productId))
      return () => {
        dispatch({type: PRODUCT_DETAILS_RESET})
        
      }
    }, [show])
    
    const [itemPrice, setItemPrice] = useState(0)
    const [addOns, setAddOns] = useState({})
    const [instructions, setInstructions] = useState('')
    const [radio, setRadio] = useState(false)

    const addons = products.filter(product => product.category === 'AddOns')
    const largefrysampler = addons.filter(sampler =>  sampler.addOnType === 'LargeFrySampler')
    const [{ price:samplerPrice, available:samplerAvailable }] = largefrysampler
    const largechickenwings = addons.filter(wings => wings.addOnType === 'LargeChickenWings')
    const [{name:wingName, price:wingPrice, available:wingAvailable}] = largechickenwings

    const handleChange = (e) => {setInstructions(e.target.value)}
    const radioChange = (e) => {setItemPrice(price + Number(e.target.value)); setAddOns({ Large: +e.target.value})}

    const item = {
      name,
      image,
      itemPrice,
      addOns, 
      instructions
    }
    
    const addToCartHandler = (e) => {
      e.preventDefault()
      console.log(item)
      
    }
    
    const white = {backgroundColor: 'white', color: 'grey', paddingBottom: '1rem'}

    return (
        <>
            { loading ? <Loader /> :
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={onHide}
                >
                  <Modal.Header closeButton style={white}>
                    <Modal.Title id="contained-modal-title-vcenter">
                      <Col>{name}</Col>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={white}>
                      {description ?<Col> <p> {description} </p></Col> : ''}
                      {image ? <Col ><Image src={image} alt={name}/></Col> : ''}
                      <Form onSubmit={addToCartHandler}>
                        {name === 'Fry Sampler Small' ? 
                         <Fragment>
                          <p>Select Size:</p>
                            <input type="radio" id="frysampler" name="frysampler" value={0} onChange={radioChange} required />
                            <label htmlFor="smallfrysampler"> Small </label><br/>
                            {samplerAvailable ? <><input type="radio" id="frysampler" name="frysampler" value={samplerPrice} onChange={radioChange} required/>
                            <label htmlFor="largefrysampler">{`Large +${samplerPrice}`}</label></> : ''}
                         </Fragment>
                        : ''
                      }
                        {name === 'Chicken Wings 8 Piece' ? 
                         <Fragment>
                          <p>Select Size:</p>
                            <input type="radio" name="chickenwings" value={0} onChange={radioChange} required />
                            <label htmlFor="chickenwings">{' '} 8 Pieces </label><br/>
                            {wingAvailable ? <><input type="radio" name='chickenwings' value={wingPrice} onChange={radioChange} required/>
                            <label htmlFor='chickenwings'>{`15 Pieces +${wingPrice}`}</label></> : ''}
                         </Fragment>
                        : ''
                      }
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>List Any Preferences</Form.Label>
                        <Form.Text as="textarea" placeholder='allergies, etc.' width='100%' value={instructions} onChange={handleChange} rows={3} />
                      </Form.Group>
                    {available ? 
                    <input type='submit' value={`Add To Cart-$${!itemPrice ? price : itemPrice}`}/> :
                    <input type='submit' value='Out of Stock' disabled /> 
                  }
                      </Form>
                  </Modal.Body>
                </Modal>
            }
        </>
            );
}

export default ProductModal
