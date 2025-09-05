const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
  userId:  { type: Number, unique: true },
  name: {type: String, require: true},
  phone: { type: String, required: true, unique: true},
  status: { type: String, default: 'inactive' },
  ledState: { type: Boolean, default: false },
  fanState: { type: Boolean, default: false },
  gasState: { type: Boolean, default: false },
}, {
    timestamps: true
});

// gắn plugin để auto increment cho userId
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);