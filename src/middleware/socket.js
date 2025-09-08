// src/middleware/socketMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

/**
 * Middleware xác thực cho Socket.IO
 */
export const socketAuthMiddleware = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Authentication error: token missing'));
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    // Tìm user và kiểm tra quyền
    const user = await User.findOne({ userId: payload.id });
    if (!user) {
      return next(new Error('Authentication error: user not found'));
    }

    console.log("user: ", user);
    socket.user = { id: payload.id, role: payload.role || 'user' };
    next();
  } catch (err) {
    next(new Error('Authentication error: ' + err.message));
  }
};