import express from 'express'
const router = express.Router()
import { authUser, registerUser, getUserProfile, updateUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(getUsers)
router.route('/login').post(authUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
router.route('/:id').delete(deleteUser).get(protect, getUserById).put(protect, updateUser)

export default router