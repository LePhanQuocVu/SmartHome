#ifndef MQ_4_SENSOR
#define MQ_4_SENSOR

#include "../include/global.h"

extern int gasValue;
void readGasAnalogTask(void *pvParameter);

void gasNotifyTask(void *pvParameter);

#endif