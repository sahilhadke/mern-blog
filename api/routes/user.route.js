import express from 'express'
import {updateUser, deleteUser, test, signoutUser} from '../controllers/users.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', test)
router.put('/update/:userId', verifyUser, updateUser)
router.delete('/delete/:userId', verifyUser, deleteUser)
router.post('/signout', signoutUser)

export default router