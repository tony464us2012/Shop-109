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
    console.log(addons)
    const largefrysampler = addons.filter(sampler =>  sampler.addOnType === 'LargeFrySampler')
    const [{ price:samplerPrice, available:samplerAvailable }] = largefrysampler
    const largechickenwings = addons.filter(wings => wings.addOnType === 'LargeChickenWings')
    const [{price:wingPrice, available:wingAvailable}] = largechickenwings
    const addMeat = addons.filter(meat => meat.name === 'Extra Meat Patty')
    const [{name:meatName, price:meatPrice, available:meatAvailable}] = addMeat
    const swapOptions = addons.filter(swap => swap.addOnType === 'SwapOption')
    const extras = addons.filter(extra => extra.addOnType === 'Extras')
    const swapSides = addons.filter (swapSide => swapSide.addOnType === 'SwapSideOption')
    const upgrades = addons.filter(upgrade => upgrade.addOnType === 'UpgradeOption')

      const handleChange = (e) => {setInstructions(e.target.value)}
      const radioChange = (e) => {setItemPrice(price + Number(e.target.value)); setAddOns({ Large: +e.target.value})}
      const sauceChange = (e) => {setAddOns( state => ({...state, Sauce: e.target.value}))}
      const meatChange = (e) =>  {setItemPrice(price + Number(e.target.value)); setAddOns({ Extra_Patty: +e.target.value})}
      const swapChange = (e) => {setItemPrice(price + Number(e.target.value)); setAddOns({...addOns,  [e.target.name]: e.target.value})}
      const extraChange = (e) => {setItemPrice(price + Number(e.target.value)); setAddOns({ Extra_Patty: +e.target.value})}
      const swapSideChange = (e) =>  {setItemPrice(price + Number(e.target.value)); setAddOns({ Extra_Patty: +e.target.value})}
      const upgradeChange = (e) =>  {setItemPrice(price + Number(e.target.value)); setAddOns({ Extra_Patty: +e.target.value})}

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
                          <h6>Select Size:</h6>
                            <input type="radio" id="frysampler" name="frysampler" value={0} onChange={radioChange} required />
                            <label htmlFor="smallfrysampler"> Small </label><br/>
                            {samplerAvailable ? <><input type="radio" id="frysampler" name="frysampler" value={samplerPrice} onChange={radioChange} required/>
                            <label htmlFor="largefrysampler">{`Large +${samplerPrice}`}</label></> : ''}
                         </Fragment>
                        : ''
                      }
                        {name === 'Chicken Wings 8 Piece' ? 
                         <Fragment>
                          <h6>Select Size:</h6>
                            <input type="radio" name="chickenwings" value={0} onChange={radioChange} required />
                            <label htmlFor="chickenwings"> 8 Pieces </label><br/>
                            {wingAvailable ? <><input type="radio" name='chickenwings' value={wingPrice} onChange={radioChange} required/>
                            <label htmlFor='chickenwings'>{`15 Pieces +${wingPrice}`}</label></> : ''}
                         </Fragment>
                        : ''
                      }
                      {name === 'Chicken Wings 8 Piece' || name === 'Duck Wings' ? 
                      <Form.Group>
                       <h6>Select Sauce:</h6>
                         <input type="radio" name="sauce" value={'Asian Chili'} onChange={sauceChange} required />
                         <Form.Label htmlFor="sauce">Asian Chili</Form.Label><br/>
                         <input type="radio" name='sauce' value={'Blue Cheese BBQ'} onChange={sauceChange} required/>
                         <Form.Label htmlFor='sauce'>Blue Cheese BBQ</Form.Label><br/>
                         <input type="radio" name='sauce' value={'Honey Ginger'} onChange={sauceChange} required/>
                         <Form.Label htmlFor='sauce'>Honey Ginger</Form.Label><br/>
                         <input type="radio" name='sauce' value={'House BBQ'} onChange={sauceChange} required/>
                         <Form.Label htmlFor='sauce'>House BBQ</Form.Label><br/>
                         <input type="radio" name='sauce' value={'Spicy Buffalo'} onChange={sauceChange} required/>
                         <Form.Label htmlFor='sauce'>Spicy Buffalo</Form.Label>
                      </Form.Group>
                     : ''
                      }
                      { category === 'Burger' ? 
                        <Fragment>
                          { meatAvailable ? 
                          <Form.Group>
                            <h6>Add Ons</h6>
                              <input type="radio" name="sauce" value={meatPrice} onChange={meatChange} required />
                              <Form.Label htmlFor="sauce">{`Add Extra Patty +${meatPrice}`}`</Form.Label><br/>
                          </Form.Group> : ''}
                          <Form.Group>
                            <h6>Swap Patty</h6>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'SwapOption').map(addon => 
                                  <>
                                      <input type="radio" name={addon.name} value={addon.price} onChange={swapChange} required />
                                      <Form.Label htmlFor="sauce">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>

                        </Fragment>: ''
                        
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
