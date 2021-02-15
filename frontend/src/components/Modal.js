import React, { useState, useEffect, useRef, Fragment } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Image, Col, Form, Row } from 'react-bootstrap'
import { PRODUCT_DETAILS_RESET } from '../actions/types'
import Loader from './Loader'



const ProductModal = ({show, onHide, productId, price}) => {
    const dispatch = useDispatch()
   
    const productDetail = useSelector(state => state.productDetails)
    const { loading, error, product:productInfo } = productDetail
    const { name, image, description, category, available } = productInfo
    
      const productList = useSelector(state => state.productList)
      const { products } = productList

      const [itemPrice, setItemPrice] = useState(price)
      const ref = useRef(itemPrice)
      const [addOns, setAddOns] = useState({})
      const [instructions, setInstructions] = useState('')
      const [selected, setSelected] = useState({})
      
              
              useEffect(() => {
                ref.current = itemPrice
                console.log('first render')
              },[itemPrice])
              
      
    const addons = products.filter(product => product.category === 'AddOns')
    const largefrysampler = addons.filter(sampler =>  sampler.addOnType === 'LargeFrySampler')
    const [{ price:samplerPrice, available:samplerAvailable }] = largefrysampler
    const largechickenwings = addons.filter(wings => wings.addOnType === 'LargeChickenWings')
    const [{price:wingPrice, available:wingAvailable}] = largechickenwings
    const addMeat = addons.filter(meat => meat.name === 'Extra Meat Patty')
    const [{name:meatName, price:meatPrice, available:meatAvailable}] = addMeat
    const chicken = addons.filter(chk => chk.addOnType === 'Chicken')
    const [{name:chickenName, price:chickenPrice, available:chickenAvailable}] = chicken
    const bacon = addons.filter(bcn => bcn.addOnType === 'Bacon')
    const [{name:baconName, price:baconPrice, available:baconAvailable}] = bacon

      const handleChange = (e) => {setInstructions(e.target.value)}
      const radioChange = (e) => {
        let string = e.target.value;
        let newString = string.split('+')
        const newLabel = newString[0].trim()
        const newPrice = Number(newString[1])
        console.log(e.target.checked)
       
        if (e.target.checked) {
          if (e.target.name === 'SwapOption') {
            const newObject = addOns['SwapOption'] = string
            setAddOns(newObject)
            setSelected({...selected, selected: newLabel})
          } else {
            setItemPrice( Number(ref.current) + Number(newPrice)); 
            setAddOns({...addOns, [e.target.name]: string})
          }
        } else {
            if (e.target.name === 'SwapOption') {
              const newSelected = delete selected[selected]
              setSelected(newSelected)
            } else {
              setItemPrice( Number(ref.current) - Number(newPrice)); 
              setAddOns(addOns.filter(x => x !== string))
            }
          removePersist(e.target.name)
        }
        }
     
      const removePersist = (type) => {
        if (type === 'SwapOption') {
          const newSelected = delete selected[selected]
          setSelected(newSelected)
        }
      }

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
            { 
              loading ? <Loader /> :
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
                        {name === 'Fry Sampler' ? 
                         <Fragment>
                          <h6>Select Size:</h6>
                            <input type="radio" id="frysampler" name="frysampler" value={`Small +0`} onChange={radioChange} required />
                            <label htmlFor="smallfrysampler"> Small </label><br/>
                            {samplerAvailable ? <><input type="radio" id="frysampler" name="frysampler" value={`Large +${samplerPrice}`} onChange={radioChange} required/>
                            <label htmlFor="largefrysampler">{`Large +${samplerPrice}`}</label></> : ''}
                         </Fragment>
                        : ''
                      }
                        {name === 'Chicken Wings 8 Piece' ? 
                         <Fragment>
                          <h6>Select Size:</h6>
                            <input type="radio" name="chickenwings" value={`8 Pieces +0`} onChange={radioChange} required />
                            <label htmlFor="chickenwings"> 8 Pieces </label><br/>
                            {wingAvailable ? <><input type="radio" name='chickenwings' value={`15 Pieces +${wingPrice}`} onChange={radioChange} required/>
                            <label htmlFor='chickenwings'>{`15 Pieces +${wingPrice}`}</label></> : ''}
                         </Fragment>
                        : ''
                      }
                      {name === 'Chicken Wings 8 Piece' || name === 'Duck Wings' ? 
                      <Form.Group>
                       <h6>Select Sauce:</h6>
                         <input type="radio" name="sauce1" value={'Asian Chili Sauce +0'} onChange={radioChange} required />
                         <Form.Label htmlFor="sauce">Asian Chili Sauce</Form.Label><br/>
                         <input type="radio" name='sauce2' value={'Blue Cheese BBQ Sauce +0'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>Blue Cheese BBQ Sauce</Form.Label><br/>
                         <input type="radio" name='sauce3' value={'Honey Ginger Sauce +0'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>Honey Ginger Sauce</Form.Label><br/>
                         <input type="radio" name='sauce4' value={'House BBQ Sauce +0'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>House BBQ Sauce</Form.Label><br/>
                         <input type="radio" name='sauce5' value={'Spicy Buffalo Sauce +0'} onChange={radioChange} required/>
                         <Form.Label htmlFor='sauce'>Spicy Buffalo Sauce</Form.Label>
                      </Form.Group>
                     : ''
                      }
                      { category === 'Burger' ? 
                        <Fragment>
                          { meatAvailable ? 
                          <Form.Group>
                            <h6>Add Ons</h6>
                              <input type="checkbox" name="meat" value={`${meatName} +${meatPrice}`} onChange={radioChange}/>
                              <Form.Label htmlFor="meat">{`${meatName} +${meatPrice}`}</Form.Label><br/>
                          </Form.Group> : ''}
                          <Form.Group>
                            <h6>Swap Patty</h6>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'SwapOption').map(addon => 
                                  <>
                                      <input type="checkbox" className="checkbox" checked={selected && selected.selected === addon.name} name='SwapOption' value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="SwapOption">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                          <Form.Group>
                            <h6>Extras</h6>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'Extras').map(addon => 
                                  <>
                                      <input type="radio" name="Extras" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="Extras">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                          <Form.Group>
                            <h6>Swap Side</h6>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'SwapSideOption').map(addon => 
                                  <>
                                      <input type="radio" name="SwapSide" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="SwapSide">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                          <Form.Group>
                            <h6>Upgrade Side</h6>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'UpgradeOption').map(addon => 
                                  <>
                                      <input type="radio" name="UpgradeSide" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="UpgradeSide">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>

                        </Fragment>: ''
                      }
                      { category === 'Salad' && name !== 'Burger In A Bowl' ? 
                        <Fragment>
                          <Form.Group>
                            <h6>Add-Ons</h6>
                            {
                              name === 'Caesar Salad' && baconAvailable ? 
                              <>
                              <input type="radio" name="Bacon" value={`${baconName} +${baconPrice}`} onChange={radioChange} required />
                              <Form.Label htmlFor="Bacon">{`${baconName} +${baconPrice}`}</Form.Label><br/>
                          </> : ''
                            }
                              {
                                chickenAvailable ? 
                                  <>
                                      <input type="radio" name="Chicken" value={`${chickenName} +${chickenPrice}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="sauce">{`${chickenName} +${chickenPrice}`}</Form.Label><br/>
                                  </> : ''
                                
                              }
                          </Form.Group>
                        </Fragment>: ''
                      }
                      { name === 'Burger In A Bowl' ? 
                        <Fragment>
                          <Form.Group>
                            <h6>Select Burger</h6>
                              {
                                addons.filter(addon => addon.available && addon.addOnType === 'BurgerInABowl').map(addon => 
                                  <>
                                      <input type="radio" name="Burger" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="Burger">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                        </Fragment>: ''
                      }
                      { name === 'Homemade Mac & Cheese' ? 
                        <Fragment>
                          <Form.Group>
                            <h6>Add-Ons</h6>
                              {
                                baconAvailable ? 
                                  <>
                                      <input type="radio" name="Bacon" value={`${baconName} +${baconPrice}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="Bacon">{`${baconName} +${baconPrice}`}</Form.Label><br/>
                                  </> : ''
                              }
                              {
                                chickenAvailable ? 
                                  <>
                                      <input type="radio" name="Chicken" value={`${chickenName} +${chickenPrice}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="Chicken">{`${chickenName} +${chickenPrice}`}</Form.Label><br/>
                                  </> : ''
                              }
                          </Form.Group>
                        </Fragment>: ''
                      }
                      { category === 'Sandwich' ? 
                        <Fragment>
                          <Form.Group>
                            <h6>Upgrade Option</h6>
                            {
                                addons.filter(addon => addon.available && addon.addOnType === 'UpgradeOption').map(addon => 
                                  <>
                                      <input type="radio" name="UpgradeOption" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                      <Form.Label htmlFor="UpgradeOption">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                  </>
                                  )
                              }
                          </Form.Group>
                        </Fragment>: ''
                      }
                      {
                        name === 'Fries' ||  name === 'Tots' ? 
                        <Fragment>
                        <Form.Group>
                          <h6>Add-Ons</h6>
                          {
                              addons.filter(addon => addon.available && addon.name === 'Loaded up with Cheese & Applewood Smoked Bacon Bits').map(addon => 
                                <>
                                    <input type="radio" name="Add-Ons" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                    <Form.Label htmlFor="Add-Ons">{`${addon.name} +${addon.price}`}</Form.Label><br/>
                                </>
                                )
                            }
                        </Form.Group>
                      </Fragment>: ''
                      }
                      {
                        name === 'Sweet Potato Fries' ||  name === 'Sweet Potato Tots' ? 
                        <Fragment>
                        <Form.Group>
                          <h6>Add-Ons</h6>
                          {
                              addons.filter(addon => addon.available && addon.name === 'Loaded up With Caramel & Cinnamon').map(addon => 
                                <>
                                    <input type="radio" name="Add-Ons" value={`${addon.name} +${addon.price}`} onChange={radioChange} required />
                                    <Form.Label htmlFor="Add-Ons">{`${addon.name} +${addon.price}`}</Form.Label><br/>
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
                    <input type='submit' value={`Add To Cart $${itemPrice}`}/> :
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
