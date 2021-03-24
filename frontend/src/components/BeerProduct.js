import React, { useState } from 'react'
import { listProductDetails } from '../actions/productActions'
import { useDispatch} from 'react-redux'
import ProductModal from './Modal'

const BeerProduct = ({ product }) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch()


    return (
        <>
            <a  onClick={() => {setModalShow(true); dispatch(listProductDetails(product._id))}}>
                <div className='beer-product' >
                    <img src={product.image} variant='top' />
                    <div className='beer-product-info'>
                            <h5><strong className='title-text'>{product.name}</strong></h5>
                            <h6>{product.description}</h6>
                            <h6> ${product.price} </h6>
                    </div>
                </div>
            </a>
            {modalShow ? <ProductModal show={modalShow} onHide={() => setModalShow(false)} key={product._id} id={product._id} price={product.price}/> : '' }
        </>
    )
}

export default BeerProduct