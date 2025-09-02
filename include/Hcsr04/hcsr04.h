
#ifndef HCSR04_SENSOR_H
#define HCSR04_SENSOR_H

#include "../lib/HCSR04/HCSR04.h"
#include "global.h"

#define ECHO_PIN 25
#define TRIGGER_PIN 26

extern float gDistance;
extern HCSR04 hc;
extern float readDistance();
extern void handleDistanceTask(void *pvParameter);

#endif

