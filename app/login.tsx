import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {

    try {
        // const res = await authService.login(phone, password);
        // console.log(res);
        // alert("Đăng nhập thành công!");
        // router.replace("/");
        // const res = await fetch(`${process.env.BASE_URL}/api/users/userLogin`
        const res = await fetch(`http://192.168.43.171:3000/api/users/userLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, password }),
        });
        const data = await res.json();
        console.log(data);
        console.log(data.token);
          if (res.ok) {
          await AsyncStorage.setItem("JWT_TOKEN", data.token);
          alert("Đăng nhập thành công!");
          router.navigate("/");
        } else {
          alert(data.message);
          console.log(data.err);
        }
    } catch(err: any) {
        alert(err.response?.data?.message);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Đăng nhập" }} />
      <View style={styles.container}>
        <Text style={styles.title}>Đăng nhập</Text>

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          placeholderTextColor="#888"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <Text
          style={styles.registerTitle}
          onPress={() => router.push("/register")} // ✅ push thay vì replace
        >
          Chưa có tài khoản? Đăng ký
        </Text>

        <TouchableOpacity style={styles.homeButton} onPress={() => router.push("/")}>
          <Ionicons name="home-outline" size={28} color="#fff" />
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
    marginBottom: 30, 
    textAlign: "center",
    color: "#333"
  },
  input: { 
    width: "100%", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 10, 
    padding: 12, 
    marginBottom: 15,
    fontSize: 16,
    color: "#000"
  },
  button: { 
    width: "100%", 
    backgroundColor: "#007AFF", 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 16, 
    textAlign: "center", 
    fontWeight: "bold" 
  },
  registerTitle: { 
    fontSize: 16, 
    fontWeight: "500", 
    color: "#007AFF", 
    marginTop: 5 
  },
  homeButton: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: "#3b4470", 
    justifyContent: "center", 
    alignItems: "center",
    marginTop: 30
  },
});
