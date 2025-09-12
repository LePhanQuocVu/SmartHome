import express from 'express'
import dotenv from "dotenv";
dotenv.config({ quiet: true });
import mqtt from 'mqtt';
import bodyParser from "body-parser";
import cors from "cors";
import http from 'http'
import { Server as IOServer } from 'socket.io';
import {connectDB}  from './config/db.js'
import userRouter from './router/userRoute.js';
import { connectMQTT } from './mqttBroker/mqtt.js';
import { initSocket } from './services/socket.js';
import { Socket } from 'net';
import { verifyToken } from './middleware/auth.js';

/**Start App */
const app = express()

// Create Serve IOOOO
const server = http.createServer(app);
// khởi tạo socket riêng
initSocket(server);

/** Connect to MQTT */
connectMQTT();

/** connect to db */
connectDB();

/**Middelware */
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/**User Route */
app.use('/api/users', verifyToken, userRouter);

// done
server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
