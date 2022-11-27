import express from 'express'
const router = express.Router()
import { getSetup, updateSetup } from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getSetup).put(protect, admin, updateSetup)

export default router