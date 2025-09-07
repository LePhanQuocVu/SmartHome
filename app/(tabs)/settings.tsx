import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsPage() {
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

      <TouchableOpacity style={styles.item} onPress={() => router.replace("/login")}>
        <Text style={styles.itemText}>🔑 Đăng nhập</Text>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.separator} />

      <TouchableOpacity style={styles.item} onPress={() => handlePress("Đăng xuất")}>
        <Text style={[styles.itemText, { color: "red" }]}>🚪 Đăng xuất</Text>
      </TouchableOpacity>
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
