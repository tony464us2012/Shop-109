import React, { useState } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch} from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import ProductModal from './Modal'

const Product = ({ product }) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()


    const addToCartHandler = (e) => {
        const cartItem = {
          id: product._id,
          name: product.name,
          price: product.price,
        }
        dispatch(addToCart(cartItem))
      }
      
    return (
        <>
            {/* <div className='product-container' onClick={() => {setModalShow(true); dispatch(listProductDetails(product._id))}}> */}
                <Card>
                    <div id={product._id} className="food-image">{product._id}</div>
                    <Card.Body className='productInfo'>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text>{product.description}</Card.Text>
                            <Card.Text className='card-price'> ${product.price} </Card.Text>
                            <div className="btn-container">
                                { product.tacoCategory !== "SingleTacos" &&
                                product.tacoCategory !== "LunchSpecials" &&
                                product.tacoCategory !== "Quesadillas" && 
                                product.tacoCategory !== "SideOrders" ? 
                                <Button variant="outline-dark" size='sm'  onClick={() => {setModalShow(true); dispatch(listProductDetails(product._id))}}>Customize</Button>
                            : ''}
                                <Button variant="dark" size='sm' onClick={() => addToCartHandler()}>Add To Cart</Button>
                            </div>
                    </Card.Body>
                </Card>
            {/* </div> */}
            {modalShow ? <ProductModal show={modalShow} onHide={() => setModalShow(false)} key={product._id} id={product._id} price={product.price}/> : '' }
        </>
    )
}

export default Product
