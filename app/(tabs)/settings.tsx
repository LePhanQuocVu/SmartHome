import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState, } from "react";
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingsPage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("JWT_TOKEN");
      setIsLoggedIn(!!token); // nếu có token thì true
    };
    checkLogin();
  }, []);

  const handleLogout = () => {
       if (Platform.OS === "web") {
        if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
          AsyncStorage.removeItem("JWT_TOKEN");
          setIsLoggedIn(false);
          router.replace("/login");
        }
      } else {
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc chắn muốn đăng xuất không?",
          [
            {
              text: "Hủy",
              style: "cancel",
            },
            {
              text: "Đăng xuất",
              style: "destructive",
              onPress: async () => {
                await AsyncStorage.removeItem("JWT_TOKEN");
                setIsLoggedIn(false);
                router.replace("/login");
              },
            },
          ],
          { cancelable: true }
        );
      }
    };
  const handlePress = (action: string) => {
    Alert.alert("Bạn chọn:", action);
  };

   return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings</Text>

      <TouchableOpacity style={styles.item} onPress={() => handlePress("Thông tin cá nhân")}>
        <Text style={styles.itemText}>👤 Thông tin cá nhân</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.item} onPress={() => handlePress("Cài đặt hệ thống")}>
        <Text style={styles.itemText}>⚙️ Cài đặt hệ thống</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.item} onPress={() => handlePress("Thay đổi mật khẩu")}>
        <Text style={styles.itemText}>🔒 Thay đổi mật khẩu</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.separator} />

      {/* Hiển thị tùy theo trạng thái đăng nhập */}
       {isLoggedIn ? (
        <TouchableOpacity
          style={styles.item}
          onPress={handleLogout}
        >
          <Text style={{ fontSize: 16, color: "red", }}>🚪 Đăng xuất</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.item}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.itemText} >🔑 Đăng nhập</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  itemText: {
    fontSize: 16,
    color: "#000",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginLeft: 15,
  },
});