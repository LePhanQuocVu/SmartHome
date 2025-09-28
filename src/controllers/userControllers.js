import User from "../model/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default  class userController {
  newUser = async (req,res)=> {
    try {
        const { name, phone, password, status, ledState, fanState, gasState } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        /** check user exist */
        const existUser = await User.findOne({ phone });
        if (existUser) {
            return res.status(400).json({ message: 'User already exists with this phone number' });
        }
        const newUser = new User({name, phone, password:hashedPassword, status, ledState, fanState, gasState });
        await newUser.save();
        res.status(201).json({message: "Register success!", newUser});
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
 }
 userLogin = async(req,res) => {
    try{
        console.log("user Call API Login");
        const {phone, password} = req.body;
        const existUser = await User.findOne({phone});
        if (!existUser) return res.status(404).json({ message: "User not found" });
        const isMatch = await bcrypt.compare(password, existUser.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = jwt.sign(
            {
                id: existUser.userId, role: existUser.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )
        console.log("Token: ", token);
        res.status(200).json({msg: "Login success!", token});
    } catch(err) {
          res.status(500).json({msg: err.message});
    }
 }
updateLedState = async (req, res) => {
  try {
    const { userId } = req.params;   //  Lấy đúng giá trị userId
    const { ledState } = req.body;

    // 1. Kiểm tra user tồn tại
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Cập nhật ledState
    user.ledState = ledState;
    await user.save(); // sẽ tự động cập nhật updatedAt nếu dùng timestamps

    res.json({ message: "LED state updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

updateFanState = async (req, res) => {
  try {
    const { userId } = req.params;   //  Lấy đúng giá trị userId
    const { ledState } = req.body;

    // 1. Kiểm tra user tồn tại
    const user = await User.findOne({ userId: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Cập nhật ledState
    user.fanState = fanState;
    await user.save(); // sẽ tự động cập nhật updatedAt nếu dùng timestamps

    res.json({ message: "Fan state updated", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

 updateGasState = async (req,res) => {
    try{
        const userId = req.params.userId;
        const { gasState} = req.body;
        const user = await User.findOne({userId});
        if(!user) {
            return res.status(404).json({msg: "User not found"});
        }
        // update
        user.gasStae = gasStae;
        await user.save();
        res.json({msg: 'GAS state updated', user});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
 }
 deleteUserById =  async(req,res) => {
    try {
        const userId = req.params;
         // 1. Tìm và xóa user
         const deletedUser = await User.findOneAndDelete({ userId });
         if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
         }
         res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch(err) {
        res.status(500).json({msg: err.message})
    }
 }
};
