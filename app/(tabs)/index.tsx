import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import {View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // icon chuông

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import React, { useState } from "react";
import { router, useRouter } from "expo-router";
export default function HomeScreen() {
  const [autoMode, setAutoMode] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [lightOn1, setLightOn1] = useState(false);
  const [lightOn2, setLightOn2] = useState(false);
  const [fanOn, setFanOn] = useState(false);
  const [gasSafe, setGasSafe] = useState(true);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  return (
    <View>
       {/* Header */}
      <View style={styles.header}>
         <TouchableOpacity>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }} // ảnh giả, sau này bạn thay link ảnh user
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
          {/* Đèn */}
          <View style={styles.row}>
            <Text style={styles.label}>💡 Trạng thái đèn 1: {lightOn1 ? "Bật" : "Tắt"}</Text>
            <Switch
              value={lightOn1}
              onValueChange={setLightOn1}
            />
          </View>
          {/* Đèn 2*/}
          <View style={styles.row}>
            <Text style={styles.label}>💡 Trạng thái đèn 2: {lightOn2 ? "Bật" : "Tắt"}</Text>
            <Switch
              value={lightOn2}
              onValueChange={setLightOn2}
            />
          </View>

          {/* Quạt */}
          <View style={styles.row}>
            <Text style={styles.label}>🌀 Trạng thái quạt: {fanOn ? "Bật" : "Tắt"}</Text>
            <Switch
              value={fanOn}
              onValueChange={setFanOn}
            />
          </View>

          {/* Gas */}
          <View style={styles.row}>
            <Text style={[styles.label, {color: gasSafe ? "green" : "red"}]} >🔥 Cảm biến khí Gas: {gasSafe ? "An toàn" : "Nguy hiểm"}</Text>
            <Switch
              value={gasSafe}
              onValueChange={setGasSafe}
            />
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Chế độ hoạt động:</Text>
          <View style={styles.modeRow}>
            <Text style={styles.label}>Normal Mode</Text>
            <Switch
              value={autoMode}
              onValueChange={(val) => setAutoMode(val)}
            />
            <Text style={styles.label}>Auto Mode</Text>
          </View>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: {
    height:  120,
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
    borderRadius: 20, // hình tròn
  },
})