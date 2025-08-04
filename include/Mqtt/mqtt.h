#ifndef MQTT_H
#define MQTT_H
#include "../include/Wifi/wifi_connection.h"
#include <PubSubClient.h>

#define MSG_BUFFER_SIZE	(50)

extern const char* mqtt_server;
extern const char* mqtt_username;
extern const char* mqtt_password;
extern const int  mqtt_port;
extern const char* root_ca;

extern PubSubClient client;
extern unsigned long lastMsg;

extern char msg[MSG_BUFFER_SIZE];
extern int value;

void mqttInit();
bool isMqttConnected();
void callback(char* topic, byte* payload, unsigned int length);
void reconnect();
void reconnectIfNeed();
void publicMessage(const char* topic, String payload,boolean retained);

/**MQTT task */
void mqttConnectTask(void *pvParameter);
void mqttCallbackTask(void *pvParamter);

#endif