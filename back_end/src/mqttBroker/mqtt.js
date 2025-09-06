import mqtt from 'mqtt';
import fs from 'fs';

export const connectMQTT = () => {
  const options = {
    host: process.env.MQTT_HOST, //  hostname từ HiveMQ
    port: process.env.MQTT_PORT, // cổng MQTTS
    protocol: "mqtts",
    username: process.env.MQTT_USER, // user bạn tạo trên HiveMQ
    password: process.env.MQTT_PASSWORD, // mật khẩu
    // Nếu HiveMQ yêu cầu CA certificate:
    ca: [fs.readFileSync('./ca.pem')],
  };
  const client = mqtt.connect(options);

  client.on("connect", () => {
    console.log("Connected to HiveMQ Cloud via MQTTS");
    // Subscribe topic
    client.subscribe("iot/test", (err) => {
      if (!err) {
        console.log("Subscribed to topic: iot/test");
        // Publish thử
        client.publish("iot/test", "Hello from NodeJS");
      }
    });
  });

  client.on("message", (topic, message) => {
    console.log(`Received: ${message.toString()} on topic ${topic}`);
  });

  client.on("error", (err) => {
    console.error("Connection error:", err);
  });
}