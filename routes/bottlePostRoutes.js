import express from 'express'
const router = express.Router()
import { deleteBottle, getBottles, postBottles } from '../controllers/bottleController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, postBottles).get(getBottles).delete(protect, admin, deleteBottle)

export default router