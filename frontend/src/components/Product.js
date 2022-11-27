import React, { useState } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch} from 'react-redux'
import { Card, Button } from 'react-bootstrap'
import { addToCart } from '../actions/cartActions'
import ProductModal from './Modal'

const Product = ({ product }) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()


    const addToCartHandler = () => {
        const cartItem = {
          id: product._id,
          name: product.name,
          price: product.price,
          description: product.description
        }
        dispatch(addToCart(cartItem))
      }
      
    return (
        <>
                <Card className='food-item'>
                    <div key={product._id} id={product._id} className="food-image"></div>
                    <Card.Body className='productInfo'>
                            <Card.Title>{product.name}</Card.Title>
                            <Card.Text className='text'>{product.description}</Card.Text>
                            { product.tacoCategory !== "Burritos" &&
                              product.tacoCategory !== "Fajitas" && 
                              product.tacoCategory !== "BowlsandSalads" &&
                              product.tacoCategory !== "LunchSpecials" &&
                              product.name !== "Loaded Tacos" ?
                              <Card.Text className='card-price'> ${(product.price).toFixed(2)} </Card.Text>
                           : ''}
                            <div className="btn-container">
                                { product.tacoCategory !== "SingleTacos" &&
                                product.tacoCategory !== "Quesadillas" && 
                                product.tacoCategory !== "SideOrders" ? 
                                <Button variant="outline-dark" size='sm'  onClick={() => {setModalShow(true); dispatch(listProductDetails(product._id))}}>Customize</Button>
                            : ''}
                            { product.tacoCategory !== "Burritos" &&
                              product.tacoCategory !== "Fajitas" && 
                              product.tacoCategory !== "BowlsandSalads" &&
                              product.tacoCategory !== "LunchSpecials" &&
                              product.name !== "Loaded Tacos" && 
                              product.name !== "Fry Sampler" &&
                              product.name !== "Duck Wings" &&
                              product.name !== "Chicken Wings 8 Piece" &&
                              product.name !== "Burger In A Bowl" ?
                              <Button variant="dark" size='sm' onClick={() => addToCartHandler()}>Add To Cart</Button>
                            : ''}
                            </div>
                    </Card.Body>
                </Card>
            {modalShow ? <ProductModal show={modalShow} onHide={() => setModalShow(false)} id={product._id} price={product.price}/> : '' }
        </>
    )
}

export default Product
