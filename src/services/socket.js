import { Server as IOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'
import { socketAuthMiddleware } from '../middleware/socket.js';
let ioInstance;

export function initSocket(server) {
  const io = new IOServer(server, {
    cors: { origin: '*' },
    methods: ["GET", "POST"]
  });
  // middle ware
  io.use(socketAuthMiddleware);
  
  // event khi kết nối
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id, 'userId=', socket.user.id);

    socket.join(`user_${socket.user.id}`);

    socket.on('hello', (msg) => {
      console.log('hello from', socket.user.id, msg);
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected', socket.id, reason);
    });
  });

  ioInstance = io;
  return io;
}

// helper gửi realtime đến 1 user
export function sendRealtimeToUser(userId, payload) {
  if (!ioInstance) return;
  ioInstance.to(`user_${userId}`).emit('realtime', payload);
}

// helper broadcast đến tất cả user
export function broadcast(payload) {
  if (!ioInstance) return;
  ioInstance.emit('realtime', payload);
}
