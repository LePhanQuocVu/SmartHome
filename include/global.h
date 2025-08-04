#ifndef GLOBAL_H
#define GLOBAL_H

#include "Wifi/wifi_connection.h"
#include "Sensor/dht11.h"
#include "Oled/oled96.h"

#include "Mqtt/mqtt.h"
#include "utils.h"

/*PIN CONFIGURATION */
#define LED_PIN 2

#define LIGHSENSORPIN 34 // A1 = GPIO34
#define DHTPIN 14 // D4 = GPIO14
#define BUZZPIN 27 // D5 = GPIO27



enum modeConnect {
  NORMAL,
  AUTO
};

extern enum modeConnect currentMode;

extern SemaphoreHandle_t xMutex;
#endif 