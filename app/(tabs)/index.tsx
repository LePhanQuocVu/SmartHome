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
import { connectSocket, convertMode, toggleLed1, toggleLed2 } from "@/services/socketInstance";
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
  const [modeState, setModeState] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [led1State, setLed1State] = useState(false);
  const [led2State, setLed2State] = useState(false);
  const [fanState, setFanState] = useState(false);
  const [gasSafe, setGasSafe] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [message, setMessage] = useState("");
  const [toastMessage, setToastMessage] = useState("");

    // Gọi custom hook
  const { ToastElement, showToast } = ToastNotify(2000);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("JWT_TOKEN");
      setIsLoggedIn(!!token);
      if(isLoggedIn) {
         await connectSocket();
      }
    };
    checkLogin();
  },[]);

   const handleToggleLed1 = () => {
    const newState = !led1State;
    setLed1State(newState);
    toggleLed1(newState);
  };

    const handleToggleLed2 = () => {
    const newState = !led2State;
    setLed2State(newState);
    toggleLed2(newState);
  };
    const handleToggeedFan = () => {
    const newState = !fanState;
     console.log(`New State fan1: ${newState}`);
    setFanState(newState);
    toggleLed2(newState);
  };
    const handleModeSate = () => {
    const newState = !modeState;
    setModeState(newState);
    convertMode(newState);
  };
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
              💡 Trạng thái đèn 1: {led1State ? "Bật" : "Tắt"}
            </Text>
            <ProtectedSwitch
              value={led1State}
               onToggle={handleToggleLed1}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
              
            />
          </View>

          {/* Đèn 2 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              💡 Trạng thái đèn 2: {led2State ? "Bật" : "Tắt"}
            </Text>
            <ProtectedSwitch
              value={led2State}
              onToggle={handleToggleLed2}
              isLoggedIn={isLoggedIn}
              showToast={showToast}
            />
          </View>

          {/* Quạt */}
          <View style={styles.row}>
            <Text style={styles.label}>
              🌀 Trạng thái quạt: {fanState ? "Bật" : "Tắt"}
            </Text>
            <ProtectedSwitch
              value={fanState}
              onToggle={handleToggeedFan}
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
              onToggle={() =>{
                 setGasSafe(!gasSafe)
              }}
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
              value={modeState}
              onToggle={handleModeSate}
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
