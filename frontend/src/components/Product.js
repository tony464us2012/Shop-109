import React, { useState } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch} from 'react-redux'
import ProductModal from './Modal'

const Product = ({ product }) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()


    return (
        <>
            <div className='product-container' onClick={() => {setModalShow(true); dispatch(listProductDetails(product._id))}}>
                <div className='product' >
                    <img src={product.image}  alt='product'/>
                    <div className='productInfo'>
                            <h5><strong className='title-text'>{product.name}</strong></h5>
                            <h6>{product.description}</h6>
                            <h6> ${product.price} </h6>
                    </div>
                </div>
            </div>
            {modalShow ? <ProductModal show={modalShow} onHide={() => setModalShow(false)} key={product._id} id={product._id} price={product.price}/> : '' }
        </>
    )
}

export default Product
