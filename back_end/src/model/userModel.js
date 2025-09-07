import mongoose from 'mongoose';
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const userSchema = new mongoose.Schema({
  userId:  { type: Number, unique: true },
  name: {type: String, require: true},
  phone: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  status: { type: String, default: 'inactive' },
  ledState: { type: Boolean, default: false },
  fanState: { type: Boolean, default: false },
  gasState: { type: Boolean, default: false },
}, {
    timestamps: true
});

// gắn plugin để auto increment cho userId
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

export default mongoose.model('User', userSchema)