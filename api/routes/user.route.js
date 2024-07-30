import express from 'express'
import {updateUser, test} from '../controllers/users.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/', test)
router.put('/update/:userId', verifyUser, updateUser)

export default router