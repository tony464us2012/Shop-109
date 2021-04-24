import React, { useEffect, useState } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ProductListHeader from '../components/ProfileListHeader'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { deleteProduct, createProduct, listProducts, listProductDetails } from '../actions/productActions'
import MenuItem from '../components/product-list-components/MenuItem'
import Beers from '../components/product-list-components/Beers'
import AddOns from '../components/product-list-components/AddOns'


const ProductListScreen = ({ history }) => {

    const [tab, setTab] = useState('MenuItems')
    
    const dispatch = useDispatch()
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    
    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete
    
    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
            dispatch(listProducts())
        }, [dispatch])
    
    useEffect(() => {
        if(!userInfo.isAdmin) {
            history.push('/login')
        } 
        if(successCreate) {
            // eslint-disable-next-line
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }
    }, [dispatch, history, products,  userInfo, successDelete, successCreate, createdProduct._id])
    

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')) {
           dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const getProductHandler = (id) => {
        dispatch(listProductDetails(id))
    }

    const menuitems = products.filter(menuitem => menuitem.category !== 'Beer' && menuitem.category !== 'AddOns')
    const beers = products.filter(beer => beer.category === 'Beer')
    const addons = products.filter(addon => addon.category === 'AddOns')

    const tabHandler = (tab) => {
        setTab(tab)
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                <ProductListHeader tabHandler={tabHandler} tab={tab}/>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Item
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            (<>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                        </tr>
                    </thead>
                        {tab === 'MenuItems' ? <MenuItem menuitems={menuitems} getProductHandler={getProductHandler} deleteHandler={deleteHandler} /> :
                        tab === 'Beers' ? <Beers beers={beers} getProductHandler={getProductHandler} deleteHandler={deleteHandler}/> :
                        <AddOns addons={addons} getProductHandler={getProductHandler} deleteHandler={deleteHandler}/> 
                        }
                </Table>
            </>
            )}
        </>
    )
}

export default ProductListScreen