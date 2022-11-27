import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById, getOrders, getMyOrders, refundOrder, guestOrder } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(addOrderItems).get(protect, admin, getOrders)
router.route('/guest').post(guestOrder)
router.route('/:id').get(protect, getOrderById)
router.route('/myorders/:id').get(protect, getMyOrders)
router.route('/refund').put(protect, admin, refundOrder)

export default router