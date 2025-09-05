const express = require('express');
const userRouter = express.Router()
const userController  = require("../controllers/userControllers")


userRouter.post('/newUser',(req,res) => userController.newUser(req,res));
userRouter.put('/updateLedState/:userId',(req,res) => userController.updateLedState(req,res));
userRouter.put('/updateFanState/:userId',(req,res) => userController.updateFanState(req,res));
userRouter.put('/updateGasState/:userId',(req,res) => userController.updateGasState(req,res));
userRouter.delete('/deleteUser/:userId', (req,res) => userController.deleteUserById(req,res));

module.exports = userRouter;
