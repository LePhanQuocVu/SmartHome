import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Stack, useRouter } from "expo-router";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!name || !phone || !password) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin!");
      return;
    }
    Alert.alert("Thành công", "Đăng ký thành công!");
    router.replace("/login");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Đăng ký" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Tạo tài khoản</Text>

        <TextInput
          style={styles.input}
          placeholder="Tên đầy đủ"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Text style={styles.loginText}>Quay về đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20, 
    backgroundColor: "#fff" 
  },
  title: { 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 25, 
    textAlign: "center" 
  },
  input: { 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 15 
  },
  button: { 
    width: "100%", 
    backgroundColor: "#007AFF", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 12 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    textAlign: "center", 
    fontWeight: "bold" 
  },
  loginText: { 
    fontSize: 16, 
    fontWeight: "bold", 
    color: "#007AFF", 
    marginTop: 5,
    textAlign: "center" 
  },
});
