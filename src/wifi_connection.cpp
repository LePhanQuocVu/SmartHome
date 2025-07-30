#include "../include/Wifi/wifi_connection.h"
#include <WiFi.h>
#include <WiFiClient.h>
WiFiClient client;

const char* host = "esp32";
const char* ssid = "DATN";
const char* password = "12345678";

void connectWifi() {
    WiFi.begin(ssid, password);
  // Wait for connection
  Serial.print("Connecting to WiFi");
  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 20) {
    Serial.print(".");
    vTaskDelay(500 / portTICK_PERIOD_MS);
    retries++;
  }
   if (WiFi.status() == WL_CONNECTED) {
    Serial.println("");
    Serial.println("WiFi connected!");
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("");
    Serial.println("WiFi connection failed.");
  }
}
bool isWifiConnected() {
    return WiFi.status() == WL_CONNECTED;
}
void reconnectIfNeeded() {
    if(!isWifiConnected()) {
        Serial.println("WiFi disconnected. Reconnecting...");
        connectWifi();
    }
}
void WifiMonitorTask(void *pvParameter){
    while (true)
    {
        reconnectIfNeeded();
         vTaskDelay(10000 / portTICK_PERIOD_MS); 
    }
}
