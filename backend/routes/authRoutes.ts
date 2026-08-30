import {Router} from 'express'
import { getuser, login, signup } from '../controllers/authController'
import { authLimiter } from '../middleware/rateLimiter'

const authRouter = Router()
authRouter.get('/user', authLimiter,getuser)
authRouter.post('/signup',authLimiter, signup)
authRouter.post('/login', authLimiter,login)

export default authRouter