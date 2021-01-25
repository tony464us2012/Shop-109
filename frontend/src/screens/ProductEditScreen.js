import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
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
                dispatch({ type: PRODUCT_UPDATE_RESET})
                history.push('/admin/productlist')
            } else {
                if(!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                } else {
                    setName(product.name)
                    setPrice(product.price)
                    setImage(product.image)
                    setCategory(product.category)
                    setDescription(product.description)
                    setAvailable(product.available)
                }
            }
    }, [dispatch, productId, product, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            category,
            description,
            available
        }))
    }
    
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    return (
        <>
        <LinkContainer to='/admin/productlist' className='btn btn-light my-3'>
        <Button variant="outline-secondary" size='lg'>Back</Button>
        </LinkContainer>
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
                <div className="mb-3">
                    <Form.File id="formcheck-api-custom" custom>
                    <Form.File.Input isValid />
                    <Form.File.Label data-browse="Choose File">
                        ...
                    </Form.File.Label>
                    </Form.File>
                </div>
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
                    </Form.Control>
                </Form.Group>
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