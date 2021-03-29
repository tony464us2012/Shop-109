const express = require('express')
const router = express.Router()
import { deleteTap, getTaps, postTap } from '../controllers/postController'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, postTap).get(getTaps).delete(protect, admin, deleteTap)