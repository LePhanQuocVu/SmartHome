#include <Arduino.h>
#include "../include/Wifi/wifi_connection.h"
#include "../include/Sensor/dht11.h"
#include "../include/Oled/oled96.h"

#include "../include/Mqtt/mqtt.h"

#define LED_PIN 2
#define LED_WIFI 4

void setup() {
  Serial.begin(115200);
  initOled();
  connectWifi();
  mqttInit();
  xTaskCreate(WifiMonitorTask, "ReconnectWifi", 4096, NULL,2,NULL);
   xTaskCreate(MqttMonitorTask, "ConnectMQTT", 8192, NULL,1, NULL);
  xTaskCreate(TaskTemperature, "ReadDHT11", 2048, NULL,1,NULL);
  xTaskCreate(TaskDisplayOled,"Oled",2048, NULL,1,NULL );
}


void loop() {
  
    
}
