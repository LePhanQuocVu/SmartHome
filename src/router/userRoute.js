import mongoose from "mongoose";
import express from "express";
import userController from "../controllers/userControllers.js";
import { verifyToken } from "../middleware/auth.js";
const userRouter = express.Router()
const controller = new userController(); // tạo instance

userRouter.post('/userRegister',controller.newUser);
userRouter.post('/userLogin',controller.userLogin);
userRouter.put('/updateLedState/:userId', verifyToken,controller.updateLedState);
userRouter.put('/updateFanState/:userId',controller.updateFanState);
userRouter.put('/updateGasState/:userId', controller.updateGasState);
userRouter.delete('/deleteUser/:userId', controller.deleteUserById);

export default userRouter;