const express = require('express')
const router = express.Router()
import { deleteBottle, getBottles, postBottles } from '../controllers/bottleController'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, postBottles).get(getBottles).delete(protect, admin, deleteBottle)