import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import config from 'config'
const secretkey = config.get('STRIPE_KEY_SECRET')
import Stripe from 'stripe'

const stripe = new Stripe(secretkey)

const addOrderItems = asyncHandler( async(req, res) => {
    const { name, email, orderItems, subtotal, tax, totalprice, isPaid, token} = req.body

    if(orderItems && orderItems.length == 0 ) {
        res.status(400)
        throw new Error('No order items')
    } else {
            const charge = await stripe.charges.create({
            amount: totalprice,
            currency: 'usd',
            source: token,
            description: 'first purchase',
            billing_details: {
                name
            }
        })
        if (charge.error) {
           res.status(500)
           throw new Error(charge.error.message)
        }

        const order = new Order({
            orderItems, user: req.user._id, subtotal, tax, totalprice, isPaid
        })

        const createdOrder = await order.save()

        res.status(200).json(createdOrder)
    }})

    const getOrderById = asyncHandler( async(req, res) => {
        const order = await Order.findById(req.params.id).populate('user', 'name email')

        if(order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error('Order not found')
        }
    })
   
    const getOrders = asyncHandler( async (req, res) => {
        const orders = await Order.find({}).populate('user', 'id name')
        res.json(orders)
    })


    export {
        addOrderItems,
        getOrderById,
        getOrders, 
    }