import { Server as IOServer } from 'socket.io';
import jwt from 'jsonwebtoken';

let ioInstance;

export function initSocket(server) {
  const io = new IOServer(server, {
    cors: { origin: '*' }
  });

  // middleware xác thực
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('Authentication error: token missing'));

      const payload = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(payload.id);
      if (!user) return next(new Error('Authentication error: user not found'));

      socket.user = { id: payload.id, role: payload.role || 'user' };
      next();
    } catch (err) {
      next(new Error('Authentication error: ' + err.message));
    }
  });

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
