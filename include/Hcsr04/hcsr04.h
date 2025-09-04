
#ifndef HCSR04_SENSOR_H
#define HCSR04_SENSOR_H

#include "../lib/HCSR04/HCSR04.h"
#include "global.h"



extern float gDistance;
extern HCSR04 hc;
extern float readDistance();
extern void handleDistanceTask(void *pvParameter);

#endif

