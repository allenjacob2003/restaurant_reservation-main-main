import express from 'express'
import { adminLogin, getUser, userLogin, userLogout, userSignup } from "./../controllers/userControllers.js" 

const userRouter = express.Router();

userRouter.post('/admin',adminLogin)
userRouter.post('/signup',userSignup)
userRouter.post('/login',userLogin)
userRouter.get('/getUser',getUser)
userRouter.get('/logout',userLogout)

export default userRouter