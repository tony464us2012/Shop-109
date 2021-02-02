import React, { useState, useEffect } from 'react'
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
    }, [show, dispatch,])
    
    const [itemPrice, setItemPrice] = useState(null)
    const [instructions, setInstructions] = useState('')

    const addons = products.filter(product => product.category === 'AddOns')

    
    const LargeFrySamplerPrice = addons.map(addon => addon.addOnType === 'LargeFrySampler')
    const { price:samplerPrice } = [...LargeFrySamplerPrice]
    console.log(LargeFrySamplerPrice)

    const handleChange = (e) => {setInstructions(e.target.value)}

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
                      <Form>
                        {name === 'Fry Sampler Small' ? 
                         <fieldset>
                         <Form.Group as={Row}>
                           <Form.Label as="legend" row sm={2}> 
                             Choose Side
                           </Form.Label>
                           <Col sm={10}>
                             <Form.Check
                               type="radio"
                               label={`Large  +${samplerPrice}`}
                               name="formHorizontalRadios"
                               id="formHorizontalRadios1"
                             />
                             <Form.Check
                               type="radio"
                               label="Small"
                               name="formHorizontalRadios"
                               id="formHorizontalRadios2"
                             />
                             <Form.Check
                               type="radio"
                               label="third radio"
                               name="formHorizontalRadios"
                               id="formHorizontalRadios3"
                             />
                           </Col>
                         </Form.Group>
                       </fieldset> : ''
                      }
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>List Any Preferences</Form.Label>
                        <Form.Text as="textarea" placeholder='allergies, etc.' width='100%' value={instructions} onChange={handleChange} rows={3} />
                      </Form.Group>
                      </Form>
                  </Modal.Body>
                  <Modal.Footer style={white}>
                    <Button onClick={onHide}>Add To Cart-${!itemPrice ? price : itemPrice}</Button>
                  </Modal.Footer>
                </Modal>
            }
        </>
            );
}

export default ProductModal
