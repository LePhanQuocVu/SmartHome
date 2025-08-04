#ifndef WIFI_CONNECTION_H
#define WIFI_CONNECTION_H
#include <WiFiClient.h>
#include <WiFiClientSecure.h>

extern const char* host;
extern const char* ssid;
extern const char* password;
extern WiFiClientSecure espclient;

void connectWifi();
bool isWifiConnected();
void reconnectIfNeeded();
void wifiMonitorTask(void *pvParameter);

#endif 