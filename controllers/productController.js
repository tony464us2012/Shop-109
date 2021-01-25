import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler( async(req, res) => {

const products = await Product.find({})
if (products) {
    res.json(products)
} else {
    res.status(404)
    throw new Error('Products Not Found')
}
})

const getProductById = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
const deleteProduct = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
     await product.remove()
     const products = await Product.find({})
       res.json(products)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
const createProduct = asyncHandler( async(req, res) => {

    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.body.id,
        image: '/images/sample.jpg',
        category: 'Burger',
        description: 'Sample description',
        available: true
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
const updateProduct = asyncHandler( async(req, res) => {
    const {name, price, image, category, description, available} = req.body
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.category = category
        product.available = available
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    await product.save()
    const products = await Product.find({})
    res.json(products)
})

export {
    getProducts, 
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}