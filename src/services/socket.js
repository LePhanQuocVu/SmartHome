import { Server as IOServer } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js'
import { socketAuthMiddleware } from '../middleware/socket.js';
import userModel from '../model/userModel.js'; 
import { publishToMqtt } from '../mqttBroker/mqtt.js';
let ioInstance;

export function initSocket(server) {
  const io = new IOServer(server, {
    // cors: { origin: process.env.API_URL },
    cors: { origin: '*' },
    methods: ["GET", "POST"]
  });
  // middle ware
  io.use(socketAuthMiddleware);
  // event khi kết nối
  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id, 'userId=', socket.user.id);

    socket.join(`user_${socket.user.id}`);

    socket.on("toggledLed1", async(data) => {
      console.log(`💡 User ${socket.user.id} toggled LED:`, data.state);
     // đẩy lên MQTT
      publishToMqtt("iot_home/led_state", JSON.stringify({
        userId: socket.user.id,
        state: data.state
      }));

      // Update Database
      try{
        const userId = socket.user.id;
        const { state } = data;
        // cập nhật DB cho user này
        const user = await User.findOne({userId: userId});
        if (!user) return;
        user.ledState = state;
        await user.save();
      } catch(err) {
         console.error("Error updating LED:", err.message);
      }
    })
    socket.on("toggledLed2", async(data) => {
       console.log(`💡 User ${socket.user.id} toggled LED2:`, data.state);
    });
    socket.on("toggledFan", async(data) => {
        console.log(`💡 User ${socket.user.id} toggled Fan:`, data.state);
         publishToMqtt("iot_home/fan_state", JSON.stringify({
          userId: socket.user.id,
          state: data.state
        }));
    });
    socket.on("changeMode", async(data) => {
        console.log(`💡 User ${socket.user.id} Workmode:`, data.state);
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
