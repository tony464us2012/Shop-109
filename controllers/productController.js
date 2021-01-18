import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler( async(req, res) => {
    const pageSize = 10
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword, 
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize)})
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
       res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})
const createProduct = asyncHandler( async(req, res) => {
    console.log(req.user)
    const product = new Product({
        name: 'Sample Name',
        price: 0,
        user: req.body.id,
        image: '/images/sample.jpg',
        category: 'Sample category',
        description: 'Sample description'
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})
const updateProduct = asyncHandler( async(req, res) => {
    const {name, price, image, category, description} = req.body
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.category = category
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
    const updatedProduct = await product.save()
    res.json(updatedProduct)
})

export {
    getProducts, 
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct
}