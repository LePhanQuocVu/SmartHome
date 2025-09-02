#ifndef GLOBAL_H
#define GLOBAL_H

#include "Wifi/wifi_connection.h"
#include "Sensor/dht11.h"
#include "Oled/oled96.h"

#include "Mqtt/mqtt.h"
#include "utils.h"
#include "Servo/myServo.h"
#include "Hcsr04/hcsr04.h"
#include "Servo.h"

/*PIN CONFIGURATION */
#define LED_PIN 2

#define LIGHSENSORPIN 34 // A1 = GPIO34
#define DHTPIN 14 // D4 = GPIO14
#define BUZZPIN 27 // D5 = GPIO27

/*SERVO */
#define SERVO_PIN 12

enum modeConnect {
  NORMAL,
  AUTO
};

extern enum modeConnect currentMode;
extern Servo myServo;
extern SemaphoreHandle_t xMutex;
extern QueueHandle_t xMqttQueue;
extern QueueHandle_t xServoQueue;
extern SemaphoreHandle_t xServoSemaphore;
#endif