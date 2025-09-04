#ifndef GLOBAL_H
#define GLOBAL_H

#include "Wifi/wifi_connection.h"
#include "Sensor/dht11.h"
#include "Oled/oled96.h"
#include "Gas_Sensor/mq_4.h"

#include "Mqtt/mqtt.h"
#include "utils.h"
#include "Servo/myServo.h"
#include "Hcsr04/hcsr04.h"
#include "Servo.h"
#include "Buzzer/buzzer.h"

/*PIN CONFIGURATION */

#define LIGHT_SENSOR_PIN 34 // A1 = GPIO34
#define DHT_PIN 14 // D4 = GPIO14
#define BUZZER_PIN 27 // D5 = GPIO27
#define LED_PIN 2
#define GAS_SENSOR_PIN 35 // ADC1

/* HCR04 */
#define ECHO_PIN 25
#define TRIGGER_PIN 26
/*SERVO */
#define SERVO_PIN 12

/**THESSHOLD */
#define THRESS_HOLD_GAS 900

enum modeConnect {
  NORMAL,
  AUTO
};

extern enum modeConnect currentMode;
extern Servo myServo;
extern SemaphoreHandle_t xMutex;
extern QueueHandle_t xMqttQueue;
extern QueueHandle_t xServoQueue;
extern QueueHandle_t xGasControlQueue;
extern SemaphoreHandle_t xServoSemaphore;
#endif