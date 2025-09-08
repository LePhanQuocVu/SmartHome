
import AsyncStorage from "@react-native-async-storage/async-storage";
import { io } from "socket.io-client";

const socket = io("http://192.168.43.171:3000", {
  autoConnect: false,
  transports: ["websocket"],
});

export const connectSocket = async () => {
  const token = await AsyncStorage.getItem("JWT_TOKEN");
  if (token) {
    socket.auth = { token }; 
    socket.connect();
     // Bắt sự kiện kết nối thành công
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    // Nếu có lỗi xác thực hoặc handshake thất bại
    socket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    // Khi bị ngắt kết nối
    socket.on("disconnect", (reason) => {
      console.warn("Disconnected:", reason);
    });
  }
};


export default socket;