
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;


export const connectSocket = async () => {
  const token = await AsyncStorage.getItem("JWT_TOKEN");
  socket = io("http://192.168.43.171:3000", {
    auth: { token },
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Connection error:", err.message);
  });

  socket.on("disconnect", (reason) => {
    console.warn("Disconnected:", reason);
  });

  // Đăng ký các sự kiện xử lý ngay
  socket.on("realtime", (data) => {
    console.log("Real-time update:", data);
  });

  return socket;
};

export const toggleLed1 = (newState: boolean) => {
  socket?.emit("toggledLed1", { state: newState });
};
export const toggleLed2 = (newState: boolean) => {
  socket?.emit("toggledLed2", { state: newState });
};

export const toggleFan = (newState: boolean) => {
  socket?.emit("toggledFan", { state: newState });
};

export const convertMode = (newState: boolean) => {
  socket?.emit("changeMode", { state: newState });
};