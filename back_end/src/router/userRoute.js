import mongoose from "mongoose";
import express from "express";
import userController from "../controllers/userControllers.js";
const userRouter = express.Router()

userRouter.post('/newUser',(req,res) => userController.newUser(req,res));
userRouter.put('/updateLedState/:userId',(req,res) => userController.updateLedState(req,res));
userRouter.put('/updateFanState/:userId',(req,res) => userController.updateFanState(req,res));
userRouter.put('/updateGasState/:userId',(req,res) => userController.updateGasState(req,res));
userRouter.delete('/deleteUser/:userId', (req,res) => userController.deleteUserById(req,res));

export default userRouter;