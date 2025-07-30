#ifndef WIFI_CONNECTION_H
#define WIFI_CONNECTION_H


extern const char* host;
extern const char* ssid;
extern const char* password;

void connectWifi();
bool isWifiConnected();
void reconnectIfNeeded();
void WifiMonitorTask(void *pvParameter);

#endif 