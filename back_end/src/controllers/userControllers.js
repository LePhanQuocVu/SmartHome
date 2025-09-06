import User from "../model/userModel.js"

export default  class userController {
 async newUser(req,res) {
    try {
        const { name, phone, status, ledState, fanState, gasState } = req.body;
        /** check user exist */
        const existUser = await User.findOne({ phone });
        if (existUser) {
            return res.status(400).json({ message: 'User already exists with this phone number' });
        }
        const newUser = new User({name, phone, status, ledState, fanState, gasState });
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
 }
 async updateLedState(req,res) {
     try {
         const userId = req.params;
        const { ledState} = req.body;
        // 1. Kiểm tra user tồn tại
        const user = await User.findOne({ userId });
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        // 2. Cập nhật ledState
        user.ledState = ledState;
        await user.save(); // sẽ tự động cập nhật updatedAt nếu dùng timestamps

        res.json({ message: 'LED state updated', user });
  } catch (err) {
        res.status(500).json({ error: err.message });
  }
 }
 async updateFanState(req,res) {
    try{
        const userId = req.params;
        const { fanState} = req.body;
        const user = await User.findOne({userId});
        if(!user) {
            return res.status(404).json({msg: "User not found"});
        }
        // update
        user.fanState = fanState;
        await user.save();
        res.json({msg: 'FAN state updated', user});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
 }
 async updateGasState(req,res) {
    try{
        const userId = req.params;
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
  async deleteUserById(req,res) {
    try {
        const userId = req.params.userId;
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
