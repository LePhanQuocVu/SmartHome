import React, { useRef, useState } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export default function ToastNotify(duration: number = 1500) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [message, setMessage] = useState("");

  const showToast = (msg: string) => {
    setMessage(msg);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(duration),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };
    const ToastElement = (
        <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
        <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    );

  return { showToast, ToastElement };

}
const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  toastText: {
    color: "white",
    fontSize: 14,
  },
});