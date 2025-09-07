import mongoose from "mongoose";
import express from "express";
import userController from "../controllers/userControllers.js";
const userRouter = express.Router()
const controller = new userController(); // tạo instance

userRouter.post('/userRegister',(req,res) => controller.newUser(req,res));
userRouter.post('/userLogin',(req,res) => controller.userLogin(req,res));
userRouter.put('/updateLedState/:userId',(req,res) => controller.updateLedState(req,res));
userRouter.put('/updateFanState/:userId',(req,res) => controller.updateFanState(req,res));
userRouter.put('/updateGasState/:userId',(req,res) => controller.updateGasState(req,res));
userRouter.delete('/deleteUser/:userId', (req,res) => controller.deleteUserById(req,res));

export default userRouter;