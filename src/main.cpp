#include <Arduino.h>
#include "../include/Wifi/wifi_connection.h"

#define LED_PIN 2
#define LED_WIFI 4


void TaskBlinkLED(void *pvParameters) {
  pinMode(LED_PIN, OUTPUT);
  while (1) {
    digitalWrite(LED_PIN, HIGH);
    vTaskDelay(500 / portTICK_PERIOD_MS);
    digitalWrite(LED_PIN, LOW);
    vTaskDelay(500 / portTICK_PERIOD_MS);
  }
}

void TaskConnectMqtt(void *pvParameter) {

}


void setup() {
  Serial.begin(115200);
  connectWifi();
  xTaskCreate(TaskBlinkLED, "BlinkLED", 1024, NULL, 1, NULL);
  xTaskCreate(WifiMonitorTask, "ReconnectWifi", 4096, NULL,2,NULL);
}


void loop() {
  
}
