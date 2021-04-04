import express from 'express'
const router = express.Router()
import { deleteTap, getTaps, postTap } from '../controllers/postController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, postTap).get(getTaps).delete(protect, admin, deleteTap)

export default router