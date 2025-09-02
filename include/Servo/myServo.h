#ifndef SERVO_SENSOR_H
#define SERVO_SENSOR_H
#include "../include/global.h"

void initServo();
void rotateServo();

void servoControlTask(void *pvParameter);
#endif