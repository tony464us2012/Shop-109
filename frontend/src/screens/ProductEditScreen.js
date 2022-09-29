import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../actions/types'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [tacoCategory, setTacoCategory] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [available, setAvailable] = useState(true)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product} = productDetails
   
    const productUpdate = useSelector(state => state.productUpdate)
    const { loadingUpdate, error:errorUpdate, success:successUpdate} = productUpdate

    
    useEffect(() => {
            if(successUpdate) {
                history.push('/admin/productlist')
                dispatch({type: PRODUCT_UPDATE_RESET})
            } else {
                if(!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setCategory(product.category)
                    setTacoCategory(product.tacoCategory)
                    setDescription(product.description)
                    setAvailable(product.available)
                }
            }
    }, [dispatch, productId, product, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            tacoCategory,
            description,
            available
        }))
    }
    
    return (
        <>
        <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='price'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='number' placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                </Form.Group>
                {/* <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                    <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}></Form.File>
                    {uploading && <Loader />}
                </Form.Group> */}
                <Form.Group controlId='brand'>
                    <Form.Label>Category</Form.Label>
                    <Form.Control as='select' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value='Burger'>Burger</option>
                        <option value='Salad'>Salad</option>
                        <option value='Appetizer'>Appetizer</option>
                        <option value='ForkandKnife'>ForkandKnife</option>
                        <option value='Sandwich'>Sandwich</option>
                        <option value='Slider'>Slider</option>
                        <option value='Side'>Side</option>
                        <option value='AddOns'>AddOns</option>
                        <option value='Taco'><a onClick={() => setTacoCategory('Tacos')}>Taco</a></option>
                    </Form.Control>
                </Form.Group>
                {category === 'Taco' ?  
                     <Form.Group controlId='brand'>
                     <Form.Label>Taco Type</Form.Label>
                     <Form.Control as='select' placeholder='Enter category' value={tacoCategory} onChange={(e) => setTacoCategory(e.target.value)}>
                         <option value=''>Select Type</option>
                         <option value='Tacos'>Tacos</option>
                         <option value='SingleTacos'>Single Tacos</option>
                         <option value='Quesadillas'>Quesadilla</option>
                         <option value='SideOrders'>Side Orders</option>
                         <option value='BowlsandSalads'>Bowls and Salads</option>
                         <option value='Fajitas'>Fajitas</option>
                         <option value='Burritos'>Burritos</option>
                         <option value='LunchSpecials'>Lunch Specials</option>
                     </Form.Control>
                 </Form.Group> : ''
            }
                <Form.Group controlId='description'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='brand'>
                    <Form.Label>Available?</Form.Label>
                    <Form.Control as='select' value={available} onChange={(e) => setAvailable(e.target.value)}>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
            )}
        </FormContainer>
      </>  
    )
}

export default ProductEditScreen