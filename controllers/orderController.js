import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import config from 'config'
const secretkey = config.get('STRIPE_KEY_SECRET')
import Stripe from 'stripe'

const stripe = new Stripe(secretkey)

const addOrderItems = asyncHandler( async(req, res) => {
    const { firstName, lastName, phone, email, billingName, orderItems, subtotal, tax, totalprice, token} = req.body

    if(orderItems && orderItems.length == 0 ) {
        res.status(400)
        throw new Error('No order items')
    } else {
            const charge = await stripe.charges.create({
            amount: Math.trunc(totalprice * 100),
            currency: 'usd',
            source: token,
            description: 'Take-Out',
            billing_details: billingName,
            receipt_email: email,
        })
        if (charge.error) {
           res.status(500)
           throw new Error(charge.error.message)
        }

        const order = new Order({
            firstName,
            lastName,
            phone,
            email,
            orderItems, 
            user: req.user._id, 
            subtotal, 
            tax, 
            totalprice
        })

         await order.save()
         
        res.status(200).json(order)
    }})

    const getOrderById = asyncHandler( async(req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'firstName email')

        if(order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error('Order not found')
        }
    })
   
    const getOrders = asyncHandler( async (req, res) => {
        const orders = await Order.find({}).populate('user', 'id name')

        if (orders) {
            res.json(orders)
        } else {
            throw new Error('Orders not found')
        }
    })

    const getMyOrders = asyncHandler( async(req, res) => {
        const orders = await Order.find({user: req.params.id}).populate('user', 'name email')
        if (orders) {
            res.json(orders)
        } else {
            res.status(404) 
            throw new Error('Orders not found')
        }
    })


    export {
        addOrderItems,
        getOrderById,
        getOrders,
        getMyOrders 
    }