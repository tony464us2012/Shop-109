import React, { useState, useEffect } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Image } from 'react-bootstrap'
import { PRODUCT_DETAILS_RESET } from '../actions/types'
import Loader from './Loader'


const ProductModal = ({show, onHide, productId}) => {
   
    const productDetail = useSelector(state => state.productDetails)
    const { loading, error, product:productInfo } = productDetail
    
      const productList = useSelector(state => state.productList)
      const { products } = productList

    const { name, image, description, price, category, available } = productInfo

    const [itemPrice, setItemPrice] = useState(price)
    const [instructions, setIntructions] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listProductDetails(productId))
        return () => {
            dispatch({type: PRODUCT_DETAILS_RESET})
        }
    }, [show, dispatch])

    const addons = products.filter(product => product.category === 'AddOns')

    console.log(addons)
   
    return (
        <>
            { loading ? <Loader /> :
                <Modal
                  size="lg"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                >
                  <Modal.Header closeButton= {onHide}>
                    <Modal.Title id="contained-modal-title-vcenter">
                      {name}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      {description ? <p> {description} </p> : ''}
                      {image ? <Image src={image} alt={name}/> : ''}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={onHide}>Add To Cart-${itemPrice}</Button>
                  </Modal.Footer>
                </Modal>
            }
        </>
            );
}

export default ProductModal
