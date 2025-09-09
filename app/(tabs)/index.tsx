import socket, { connectSocket } from "@/services/socket";
import { Ionicons } from "@expo/vector-icons"; // icon chuông
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ToastNotify from "@/components/Toaster";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Component Switch có kiểm tra đăng nhập
const ProtectedSwitch = ({
  value,
  onToggle,
  isLoggedIn,
  showToast,
}: {
  value: boolean;
  onToggle: () => void;
  isLoggedIn: boolean;
  showToast: (msg: string) => void;
}) => {
  const handleToggle = () => {
    if (!isLoggedIn) {
      showToast("⚠️ Vui lòng đăng nhập để tiếp tục");
      return;
    }
    onToggle();
  };

  return <Switch value={value} onValueChange={handleToggle} />;
};

export default function HomeScreen() {
  const [autoMode, setAutoMode] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [lightOn1, setLightOn1] = useState(false);
  const [lightOn2, setLightOn2] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [gasSafe, setGasSafe] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [message, setMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

    // Gọi custom hook
  const { ToastElement, showToast } = ToastNotify(2000);

  useEffect(() => {
    const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("JWT_TOKEN");
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Lỗi khi lấy token:", error);
      setIsLoggedIn(false);
    }
  };
    checkLoginStatus();
    connectSocket();
    socket.on("welcome", (msg) => setMessage(msg));
    socket.on("message", (msg) => console.log("📩", msg));

    return () => {
      socket.off("welcome");
      socket.off("message");
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Image
            source={{ uri: "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SMART HOME</Text>
        <TouchableOpacity style={styles.bellButton}>
          <Ionicons
            name={hasNotification ? "notifications" : "notifications-outline"}
            size={28}
            color={hasNotification ? "red" : "black"}
          />
        </TouchableOpacity>
      </View>

      {/* Nội dung */}
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.label}>🌡️ Nhiệt độ: {temperature} °C</Text>
          <Text style={styles.label}>💧 Độ ẩm: {humidity} %</Text>
        </View>

        <View style={styles.card}>
          {/* Đèn 1 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              💡 Trạng thái đèn 1: {lightOn1 ? "Bật" : "Tắt"}
            </Text>
            <ProtectedSwitch
              value={lightOn1}
              onToggle={() => setLightOn1(!lightOn1)}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
            />
          </View>

          {/* Đèn 2 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              💡 Trạng thái đèn 2: {lightOn2 ? "Bật" : "Tắt"}
            </Text>
            <ProtectedSwitch
              value={lightOn2}
              onToggle={() => setLightOn2(!lightOn2)}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
            />
          </View>

          {/* Quạt */}
          <View style={styles.row}>
            <Text style={styles.label}>
              🌀 Trạng thái quạt: {fanOn ? "Bật" : "Tắt"}
            </Text>
            <ProtectedSwitch
              value={fanOn}
              onToggle={() => setFanOn(!fanOn)}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
            />
          </View>

          {/* Gas */}
          <View style={styles.row}>
            <Text
              style={[styles.label, { color: gasSafe ? "green" : "red" }]}
            >
              🔥 Cảm biến khí Gas: {gasSafe ? "An toàn" : "Nguy hiểm"}
            </Text>
            <ProtectedSwitch
              value={gasSafe}
              onToggle={() => setGasSafe(!gasSafe)}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
            />
          </View>
        </View>

        {/* Chế độ hoạt động */}
        <View style={styles.card}>
          <Text style={styles.label}>Chế độ hoạt động:</Text>
          <View style={styles.modeRow}>
            <Text style={styles.label}>Normal Mode</Text>
            <ProtectedSwitch
              value={autoMode}
              onToggle={() => setAutoMode(!autoMode)}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
            />
            <Text style={styles.label}>Auto Mode</Text>
          </View>
        </View>
      </View>

      {/* Render Toast */}
      {ToastElement}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4a4848ff" },
  header: {
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    elevation: 4,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  bellButton: { padding: 8, borderRadius: 50 },
  content: { padding: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  label: { fontSize: 16, color: "#333", marginBottom: 6 },
  modeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  toast: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "black",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toastText: {
    color: "white",
    fontSize: 14,
  },
});
