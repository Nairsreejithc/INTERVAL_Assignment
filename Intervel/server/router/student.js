
import express from 'express'
import { Register,Login} from '../controller/student.js'

const router=express.Router()

router.post('/Register',Register)

router.post('/Login',Login)

export default router